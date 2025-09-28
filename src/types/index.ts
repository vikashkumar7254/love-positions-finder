// Core data types for the Love Positions application

export type StyleType = 'romantic' | 'passionate' | 'adventurous' | 'mixed'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type LoveLanguageType = 'words_of_affirmation' | 'physical_touch' | 'acts_of_service' | 'quality_time' | 'receiving_gifts'

export interface Position {
  id: string
  name: string
  description: string
  style: StyleType
  difficulty: DifficultyLevel
  category: string
  tags: string[]
  instructions: string[]
  benefits: string[]
  imageUrl?: string
  views: number
  rating: number
  duration: string // e.g., "5-10 minutes"
  isPopular: boolean
  featured: boolean
}

export interface Journey {
  id: string
  style: StyleType
  positionCount: number
  positions: Position[]
  createdAt: Date
  totalDuration: string
}

export interface ScratchCard {
  id: string
  position: Position
  isScratched: boolean
  revealedAt?: Date
}

export interface Game {
  id: string
  name: string
  type: 'truth_or_dare' | 'foreplay_dice' | 'random_generator' | 'long_distance' | 'quiz' | 'massage_guide'
  description: string
  icon: string
  difficulty: DifficultyLevel
  duration: string
  playerCount: '2' | '2+' | 'any'
  category: string
}

export interface TruthOrDareQuestion {
  id: string
  type: 'truth' | 'dare'
  question: string
  spicyLevel: 1 | 2 | 3 | 4 | 5 // 1 = mild, 5 = very spicy
  category: string
}

export interface DiceAction {
  id: string
  action: string
  bodyPart: string
  duration: string
  spicyLevel: 1 | 2 | 3 | 4 | 5
}

export interface LoveLanguageActivity {
  id: string
  title: string
  description: string
  type: LoveLanguageType
  duration: string
  difficulty: DifficultyLevel
  instructions: string[]
  materials?: string[]
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  publishedAt: Date
  readTime: string
  featured: boolean
  imageUrl?: string
  views: number
}

export interface RomanticGuide {
  id: string
  title: string
  description: string
  category: 'sensual_teasing' | 'intimate_play' | 'fantasy_fulfillment' | 'passionate_play' | 'romance_rituals'
  activities: RomanticActivity[]
  tips: string[]
  moodSettings: MoodSetting[]
}

export interface RomanticActivity {
  id: string
  title: string
  description: string
  instructions: string[]
  duration: string
  materials?: string[]
  tips: string[]
}

export interface MoodSetting {
  id: string
  name: string
  description: string
  items: string[]
  icon: string
}

export interface CustomPoster {
  id: string
  name: string
  positions: Position[]
  style: StyleType
  layout: 'grid' | 'list' | 'artistic'
  colors: string[]
  createdAt: Date
}

export interface UserPreferences {
  preferredStyle: StyleType[]
  difficulty: DifficultyLevel[]
  favoritePositions: string[]
  completedJourneys: string[]
  scratchedCards: string[]
  loveLanguages: LoveLanguageType[]
  gamePreferences: {
    spicyLevel: 1 | 2 | 3 | 4 | 5
    preferredTypes: string[]
  }
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  positionCount: number
  difficulty: DifficultyLevel
}

export interface PopularStats {
  totalPositions: number
  totalViews: number
  mostPopular: Position[]
  trending: Position[]
  recentlyAdded: Position[]
}

export interface Quote {
  id: string
  text: string
  author: string
  category: 'love' | 'romance' | 'passion' | 'relationship'
}

export interface LongDistanceActivity {
  id: string
  title: string
  description: string
  instructions: string[]
  duration: string
  requirements: string[]
  difficulty: DifficultyLevel
  type: 'video_call' | 'messaging' | 'surprise' | 'planning'
}