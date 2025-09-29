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
  const res = await fetch(`${REDIS_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: 'no-store',
  })
  return { ok: res.ok, status: res.status }
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
      // Fetch from Redis
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

      const result = await redisSet(KEY, JSON.stringify(items))
      if (!result.ok) {
        if (result.status === 401 || result.status === 403) {
          return res.status(401).json({ error: 'Unauthorized to write to Upstash. Ensure you are using the FULL (writable) REST token, not the READONLY token.' })
        }
        return res.status(500).json({ error: 'Failed to save positions to Upstash Redis.', status: result.status })
      }
      return res.status(200).json({ ok: true, count: items.length })
    }

    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (e) {
    console.error('API error:', e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
