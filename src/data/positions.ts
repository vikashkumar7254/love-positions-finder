import { Position, StyleType, DifficultyLevel } from '@/types'

export const positions: Position[] = [
  // Romantic Positions
  {
    id: 'romantic-1',
    name: 'Tender Embrace',
    description: 'A gentle, intimate position that promotes deep emotional connection',
    style: 'romantic',
    difficulty: 'beginner',
    category: 'Intimate Connection',
    tags: ['gentle', 'emotional', 'eye-contact'],
    instructions: [
      'Face each other lying on your sides',
      'Maintain gentle eye contact',
      'Focus on slow, tender movements',
      'Whisper sweet words to each other'
    ],
    benefits: [
      'Deep emotional bonding',
      'Intimate conversation',
      'Prolonged intimacy',
      'Builds trust'
    ],
    views: 15420,
    rating: 4.8,
    duration: '15-20 minutes',
    isPopular: true,
    featured: true
  },
  {
    id: 'romantic-2',
    name: 'Heart to Heart',
    description: 'A beautiful position that allows for maximum emotional connection',
    style: 'romantic',
    difficulty: 'beginner',
    category: 'Emotional Intimacy',
    tags: ['romantic', 'gentle', 'connection'],
    instructions: [
      'Sit facing each other',
      'Wrap legs around each other gently',
      'Maintain close eye contact',
      'Move slowly and synchronously'
    ],
    benefits: [
      'Enhanced emotional intimacy',
      'Better communication',
      'Synchronized breathing',
      'Deep connection'
    ],
    views: 12800,
    rating: 4.9,
    duration: '10-15 minutes',
    isPopular: true,
    featured: false
  },
  
  // Passionate Positions
  {
    id: 'passionate-1',
    name: 'Fiery Passion',
    description: 'An intense position that ignites passion between partners',
    style: 'passionate',
    difficulty: 'intermediate',
    category: 'Intense Passion',
    tags: ['intense', 'passionate', 'fire'],
    instructions: [
      'Start with deep kissing',
      'Build intensity gradually',
      'Focus on passionate movements',
      'Express your desires openly'
    ],
    benefits: [
      'Intense pleasure',
      'Passionate connection',
      'High energy release',
      'Deep satisfaction'
    ],
    views: 18900,
    rating: 4.7,
    duration: '10-25 minutes',
    isPopular: true,
    featured: true
  },
  {
    id: 'passionate-2',
    name: 'Burning Desire',
    description: 'A position that channels raw passion and desire',
    style: 'passionate',
    difficulty: 'intermediate',
    category: 'Raw Passion',
    tags: ['desire', 'intense', 'passionate'],
    instructions: [
      'Begin with intense foreplay',
      'Express your desires vocally',
      'Use varied rhythms',
      'Focus on mutual pleasure'
    ],
    benefits: [
      'Explosive passion',
      'Emotional release',
      'Deep satisfaction',
      'Strengthened bond'
    ],
    views: 16700,
    rating: 4.6,
    duration: '15-30 minutes',
    isPopular: true,
    featured: false
  },

  // Adventurous Positions
  {
    id: 'adventurous-1',
    name: 'Explorer\'s Delight',
    description: 'An adventurous position for couples seeking new experiences',
    style: 'adventurous',
    difficulty: 'advanced',
    category: 'New Experiences',
    tags: ['adventurous', 'exploration', 'creative'],
    instructions: [
      'Communicate boundaries clearly',
      'Take turns leading',
      'Try different angles',
      'Be creative and playful'
    ],
    benefits: [
      'Enhanced creativity',
      'New experiences',
      'Improved flexibility',
      'Stronger communication'
    ],
    views: 9200,
    rating: 4.5,
    duration: '20-35 minutes',
    isPopular: false,
    featured: true
  },
  {
    id: 'adventurous-2',
    name: 'Wild Adventure',
    description: 'For couples ready to explore their wild side',
    style: 'adventurous',
    difficulty: 'expert',
    category: 'Wild Exploration',
    tags: ['wild', 'adventurous', 'bold'],
    instructions: [
      'Ensure both partners are comfortable',
      'Use pillows for support',
      'Take breaks as needed',
      'Focus on pleasure and fun'
    ],
    benefits: [
      'Thrilling experience',
      'Enhanced trust',
      'Physical challenge',
      'Memorable moments'
    ],
    views: 7800,
    rating: 4.4,
    duration: '25-40 minutes',
    isPopular: false,
    featured: false
  },

  // Mixed Style Positions
  {
    id: 'mixed-1',
    name: 'Perfect Harmony',
    description: 'A versatile position combining romance with passion',
    style: 'mixed',
    difficulty: 'intermediate',
    category: 'Balanced Intimacy',
    tags: ['versatile', 'balanced', 'harmony'],
    instructions: [
      'Start romantically and slowly',
      'Build passion gradually',
      'Adjust based on mood',
      'Communicate throughout'
    ],
    benefits: [
      'Balanced experience',
      'Adaptable to mood',
      'Versatile pleasure',
      'Perfect for any time'
    ],
    views: 11400,
    rating: 4.7,
    duration: '15-25 minutes',
    isPopular: true,
    featured: true
  },

  // Additional positions to reach variety
  {
    id: 'romantic-3',
    name: 'Sweet Serenade',
    description: 'A gentle position perfect for creating beautiful memories',
    style: 'romantic',
    difficulty: 'beginner',
    category: 'Sweet Romance',
    tags: ['sweet', 'gentle', 'memories'],
    instructions: [
      'Create a romantic atmosphere',
      'Play soft music',
      'Focus on gentle touches',
      'Take your time'
    ],
    benefits: [
      'Creates lasting memories',
      'Builds emotional intimacy',
      'Stress relief',
      'Peaceful connection'
    ],
    views: 8900,
    rating: 4.8,
    duration: '10-20 minutes',
    isPopular: false,
    featured: false
  },
  {
    id: 'passionate-3',
    name: 'Heat Wave',
    description: 'An intensely passionate position that creates waves of pleasure',
    style: 'passionate',
    difficulty: 'advanced',
    category: 'Intense Heat',
    tags: ['heat', 'waves', 'intensity'],
    instructions: [
      'Build up slowly',
      'Create waves of intensity',
      'Use breathing techniques',
      'Focus on rhythm'
    ],
    benefits: [
      'Intense pleasure waves',
      'Enhanced stamina',
      'Deep satisfaction',
      'Unforgettable experience'
    ],
    views: 13600,
    rating: 4.9,
    duration: '20-30 minutes',
    isPopular: true,
    featured: false
  }
]

export const getPositionsByStyle = (style: StyleType): Position[] => {
  return positions.filter(position => position.style === style)
}

export const getPositionsByDifficulty = (difficulty: DifficultyLevel): Position[] => {
  return positions.filter(position => position.difficulty === difficulty)
}

export const getPopularPositions = (): Position[] => {
  return positions.filter(position => position.isPopular).sort((a, b) => b.views - a.views)
}

export const getFeaturedPositions = (): Position[] => {
  return positions.filter(position => position.featured)
}

export const getRandomPositions = (count: number): Position[] => {
  const shuffled = [...positions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const searchPositions = (query: string): Position[] => {
  const lowercaseQuery = query.toLowerCase()
  return positions.filter(position => 
    position.name.toLowerCase().includes(lowercaseQuery) ||
    position.description.toLowerCase().includes(lowercaseQuery) ||
    position.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    position.category.toLowerCase().includes(lowercaseQuery)
  )
}