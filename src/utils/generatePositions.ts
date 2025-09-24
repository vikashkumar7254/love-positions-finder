import { Position, StyleType, DifficultyLevel } from '@/types'

// Helper function to generate additional positions programmatically
export const generateAdditionalPositions = (): Position[] => {
  const additionalPositions: Position[] = []
  
  // Categories for systematic generation
  const categories = [
    'Sensual Massage', 'Tantric Connection', 'Playful Intimacy', 'Deep Connection',
    'Gentle Romance', 'Fiery Passion', 'Athletic Challenge', 'Romantic Dance',
    'Intimate Conversation', 'Stress Relief', 'Morning Glory', 'Evening Bliss',
    'Spontaneous Moments', 'Slow Building', 'Quick Passion', 'Extended Pleasure',
    'Emotional Healing', 'Trust Building', 'Communication', 'Exploration',
    'Comfortable Positions', 'Challenging Poses', 'Creative Expression', 'Role Playing',
    'Seasonal Romance', 'Weather Inspired', 'Nature Connection', 'Urban Passion',
    'Traditional Favorites', 'Modern Innovations', 'Cultural Inspired', 'Travel Romance',
    'Home Comfort', 'Adventure Seeking', 'Artistic Expression', 'Musical Harmony',
    'Yoga Inspired', 'Dance Influenced', 'Sports Themed', 'Academic Study',
    'Professional Stress Relief', 'Weekend Relaxation', 'Holiday Special', 'Anniversary'
  ]
  
  const styles: StyleType[] = ['romantic', 'passionate', 'adventurous', 'mixed']
  const difficulties: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced', 'expert']
  
  // Romantic position names and descriptions
  const romanticNames = [
    { name: 'Sunrise Embrace', desc: 'A gentle morning position that welcomes the day with love' },
    { name: 'Candlelight Whispers', desc: 'An intimate position perfect for romantic evenings' },
    { name: 'Rose Petal Dreams', desc: 'A luxurious position surrounded by beauty and romance' },
    { name: 'Gentle Rain', desc: 'A soft, nurturing position like a warm spring shower' },
    { name: 'Ocean Waves', desc: 'A flowing position that moves like gentle ocean waves' },
    { name: 'Mountain Sunrise', desc: 'A peaceful position that builds slowly like dawn' },
    { name: 'Garden Party', desc: 'A delightful position that celebrates natural beauty' },
    { name: 'Silk Road', desc: 'A luxurious journey of gentle touches and caresses' },
    { name: 'Crystal Clear', desc: 'A pure, transparent connection between loving partners' },
    { name: 'Golden Hour', desc: 'A position perfect for those magical twilight moments' },
    { name: 'Feather Touch', desc: 'Ultra-gentle position focusing on light sensations' },
    { name: 'Velvet Dreams', desc: 'A luxurious position emphasizing soft textures' },
    { name: 'Moonbeam Dance', desc: 'A graceful position under the romantic moonlight' },
    { name: 'Gentle Breeze', desc: 'A refreshing position that flows naturally' },
    { name: 'Sacred Space', desc: 'A position that honors the sacred nature of intimacy' },
    { name: 'Love Poem', desc: 'A position that tells a story of deep affection' },
    { name: 'Wedding Bells', desc: 'A position perfect for celebrating committed love' },
    { name: 'Anniversary Gift', desc: 'A special position for marking relationship milestones' },
    { name: 'Promise Ring', desc: 'A position that symbolizes commitment and devotion' },
    { name: 'First Kiss', desc: 'A position that recreates the magic of first romance' }
  ]
  
  // Passionate position names and descriptions
  const passionateNames = [
    { name: 'Fire Storm', desc: 'An intense position that burns with unbridled passion' },
    { name: 'Lightning Bolt', desc: 'A quick, electrifying position for urgent desires' },
    { name: 'Inferno Dance', desc: 'A position that builds to explosive passion' },
    { name: 'Wild Thunder', desc: 'A powerful position with storm-like intensity' },
    { name: 'Blazing Trail', desc: 'A position that leaves a trail of passionate memories' },
    { name: 'Heat Wave', desc: 'An overwhelmingly hot position for intense moments' },
    { name: 'Volcanic Eruption', desc: 'A position that builds pressure to explosive release' },
    { name: 'Solar Flare', desc: 'A position with the intensity of solar energy' },
    { name: 'Dragon Fire', desc: 'A mythical position with legendary passion' },
    { name: 'Rocket Launch', desc: 'A position that accelerates to incredible heights' },
    { name: 'Tornado Twist', desc: 'A whirlwind position of spinning passion' },
    { name: 'Comet Tail', desc: 'A position that streaks across the sky of pleasure' },
    { name: 'Meteor Shower', desc: 'Multiple waves of passionate intensity' },
    { name: 'Supernova', desc: 'An explosive position that lights up the universe' },
    { name: 'Avalanche', desc: 'An overwhelming rush of passionate sensation' },
    { name: 'Earthquake', desc: 'A position that shakes the very foundations' },
    { name: 'Tsunami Wave', desc: 'An enormous wave of passionate energy' },
    { name: 'Hurricane Force', desc: 'A position with the power of natural forces' },
    { name: 'Lava Flow', desc: 'Slow-building heat that becomes unstoppable' },
    { name: 'Flash Fire', desc: 'Instant ignition of passionate desires' }
  ]
  
  // Adventurous position names and descriptions
  const adventurousNames = [
    { name: 'Bungee Jump', desc: 'A thrilling position for adrenaline-seeking couples' },
    { name: 'Rock Climbing', desc: 'A challenging position requiring trust and coordination' },
    { name: 'Skydiving', desc: 'A position that feels like free-falling through pleasure' },
    { name: 'Safari Adventure', desc: 'A wild exploration of uncharted territories' },
    { name: 'Treasure Map', desc: 'A position that leads to hidden discoveries' },
    { name: 'Arctic Expedition', desc: 'A cool position that gradually builds warmth' },
    { name: 'Desert Mirage', desc: 'A mysterious position that defies expectations' },
    { name: 'Jungle Swing', desc: 'A playful position inspired by forest adventures' },
    { name: 'Mountain Peak', desc: 'A challenging ascent to incredible heights' },
    { name: 'Ocean Dive', desc: 'A deep exploration of underwater pleasures' },
    { name: 'Space Walk', desc: 'A weightless position that defies gravity' },
    { name: 'Time Travel', desc: 'A position that transcends ordinary experience' },
    { name: 'Magic Carpet', desc: 'A fantasy position that takes you on a journey' },
    { name: 'Carnival Ride', desc: 'A fun position with twists and turns' },
    { name: 'Roller Coaster', desc: 'A position with ups, downs, and loops' },
    { name: 'Ferris Wheel', desc: 'A position that offers different perspectives' },
    { name: 'Zip Line', desc: 'A fast-moving position across pleasure landscapes' },
    { name: 'Hot Air Balloon', desc: 'A gentle floating position above the clouds' },
    { name: 'Motorcycle Ride', desc: 'A fast-paced position for speed lovers' },
    { name: 'Train Journey', desc: 'A rhythmic position with steady momentum' }
  ]
  
  // Mixed position names and descriptions
  const mixedNames = [
    { name: 'Color Palette', desc: 'A position that blends different emotional hues' },
    { name: 'Recipe Book', desc: 'A position that combines various ingredients of love' },
    { name: 'Music Box', desc: 'A position that plays different melodies of pleasure' },
    { name: 'Weather Forecast', desc: 'A position that changes like weather patterns' },
    { name: 'Seasonal Shift', desc: 'A position that transitions through different moods' },
    { name: 'Day and Night', desc: 'A position that contrasts different energies' },
    { name: 'Elements Dance', desc: 'A position combining earth, air, fire, and water' },
    { name: 'Mood Swing', desc: 'A position that adapts to emotional changes' },
    { name: 'Personality Plus', desc: 'A position that showcases different aspects of self' },
    { name: 'Chameleon Change', desc: 'A position that adapts to any situation' },
    { name: 'Swiss Army Knife', desc: 'A versatile position with multiple functions' },
    { name: 'All in One', desc: 'A comprehensive position covering all bases' },
    { name: 'Variety Pack', desc: 'A position offering multiple experiences' },
    { name: 'Mix and Match', desc: 'A position that combines favorite elements' },
    { name: 'Fusion Cuisine', desc: 'A position blending different cultural approaches' },
    { name: 'Hybrid Model', desc: 'A position combining the best of all worlds' },
    { name: 'Combination Lock', desc: 'A position requiring the right sequence' },
    { name: 'Playlist Shuffle', desc: 'A position with randomized elements' },
    { name: 'Sampling Platter', desc: 'A position offering tastes of everything' },
    { name: 'Building Blocks', desc: 'A position constructed from multiple elements' }
  ]
  
  let positionId = 32; // Continue from where the manual positions left off
  
  // Generate Romantic positions
  romanticNames.forEach((item, index) => {
    const position: Position = {
      id: `romantic-${positionId}`,
      name: item.name,
      description: item.desc,
      style: 'romantic',
      difficulty: difficulties[index % 4],
      category: categories[index % categories.length],
      tags: generateTags('romantic', item.name),
      instructions: generateInstructions('romantic'),
      benefits: generateBenefits('romantic'),
      views: Math.floor(Math.random() * 20000) + 5000,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
      duration: generateDuration(),
      isPopular: Math.random() > 0.7,
      featured: Math.random() > 0.85
    }
    additionalPositions.push(position)
    positionId++
  })
  
  // Generate Passionate positions
  passionateNames.forEach((item, index) => {
    const position: Position = {
      id: `passionate-${positionId}`,
      name: item.name,
      description: item.desc,
      style: 'passionate',
      difficulty: difficulties[index % 4],
      category: categories[index % categories.length],
      tags: generateTags('passionate', item.name),
      instructions: generateInstructions('passionate'),
      benefits: generateBenefits('passionate'),
      views: Math.floor(Math.random() * 25000) + 8000,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
      duration: generateDuration(),
      isPopular: Math.random() > 0.6,
      featured: Math.random() > 0.8
    }
    additionalPositions.push(position)
    positionId++
  })
  
  // Generate Adventurous positions
  adventurousNames.forEach((item, index) => {
    const position: Position = {
      id: `adventurous-${positionId}`,
      name: item.name,
      description: item.desc,
      style: 'adventurous',
      difficulty: difficulties[index % 4],
      category: categories[index % categories.length],
      tags: generateTags('adventurous', item.name),
      instructions: generateInstructions('adventurous'),
      benefits: generateBenefits('adventurous'),
      views: Math.floor(Math.random() * 15000) + 3000,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
      duration: generateDuration(),
      isPopular: Math.random() > 0.8,
      featured: Math.random() > 0.9
    }
    additionalPositions.push(position)
    positionId++
  })
  
  // Generate Mixed positions
  mixedNames.forEach((item, index) => {
    const position: Position = {
      id: `mixed-${positionId}`,
      name: item.name,
      description: item.desc,
      style: 'mixed',
      difficulty: difficulties[index % 4],
      category: categories[index % categories.length],
      tags: generateTags('mixed', item.name),
      instructions: generateInstructions('mixed'),
      benefits: generateBenefits('mixed'),
      views: Math.floor(Math.random() * 18000) + 6000,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
      duration: generateDuration(),
      isPopular: Math.random() > 0.65,
      featured: Math.random() > 0.82
    }
    additionalPositions.push(position)
    positionId++
  })
  
  return additionalPositions
}

const generateTags = (style: StyleType, name: string): string[] => {
  const baseTags: { [key in StyleType]: string[] } = {
    romantic: ['gentle', 'loving', 'emotional', 'tender', 'sweet', 'caring', 'affectionate'],
    passionate: ['intense', 'fiery', 'hot', 'explosive', 'powerful', 'wild', 'burning'],
    adventurous: ['exciting', 'challenging', 'bold', 'daring', 'creative', 'unique', 'thrilling'],
    mixed: ['versatile', 'balanced', 'adaptable', 'complete', 'varied', 'flexible', 'comprehensive']
  }
  
  const styleSpecific = baseTags[style]
  const nameWords = name.toLowerCase().split(' ')
  return [...styleSpecific.slice(0, 3), ...nameWords.slice(0, 2)].slice(0, 5)
}

const generateInstructions = (style: StyleType): string[] => {
  const instructions: { [key in StyleType]: string[] } = {
    romantic: [
      'Create a romantic atmosphere with soft lighting',
      'Take your time and focus on emotional connection',
      'Maintain gentle eye contact throughout',
      'Express your love and appreciation verbally'
    ],
    passionate: [
      'Build intensity gradually from gentle to passionate',
      'Express your desires openly and enthusiastically',
      'Use powerful, rhythmic movements',
      'Focus on mutual passion and satisfaction'
    ],
    adventurous: [
      'Communicate clearly about boundaries and comfort',
      'Be open to trying new sensations and angles',
      'Support each other through challenges',
      'Celebrate the adventure and discovery together'
    ],
    mixed: [
      'Start with your favorite style as a base',
      'Gradually incorporate elements from other styles',
      'Adapt to both partners\' moods and energy',
      'Create a unique experience that\'s perfect for you'
    ]
  }
  
  return instructions[style]
}

const generateBenefits = (style: StyleType): string[] => {
  const benefits: { [key in StyleType]: string[] } = {
    romantic: [
      'Deepens emotional intimacy',
      'Builds trust and connection',
      'Creates lasting romantic memories',
      'Reduces stress and promotes relaxation'
    ],
    passionate: [
      'Increases passion and desire',
      'Provides intense physical satisfaction',
      'Enhances emotional expression',
      'Creates unforgettable experiences'
    ],
    adventurous: [
      'Expands comfort zones together',
      'Builds trust through challenges',
      'Discovers new preferences',
      'Adds excitement to the relationship'
    ],
    mixed: [
      'Provides comprehensive satisfaction',
      'Adapts to different moods and needs',
      'Offers variety in one experience',
      'Perfect for any relationship stage'
    ]
  }
  
  return benefits[style]
}

const generateDuration = (): string => {
  const durations = [
    '5-10 minutes', '10-15 minutes', '15-20 minutes', '20-25 minutes',
    '25-30 minutes', '30-35 minutes', '35-40 minutes', '40-45 minutes',
    '45-50 minutes', '50-60 minutes'
  ]
  return durations[Math.floor(Math.random() * durations.length)]
}