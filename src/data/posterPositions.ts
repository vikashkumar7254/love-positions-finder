export interface PosterPosition {
  id: string
  name: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  image: string
  description: string
}

export const posterPositions: PosterPosition[] = [
  {
    id: '1',
    name: 'Cradle',
    category: 'Intimate',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
    description: 'A gentle, face-to-face position perfect for emotional connection'
  },
  {
    id: '2',
    name: 'Missionary',
    category: 'Classic',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
    description: 'The most traditional and intimate position'
  },
  {
    id: '3',
    name: 'Spooning',
    category: 'Gentle',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    description: 'Side-by-side position perfect for slow, tender moments'
  },
  {
    id: '4',
    name: 'Cowgirl',
    category: 'Adventurous',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center',
    description: 'Partner on top for control and deeper connection'
  },
  {
    id: '5',
    name: 'Lotus',
    category: 'Intimate',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center',
    description: 'Sitting face-to-face for maximum intimacy'
  },
  {
    id: '6',
    name: 'Bridge',
    category: 'Adventurous',
    difficulty: 'advanced',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
    description: 'An athletic position for the more experienced'
  },
  {
    id: '7',
    name: 'Butterfly',
    category: 'Romantic',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center',
    description: 'Edge-of-bed position with great eye contact'
  },
  {
    id: '8',
    name: 'Pretzel',
    category: 'Playful',
    difficulty: 'advanced',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
    description: 'A twisted position for adventurous couples'
  }
]

// Load custom positions from localStorage
export const loadCustomPosterPositions = (): PosterPosition[] => {
  try {
    const raw = localStorage.getItem('poster_positions_custom')
    const arr = raw ? JSON.parse(raw) as PosterPosition[] : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

// Get all positions (defaults + custom)
export const getAllPosterPositions = (): PosterPosition[] => {
  return [...posterPositions, ...loadCustomPosterPositions()]
}

// Save custom positions to localStorage
export const saveCustomPosterPositions = (positions: PosterPosition[]) => {
  try {
    localStorage.setItem('poster_positions_custom', JSON.stringify(positions))
  } catch (error) {
    console.error('Failed to save custom poster positions:', error)
  }
}
