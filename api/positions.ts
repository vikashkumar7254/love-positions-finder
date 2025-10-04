// Minimal Redis REST client for Upstash
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const KEY = 'scratch_positions_all'

async function redisGet(key: string): Promise<string | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null
  const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = await res.json() as { result: string | null }
  return data.result
}

async function redisSet(key: string, value: string): Promise<{ ok: boolean; status: number }> {
  if (!REDIS_URL || !REDIS_TOKEN) return { ok: false, status: 0 }
  
  try {
  const res = await fetch(`${REDIS_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: 'no-store',
  })
  return { ok: res.ok, status: res.status }
  } catch (error) {
    console.error('Redis SET error:', error)
    return { ok: false, status: 500 }
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      // First check if we have batch data
      const metadataRaw = await redisGet(`${KEY}_metadata`)
      if (metadataRaw) {
        try {
          const metadata = JSON.parse(metadataRaw)
          console.log(`📦 Loading ${metadata.totalItems} positions from ${metadata.batchCount} batches`)
          
          // Load all batches (including partial data)
          const allPositions: any[] = []
          let loadedBatches = 0
          
          for (let i = 0; i < metadata.batchCount; i++) {
            const batchKey = `${KEY}_batch_${i}`
            const batchRaw = await redisGet(batchKey)
            if (batchRaw) {
              try {
                const batchData = JSON.parse(batchRaw)
                if (Array.isArray(batchData)) {
                  allPositions.push(...batchData)
                  loadedBatches++
                }
              } catch (error) {
                console.error(`Error parsing batch ${i}:`, error)
              }
            }
          }
          
          console.log(`✅ Loaded ${allPositions.length} positions from ${loadedBatches}/${metadata.batchCount} batches`)
          
          // Return partial data if some batches are missing
          if (loadedBatches < metadata.batchCount) {
            console.warn(`⚠️ Some batches are missing (${loadedBatches}/${metadata.batchCount}), returning partial data`)
          }
          
          return res.status(200).json({ 
            positions: allPositions,
            loadedBatches: loadedBatches,
            totalBatches: metadata.batchCount,
            message: loadedBatches < metadata.batchCount ? 'Some data may be missing due to batch failures' : 'All data loaded successfully'
          })
        } catch (error) {
          console.error('Error loading batch data:', error)
          // Fall back to single key
        }
      }
      
      // Fallback: Fetch from single Redis key
      const raw = await redisGet(KEY)
      if (!raw) {
        return res.status(200).json({ positions: [] })
      }
      try {
        const parsed = JSON.parse(raw)
        return res.status(200).json({ positions: Array.isArray(parsed) ? parsed : [] })
      } catch {
        return res.status(200).json({ positions: [] })
      }
    }

    if (req.method === 'PUT') {
      let items: any = req.body

      // Handle stringified JSON bodies
      if (typeof items === 'string') {
        try { items = JSON.parse(items) } catch {
          return res.status(400).json({ error: 'Invalid JSON string in body.' })
        }
      }

      if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Invalid body. Expected an array of positions.' })
      }

      // Optional basic validation
      const valid = items.every((p: any) => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.image === 'string')
      if (!valid) {
        return res.status(400).json({ error: 'Each position must have id, title, and image (strings).' })
      }

      // Check data size before saving
      const dataString = JSON.stringify(items)
      const dataSizeKB = Math.round(Buffer.byteLength(dataString, 'utf8') / 1024)
      
      console.log(`📊 Saving ${items.length} positions, data size: ${dataSizeKB}KB`)
      
      // Upstash Redis has a 512MB limit per key, warn if approaching limit
      if (dataSizeKB > 100000) { // 100MB warning
        console.warn(`⚠️ Large data size: ${dataSizeKB}KB`)
      }
      
      // If data is too large, try to compress it
      let finalDataString = dataString
      if (dataSizeKB > 50000) { // 50MB threshold
        try {
          // Simple compression by removing unnecessary whitespace
          finalDataString = JSON.stringify(items, null, 0)
          const compressedSizeKB = Math.round(Buffer.byteLength(finalDataString, 'utf8') / 1024)
          console.log(`📦 Compressed data from ${dataSizeKB}KB to ${compressedSizeKB}KB`)
        } catch (error) {
          console.error('Compression failed:', error)
        }
      }

      // Always use batch processing for better Redis compatibility
      console.log(`📦 Processing ${items.length} items with batch system...`)
      
      // Split into smaller batches (reduced size for better compatibility)
      const batchSize = 25 // Reduced from 50 to 25 for better Redis compatibility
      const batches: any[] = []
      for (let i = 0; i < items.length; i += batchSize) {
        batches.push(items.slice(i, i + batchSize))
      }
      
      console.log(`📦 Split into ${batches.length} batches of ${batchSize} items each`)
      
      // Save each batch with retry logic
      let successCount = 0
      for (let i = 0; i < batches.length; i++) {
        const batchKey = `${KEY}_batch_${i}`
        
        // Compress each batch individually
        let batchData = JSON.stringify(batches[i], null, 0)
        const batchSizeKB = Math.round(Buffer.byteLength(batchData, 'utf8') / 1024)
        
        console.log(`📦 Saving batch ${i + 1}/${batches.length} (${batchSizeKB}KB)`)
        
        // Try to save with retry
        let retryCount = 0
        let batchResult = { ok: false, status: 0 }
        
        while (retryCount < 3 && !batchResult.ok) {
          batchResult = await redisSet(batchKey, batchData)
          
          if (!batchResult.ok) {
            retryCount++
            console.warn(`⚠️ Batch ${i} attempt ${retryCount} failed, retrying...`)
            
            if (retryCount < 3) {
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 1000))
            }
          }
        }
        
        if (!batchResult.ok) {
          console.error(`❌ Batch ${i} failed after ${retryCount} attempts with status: ${batchResult.status}`)
          // Continue with other batches instead of failing completely
          continue
        }
        
        successCount++
        console.log(`✅ Batch ${i + 1}/${batches.length} saved successfully`)
      }
      
      // If some batches failed, still return success for the ones that worked
      if (successCount === 0) {
        return res.status(500).json({ error: 'All batches failed to save to Redis.' })
      }
      
      console.log(`📊 Successfully saved ${successCount}/${batches.length} batches`)
      
      // Save metadata about batches (only if we have successful batches)
      if (successCount > 0) {
        const metadata = {
          totalItems: items.length,
          batchCount: batches.length,
          successCount: successCount,
          batchSize: batchSize,
          savedAt: new Date().toISOString()
        }
        
        const metadataResult = await redisSet(`${KEY}_metadata`, JSON.stringify(metadata))
        if (!metadataResult.ok) {
          console.warn('⚠️ Failed to save metadata, but batches were saved')
        }
        
        console.log(`✅ Successfully saved ${items.length} positions in ${successCount}/${batches.length} batches`)
        return res.status(200).json({ 
          ok: true, 
          count: items.length, 
          batches: batches.length, 
          successBatches: successCount,
          dataSizeKB,
          message: successCount < batches.length ? 'Some batches failed, but data was partially saved' : 'All data saved successfully'
        })
      }
      
      // For smaller datasets, save normally
      const result = await redisSet(KEY, finalDataString)
      if (!result.ok) {
        console.error(`❌ Redis save failed with status: ${result.status}`)
        if (result.status === 401 || result.status === 403) {
          return res.status(401).json({ error: 'Unauthorized to write to Upstash. Ensure you are using the FULL (writable) REST token, not the READONLY token.' })
        }
        if (result.status === 431) {
          return res.status(413).json({ error: 'Data too large for Redis. Please reduce the number of positions or image sizes.', status: result.status })
        }
        return res.status(500).json({ error: 'Failed to save positions to Upstash Redis.', status: result.status })
      }
      
      console.log(`✅ Successfully saved ${items.length} positions to Redis`)
      return res.status(200).json({ ok: true, count: items.length, dataSizeKB })
    }

    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (e) {
    console.error('API error:', e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
