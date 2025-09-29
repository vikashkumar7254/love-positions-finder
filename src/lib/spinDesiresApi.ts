export type SpinDesireItem = {
  id: string
  title: string
  description?: string
  category: 'romantic' | 'sensual' | 'passionate' | 'playful' | 'luxurious'
  image: string
  isDefault?: boolean
}

const API_BASE = '/api/spin-desires'

export async function getSpinDesires(): Promise<SpinDesireItem[]> {
  try {
    const res = await fetch(API_BASE, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.desires) ? data.desires : []
  } catch (e) {
    console.error('getSpinDesires error:', e)
    return []
  }
}

export async function saveSpinDesires(items: SpinDesireItem[]): Promise<boolean> {
  try {
    const res = await fetch(API_BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    })
    return res.ok
  } catch (e) {
    console.error('saveSpinDesires error:', e)
    return false
  }
}

// Default images for categories
export const DEFAULT_CATEGORY_IMAGES = {
  romantic: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center',
  sensual: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
  passionate: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center',
  playful: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
  luxurious: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop&crop=center'
}

// Default desires for initial setup
export const DEFAULT_DESIRES: SpinDesireItem[] = [
  {
    id: 'romantic-wine',
    title: 'Wine & Dine',
    description: 'Share a romantic bottle of wine by candlelight',
    category: 'romantic',
    image: DEFAULT_CATEGORY_IMAGES.romantic,
    isDefault: true
  },
  {
    id: 'romantic-surprise',
    title: 'Sweet Surprise',
    description: 'Plan a thoughtful surprise for your partner',
    category: 'romantic',
    image: DEFAULT_CATEGORY_IMAGES.romantic,
    isDefault: true
  },
  {
    id: 'sensual-massage',
    title: 'Sensual Massage',
    description: 'Give each other relaxing massages',
    category: 'sensual',
    image: DEFAULT_CATEGORY_IMAGES.sensual,
    isDefault: true
  },
  {
    id: 'passionate-dance',
    title: 'Passionate Dance',
    description: 'Dance together to your favorite romantic songs',
    category: 'passionate',
    image: DEFAULT_CATEGORY_IMAGES.passionate,
    isDefault: true
  },
  {
    id: 'playful-game',
    title: 'Playful Games',
    description: 'Play intimate games together',
    category: 'playful',
    image: DEFAULT_CATEGORY_IMAGES.playful,
    isDefault: true
  },
  {
    id: 'luxurious-bath',
    title: 'Luxurious Bath',
    description: 'Take a relaxing bath together with candles',
    category: 'luxurious',
    image: DEFAULT_CATEGORY_IMAGES.luxurious,
    isDefault: true
  }
]
