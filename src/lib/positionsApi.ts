export type PositionItem = {
  id: string
  title: string
  image: string
  isDefault?: boolean
}

const API_BASE = '/api/positions'

export async function getPositions(): Promise<PositionItem[]> {
  try {
    const res = await fetch(API_BASE, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.positions) ? data.positions : []
  } catch (e) {
    console.error('getPositions error:', e)
    return []
  }
}

export async function savePositions(items: PositionItem[]): Promise<boolean> {
  try {
    const res = await fetch(API_BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    })
    return res.ok
  } catch (e) {
    console.error('savePositions error:', e)
    return false
  }
}
