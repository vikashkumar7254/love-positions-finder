import { getPositions as apiGetPositions } from '@/lib/positionsApi'

const CACHE_KEY = 'positions_cache_v2'
const CACHE_TIMESTAMP_KEY = 'positions_cache_timestamp_v2'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export type CachedPosition = {
  description: string
  mediaType: string
  id: string
  title: string
  image: string
  isDefault?: boolean
  cachedAt: number
}

// Get cached positions instantly
export function getCachedPositions(): CachedPosition[] {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
    
    if (!cached || !timestamp) return []
    
    const now = Date.now()
    const cacheTime = parseInt(timestamp, 10)
    
    // Check if cache is still valid
    if (now - cacheTime > CACHE_DURATION) {
      return []
    }
    
    const parsed = JSON.parse(cached)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

// Save positions to cache
export function savePositionsToCache(positions: any[]): void {
  try {
    const cachedPositions: CachedPosition[] = positions.map(pos => ({
      ...pos,
      cachedAt: Date.now()
    }))
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedPositions))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()))
  } catch (error) {
    // Silent fail
  }
}

// Get positions with instant cache + background refresh
export async function getPositionsOptimized(): Promise<CachedPosition[]> {
  // 1. Return cached data instantly
  const cached = getCachedPositions()
  if (cached.length > 0) {
    // 2. Refresh in background (don't await)
    refreshPositionsInBackground()
    
    return cached
  }
  
  // 3. If no cache, fetch from API
  return await fetchAndCachePositions()
}

// Background refresh function
async function refreshPositionsInBackground(): Promise<void> {
  try {
    const freshPositions = await apiGetPositions()
    
    if (freshPositions.length > 0) {
      savePositionsToCache(freshPositions)
    }
  } catch (error) {
    // Silent fail for background refresh
  }
}

// Fetch and cache positions
async function fetchAndCachePositions(): Promise<CachedPosition[]> {
  try {
    const positions = await apiGetPositions()
    
    if (positions.length > 0) {
      savePositionsToCache(positions)
      return positions.map(pos => ({ 
        ...pos, 
        cachedAt: Date.now(),
        description: '',
        mediaType: 'image'
      }))
    }
    
    return []
  } catch (error) {
    return []
  }
}

// Clear cache
export function clearPositionsCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_TIMESTAMP_KEY)
  } catch (error) {
    // Silent fail
  }
}

// Check if cache is fresh
export function isCacheFresh(): boolean {
  try {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
    if (!timestamp) return false
    
    const now = Date.now()
    const cacheTime = parseInt(timestamp, 10)
    
    return (now - cacheTime) <= CACHE_DURATION
  } catch {
    return false
  }
}
