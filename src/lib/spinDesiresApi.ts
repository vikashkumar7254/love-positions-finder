import { getDefaultImageForCategory } from '@/utils/defaultImageManager'

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

// Default images for categories - now using customizable defaults
export const DEFAULT_CATEGORY_IMAGES = {
  romantic: getDefaultImageForCategory('romantic'),
  sensual: getDefaultImageForCategory('sensual'),
  passionate: getDefaultImageForCategory('passionate'),
  playful: getDefaultImageForCategory('playful'),
  luxurious: getDefaultImageForCategory('luxurious')
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
