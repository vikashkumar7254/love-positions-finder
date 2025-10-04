export type PositionItem = {
  id: string
  title: string
  image: string
  mediaType?: 'image' | 'gif' | 'video'
  isDefault?: boolean
  tags?: string[]
}

const API_BASE = '/api/positions'

export async function getPositions(): Promise<PositionItem[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const res = await fetch(API_BASE, { 
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      return []
    }
    
    const data = await res.json()
    console.log(`✅ API Response: ${data.positions?.length || 0} positions loaded`)
    return Array.isArray(data?.positions) ? data.positions : []
  } catch (e) {
    if (e.name === 'AbortError') {
      console.error('getPositions timeout after 10 seconds')
    } else {
      console.error('getPositions error:', e)
    }
    return []
  }
}

export async function savePositions(items: PositionItem[]): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout for save
    
    console.log(`💾 Saving ${items.length} positions to API...`)
    
    const res = await fetch(API_BASE, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(items),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!res.ok) {
      console.error(`Save API error: ${res.status} ${res.statusText}`)
      return false
    }
    
    const result = await res.json()
    console.log(`✅ Save successful: ${result.count || items.length} positions saved`)
    return true
  } catch (e) {
    if (e.name === 'AbortError') {
      console.error('savePositions timeout after 30 seconds')
    } else {
      console.error('savePositions error:', e)
    }
    return false
  }
}
