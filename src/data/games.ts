import { Game, TruthOrDareQuestion, DiceAction, LongDistanceActivity } from '@/types'

export const games: Game[] = [
  {
    id: 'truth-or-dare',
    name: 'Truth or Dare',
    type: 'truth_or_dare',
    description: 'Spicy questions and exciting dares for couples to explore together',
    icon: '🎭',
    difficulty: 'beginner',
    duration: '15-30 minutes',
    playerCount: '2',
    category: 'Communication'
  },
  {
    id: 'foreplay-dice',
    name: 'Foreplay Dice',
    type: 'foreplay_dice',
    description: 'Roll the dice for random intimate actions and discover new ways to pleasure each other',
    icon: '🎲',
    difficulty: 'beginner',
    duration: '10-20 minutes',
    playerCount: '2',
    category: 'Foreplay'
  },
  {
    id: 'random-generator',
    name: 'Random Position Generator',
    type: 'random_generator',
    description: 'Randomly select from 500+ intimate positions for spontaneous adventures',
    icon: '🎯',
    difficulty: 'intermediate',
    duration: '5-45 minutes',
    playerCount: '2',
    category: 'Positions'
  },
  {
    id: 'long-distance',
    name: 'Long Distance Love',
    type: 'long_distance',
    description: 'Special activities designed for couples in long-distance relationships',
    icon: '💌',
    difficulty: 'beginner',
    duration: '20-60 minutes',
    playerCount: '2',
    category: 'Connection'
  },
  {
    id: 'love-quiz',
    name: 'Love Language Quiz',
    type: 'quiz',
    description: 'Discover your love languages and how to better connect with your partner',
    icon: '💝',
    difficulty: 'beginner',
    duration: '10-15 minutes',
    playerCount: '2',
    category: 'Understanding'
  }
]

export const truthOrDareQuestions: TruthOrDareQuestion[] = [
  // Truth Questions
  {
    id: 't1',
    type: 'truth',
    question: 'What is your favorite thing about our intimate moments together?',
    spicyLevel: 2,
    category: 'Romance'
  },
  {
    id: 't2',
    type: 'truth',
    question: 'What is one fantasy you have always wanted to try with me?',
    spicyLevel: 4,
    category: 'Fantasy'
  },
  {
    id: 't3',
    type: 'truth',
    question: 'What part of my body drives you crazy with desire?',
    spicyLevel: 3,
    category: 'Attraction'
  },
  {
    id: 't4',
    type: 'truth',
    question: 'When did you first realize you were attracted to me?',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 't5',
    type: 'truth',
    question: 'What is the most romantic thing I have ever done for you?',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 't6',
    type: 'truth',
    question: 'What is your biggest turn-on when we are together?',
    spicyLevel: 3,
    category: 'Desire'
  },
  {
    id: 't7',
    type: 'truth',
    question: 'Have you ever thought about me in a public place?',
    spicyLevel: 4,
    category: 'Fantasy'
  },
  {
    id: 't8',
    type: 'truth',
    question: 'What is one thing you would like me to do more often?',
    spicyLevel: 2,
    category: 'Preferences'
  },

  // Dare Questions
  {
    id: 'd1',
    type: 'dare',
    question: 'Give your partner a sensual 2-minute massage focusing on their shoulders and neck',
    spicyLevel: 2,
    category: 'Touch'
  },
  {
    id: 'd2',
    type: 'dare',
    question: 'Whisper three things you love about your partner in their ear',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 'd3',
    type: 'dare',
    question: 'Feed your partner a piece of fruit using only your mouth',
    spicyLevel: 3,
    category: 'Sensual'
  },
  {
    id: 'd4',
    type: 'dare',
    question: 'Trace your partner\'s lips with your finger very slowly',
    spicyLevel: 2,
    category: 'Touch'
  },
  {
    id: 'd5',
    type: 'dare',
    question: 'Give your partner a passionate kiss that lasts at least 30 seconds',
    spicyLevel: 2,
    category: 'Kissing'
  },
  {
    id: 'd6',
    type: 'dare',
    question: 'Undress your partner using only your teeth (one piece of clothing)',
    spicyLevel: 4,
    category: 'Undressing'
  },
  {
    id: 'd7',
    type: 'dare',
    question: 'Describe your perfect romantic evening together in detail',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 'd8',
    type: 'dare',
    question: 'Give your partner a sensual dance for 1 minute',
    spicyLevel: 3,
    category: 'Performance'
  }
]

export const diceActions: DiceAction[] = [
  {
    id: 'dice1',
    action: 'Kiss',
    bodyPart: 'Neck',
    duration: '30 seconds',
    spicyLevel: 2
  },
  {
    id: 'dice2',
    action: 'Massage',
    bodyPart: 'Shoulders',
    duration: '2 minutes',
    spicyLevel: 1
  },
  {
    id: 'dice3',
    action: 'Caress',
    bodyPart: 'Face',
    duration: '1 minute',
    spicyLevel: 1
  },
  {
    id: 'dice4',
    action: 'Nibble',
    bodyPart: 'Earlobes',
    duration: '45 seconds',
    spicyLevel: 3
  },
  {
    id: 'dice5',
    action: 'Trace',
    bodyPart: 'Arms',
    duration: '1 minute',
    spicyLevel: 2
  },
  {
    id: 'dice6',
    action: 'Whisper to',
    bodyPart: 'Ear',
    duration: '30 seconds',
    spicyLevel: 2
  },
  {
    id: 'dice7',
    action: 'Breathe on',
    bodyPart: 'Neck',
    duration: '20 seconds',
    spicyLevel: 3
  },
  {
    id: 'dice8',
    action: 'Stroke',
    bodyPart: 'Hair',
    duration: '1 minute',
    spicyLevel: 1
  },
  {
    id: 'dice9',
    action: 'Kiss',
    bodyPart: 'Lips',
    duration: '45 seconds',
    spicyLevel: 2
  },
  {
    id: 'dice10',
    action: 'Hug',
    bodyPart: 'Whole body',
    duration: '1 minute',
    spicyLevel: 1
  }
]

export const longDistanceActivities: LongDistanceActivity[] = [
  {
    id: 'ld1',
    title: 'Virtual Date Night',
    description: 'Create a romantic atmosphere even when apart',
    instructions: [
      'Both partners prepare the same meal',
      'Set up video call with romantic lighting',
      'Eat together while sharing conversation',
      'End with a virtual slow dance'
    ],
    duration: '2-3 hours',
    requirements: ['Video calling app', 'Same meal ingredients', 'Romantic music'],
    difficulty: 'beginner',
    type: 'video_call'
  },
  {
    id: 'ld2',
    title: 'Love Letter Exchange',
    description: 'Write heartfelt letters to each other',
    instructions: [
      'Each partner writes a detailed love letter',
      'Include memories, dreams, and feelings',
      'Read letters to each other over video call',
      'Keep letters as treasured keepsakes'
    ],
    duration: '1-2 hours',
    requirements: ['Paper and pen or digital document', 'Video call'],
    difficulty: 'beginner',
    type: 'messaging'
  },
  {
    id: 'ld3',
    title: 'Surprise Delivery',
    description: 'Send unexpected romantic surprises',
    instructions: [
      'Order a surprise gift for your partner',
      'Include a personal note',
      'Time the delivery for maximum impact',
      'Video call their reaction'
    ],
    duration: '30 minutes planning',
    requirements: ['Online shopping access', 'Partner\'s address'],
    difficulty: 'intermediate',
    type: 'surprise'
  },
  {
    id: 'ld4',
    title: 'Dream Planning Session',
    description: 'Plan your future together',
    instructions: [
      'Discuss future travel destinations',
      'Plan activities for when you reunite',
      'Share dreams and goals',
      'Create a shared vision board'
    ],
    duration: '1-2 hours',
    requirements: ['Video call', 'Note-taking app or paper'],
    difficulty: 'beginner',
    type: 'planning'
  },
  {
    id: 'ld5',
    title: 'Synchronized Movie Night',
    description: 'Watch movies together while apart',
    instructions: [
      'Choose a romantic movie both can access',
      'Start the movie at the exact same time',
      'Text or video chat during the movie',
      'Discuss the movie afterward'
    ],
    duration: '2-3 hours',
    requirements: ['Same streaming service', 'Messaging app'],
    difficulty: 'beginner',
    type: 'video_call'
  }
]

export const getRandomTruthOrDare = (type?: 'truth' | 'dare', spicyLevel?: number): TruthOrDareQuestion => {
  let filtered = truthOrDareQuestions
  
  if (type) {
    filtered = filtered.filter(q => q.type === type)
  }
  
  if (spicyLevel) {
    filtered = filtered.filter(q => q.spicyLevel <= spicyLevel)
  }
  
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export const getRandomDiceAction = (): DiceAction => {
  return diceActions[Math.floor(Math.random() * diceActions.length)]
}

export const getRandomLongDistanceActivity = (): LongDistanceActivity => {
  return longDistanceActivities[Math.floor(Math.random() * longDistanceActivities.length)]
}