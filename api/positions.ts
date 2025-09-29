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

async function redisSet(key: string, value: string): Promise<boolean> {
  if (!REDIS_URL || !REDIS_TOKEN) return false
  const res = await fetch(`${REDIS_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: 'no-store',
  })
  return res.ok
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
      const body = req.body
      if (!body || !Array.isArray(body)) {
        return res.status(400).json({ error: 'Invalid body. Expected an array of positions.' })
      }

      const ok = await redisSet(KEY, JSON.stringify(body))
      if (!ok) {
        return res.status(500).json({ error: 'Failed to save positions. Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.' })
      }
      return res.status(200).json({ ok: true, count: body.length })
    }

    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (e) {
    console.error('API error:', e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
