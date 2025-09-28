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
  },
  {
    id: 'massage-journey',
    name: 'Erotic Massage Journey',
    type: 'massage_guide',
    description: 'Complete sensual massage guide with ambient music and step-by-step instructions',
    icon: '💆',
    difficulty: 'intermediate',
    duration: '45-90 minutes',
    playerCount: '2',
    category: 'Intimacy'
  }
]

export const truthOrDareQuestions: TruthOrDareQuestion[] = [
  // TRUTH QUESTIONS - Level 1 (Mild)
  {
    id: 't1',
    type: 'truth',
    question: 'What is your favorite thing about our intimate moments together?',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 't2',
    type: 'truth',
    question: 'When did you first realize you were attracted to me?',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 't3',
    type: 'truth',
    question: 'What is the most romantic thing I have ever done for you?',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 't4',
    type: 'truth',
    question: 'What do you find most attractive about me physically?',
    spicyLevel: 1,
    category: 'Attraction'
  },
  {
    id: 't5',
    type: 'truth',
    question: 'What was your first impression of me when we met?',
    spicyLevel: 1,
    category: 'Romance'
  },

  // TRUTH QUESTIONS - Level 2 (Sweet)
  {
    id: 't6',
    type: 'truth',
    question: 'What is one thing you would like me to do more often in our relationship?',
    spicyLevel: 2,
    category: 'Preferences'
  },
  {
    id: 't7',
    type: 'truth',
    question: 'What part of my body do you love to touch the most?',
    spicyLevel: 2,
    category: 'Attraction'
  },
  {
    id: 't8',
    type: 'truth',
    question: 'What is your favorite way for me to show you affection?',
    spicyLevel: 2,
    category: 'Romance'
  },
  {
    id: 't9',
    type: 'truth',
    question: 'Have you ever had a dream about me? Describe it.',
    spicyLevel: 2,
    category: 'Fantasy'
  },
  {
    id: 't10',
    type: 'truth',
    question: 'What is something about me that always makes you smile?',
    spicyLevel: 2,
    category: 'Romance'
  },

  // TRUTH QUESTIONS - Level 3 (Warm)
  {
    id: 't11',
    type: 'truth',
    question: 'What is your biggest turn-on when we are together?',
    spicyLevel: 3,
    category: 'Desire'
  },
  {
    id: 't12',
    type: 'truth',
    question: 'What part of my body drives you crazy with desire?',
    spicyLevel: 3,
    category: 'Attraction'
  },
  {
    id: 't13',
    type: 'truth',
    question: 'What is the naughtiest thought you have had about me today?',
    spicyLevel: 3,
    category: 'Fantasy'
  },
  {
    id: 't14',
    type: 'truth',
    question: 'What is your favorite position when we cuddle?',
    spicyLevel: 3,
    category: 'Intimacy'
  },
  {
    id: 't15',
    type: 'truth',
    question: 'Have you ever fantasized about me while I was not around?',
    spicyLevel: 3,
    category: 'Fantasy'
  },

  // TRUTH QUESTIONS - Level 4 (Spicy)
  {
    id: 't16',
    type: 'truth',
    question: 'What is one fantasy you have always wanted to try with me?',
    spicyLevel: 4,
    category: 'Fantasy'
  },
  {
    id: 't17',
    type: 'truth',
    question: 'Have you ever thought about me in a public place? Where?',
    spicyLevel: 4,
    category: 'Fantasy'
  },
  {
    id: 't18',
    type: 'truth',
    question: 'What is the most adventurous thing you want to try with me?',
    spicyLevel: 4,
    category: 'Adventure'
  },
  {
    id: 't19',
    type: 'truth',
    question: 'What is your secret desire that you have never told me?',
    spicyLevel: 4,
    category: 'Fantasy'
  },
  {
    id: 't20',
    type: 'truth',
    question: 'What is the wildest place you have ever fantasized about being with me?',
    spicyLevel: 4,
    category: 'Fantasy'
  },

  // TRUTH QUESTIONS - Level 5 (Fire)
  {
    id: 't21',
    type: 'truth',
    question: 'What is your deepest, most intimate fantasy involving me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't22',
    type: 'truth',
    question: 'What is something you have always wanted to try but were too shy to ask?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't23',
    type: 'truth',
    question: 'What is the most passionate moment we have shared together?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't24',
    type: 'truth',
    question: 'What is your ultimate fantasy scenario with me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't25',
    type: 'truth',
    question: 'What is something you find incredibly sexy about our intimate moments?',
    spicyLevel: 5,
    category: 'Intimacy'
  },

  // DARE QUESTIONS - Level 1 (Mild)
  {
    id: 'd1',
    type: 'dare',
    question: 'Whisper three things you love about your partner in their ear',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 'd2',
    type: 'dare',
    question: 'Give your partner a gentle 1-minute hand massage',
    spicyLevel: 1,
    category: 'Touch'
  },
  {
    id: 'd3',
    type: 'dare',
    question: 'Look into your partner\'s eyes for 30 seconds without speaking',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 'd4',
    type: 'dare',
    question: 'Give your partner a sweet kiss on the forehead',
    spicyLevel: 1,
    category: 'Kissing'
  },
  {
    id: 'd5',
    type: 'dare',
    question: 'Describe your perfect romantic evening together in detail',
    spicyLevel: 1,
    category: 'Romance'
  },

  // DARE QUESTIONS - Level 2 (Sweet)
  {
    id: 'd6',
    type: 'dare',
    question: 'Give your partner a sensual 2-minute shoulder massage',
    spicyLevel: 2,
    category: 'Touch'
  },
  {
    id: 'd7',
    type: 'dare',
    question: 'Trace your partner\'s lips with your finger very slowly',
    spicyLevel: 2,
    category: 'Touch'
  },
  {
    id: 'd8',
    type: 'dare',
    question: 'Give your partner a passionate kiss that lasts at least 30 seconds',
    spicyLevel: 2,
    category: 'Kissing'
  },
  {
    id: 'd9',
    type: 'dare',
    question: 'Whisper a compliment about your partner\'s body in their ear',
    spicyLevel: 2,
    category: 'Romance'
  },
  {
    id: 'd10',
    type: 'dare',
    question: 'Feed your partner a piece of fruit using only your mouth',
    spicyLevel: 2,
    category: 'Sensual'
  },

  // DARE QUESTIONS - Level 3 (Warm)
  {
    id: 'd11',
    type: 'dare',
    question: 'Give your partner a sensual dance for 1 minute',
    spicyLevel: 3,
    category: 'Performance'
  },
  {
    id: 'd12',
    type: 'dare',
    question: 'Kiss your partner\'s neck for 30 seconds',
    spicyLevel: 3,
    category: 'Kissing'
  },
  {
    id: 'd13',
    type: 'dare',
    question: 'Massage your partner\'s feet while maintaining eye contact',
    spicyLevel: 3,
    category: 'Touch'
  },
  {
    id: 'd14',
    type: 'dare',
    question: 'Whisper your favorite thing about your partner\'s body',
    spicyLevel: 3,
    category: 'Sensual'
  },
  {
    id: 'd15',
    type: 'dare',
    question: 'Give your partner a full back massage for 3 minutes',
    spicyLevel: 3,
    category: 'Touch'
  },

  // DARE QUESTIONS - Level 4 (Spicy)
  {
    id: 'd16',
    type: 'dare',
    question: 'Undress your partner using only your teeth (one piece of clothing)',
    spicyLevel: 4,
    category: 'Undressing'
  },
  {
    id: 'd17',
    type: 'dare',
    question: 'Blindfold your partner and kiss them in three different places',
    spicyLevel: 4,
    category: 'Sensual'
  },
  {
    id: 'd18',
    type: 'dare',
    question: 'Give your partner a sensual massage using oil or lotion',
    spicyLevel: 4,
    category: 'Touch'
  },
  {
    id: 'd19',
    type: 'dare',
    question: 'Describe in detail what you want to do to your partner right now',
    spicyLevel: 4,
    category: 'Fantasy'
  },
  {
    id: 'd20',
    type: 'dare',
    question: 'Use ice cubes to tease your partner for 1 minute',
    spicyLevel: 4,
    category: 'Sensual'
  },

  // DARE QUESTIONS - Level 5 (Fire)
  {
    id: 'd21',
    type: 'dare',
    question: 'Act out your partner\'s favorite fantasy for 5 minutes',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd22',
    type: 'dare',
    question: 'Give your partner a full body massage with complete focus',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd23',
    type: 'dare',
    question: 'Explore your partner\'s body with feathers or silk for 3 minutes',
    spicyLevel: 5,
    category: 'Sensual'
  },
  {
    id: 'd24',
    type: 'dare',
    question: 'Fulfill one of your partner\'s whispered desires right now',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 'd25',
    type: 'dare',
    question: 'Create an intimate moment that your partner will never forget',
    spicyLevel: 5,
    category: 'Intimacy'
  }
]

export const diceActions: DiceAction[] = [
  // Gentle & Romantic (Level 1)
  {
    id: 'dice1',
    action: 'Gently stroke your partner\'s hair while looking into their eyes',
    bodyPart: 'Hair',
    duration: '1-2 minutes',
    spicyLevel: 1
  },
  {
    id: 'dice2',
    action: 'Give a tender massage to relieve tension',
    bodyPart: 'Shoulders',
    duration: '2-3 minutes',
    spicyLevel: 1
  },
  {
    id: 'dice3',
    action: 'Caress your partner\'s face with gentle fingertips',
    bodyPart: 'Face',
    duration: '1 minute',
    spicyLevel: 1
  },
  {
    id: 'dice4',
    action: 'Hold hands and share three things you love about them',
    bodyPart: 'Hands',
    duration: '2 minutes',
    spicyLevel: 1
  },
  {
    id: 'dice5',
    action: 'Give a warm, loving embrace',
    bodyPart: 'Whole body',
    duration: '1 minute',
    spicyLevel: 1
  },

  // Sweet & Playful (Level 2)
  {
    id: 'dice6',
    action: 'Kiss softly and tenderly',
    bodyPart: 'Lips',
    duration: '30-45 seconds',
    spicyLevel: 2
  },
  {
    id: 'dice7',
    action: 'Plant gentle kisses along the neckline',
    bodyPart: 'Neck',
    duration: '1 minute',
    spicyLevel: 2
  },
  {
    id: 'dice8',
    action: 'Trace patterns on your partner\'s skin with fingertips',
    bodyPart: 'Arms',
    duration: '1-2 minutes',
    spicyLevel: 2
  },
  {
    id: 'dice9',
    action: 'Whisper sweet compliments and desires',
    bodyPart: 'Ear',
    duration: '30 seconds',
    spicyLevel: 2
  },
  {
    id: 'dice10',
    action: 'Give a sensual back massage with warm hands',
    bodyPart: 'Back',
    duration: '2-3 minutes',
    spicyLevel: 2
  },

  // Warm & Sensual (Level 3)
  {
    id: 'dice11',
    action: 'Nibble gently and teasingly',
    bodyPart: 'Earlobes',
    duration: '45 seconds',
    spicyLevel: 3
  },
  {
    id: 'dice12',
    action: 'Breathe warm air softly',
    bodyPart: 'Neck',
    duration: '30 seconds',
    spicyLevel: 3
  },
  {
    id: 'dice13',
    action: 'Kiss and caress with increasing passion',
    bodyPart: 'Collarbone',
    duration: '1-2 minutes',
    spicyLevel: 3
  },
  {
    id: 'dice14',
    action: 'Run fingers through hair while kissing',
    bodyPart: 'Hair & Lips',
    duration: '1 minute',
    spicyLevel: 3
  },
  {
    id: 'dice15',
    action: 'Massage with oils or lotion sensually',
    bodyPart: 'Legs',
    duration: '2-3 minutes',
    spicyLevel: 3
  },

  // Spicy & Passionate (Level 4)
  {
    id: 'dice16',
    action: 'Kiss passionately while exploring with hands',
    bodyPart: 'Lips & Body',
    duration: '1-2 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice17',
    action: 'Tease with light touches and whispered fantasies',
    bodyPart: 'Inner thighs',
    duration: '2 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice18',
    action: 'Use ice cubes to create thrilling sensations',
    bodyPart: 'Chest',
    duration: '1-2 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice19',
    action: 'Blindfold your partner and use feathers or silk',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice20',
    action: 'Give a full body massage with heated oils',
    bodyPart: 'Entire body',
    duration: '5-10 minutes',
    spicyLevel: 4
  },

  // Fire & Intense (Level 5)
  {
    id: 'dice21',
    action: 'Explore with passionate intensity and desire',
    bodyPart: 'Intimate areas',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice22',
    action: 'Use warming oils for an intense sensual experience',
    bodyPart: 'Sensitive zones',
    duration: '2-4 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice23',
    action: 'Create anticipation with slow, deliberate touches',
    bodyPart: 'Erogenous zones',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice24',
    action: 'Engage in passionate foreplay with complete focus',
    bodyPart: 'Full body',
    duration: '5-10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice25',
    action: 'Fulfill a whispered fantasy together',
    bodyPart: 'As desired',
    duration: '10+ minutes',
    spicyLevel: 5
  },

  // Additional Creative Actions
  {
    id: 'dice26',
    action: 'Feed each other strawberries or chocolate sensually',
    bodyPart: 'Lips',
    duration: '2-3 minutes',
    spicyLevel: 2
  },
  {
    id: 'dice27',
    action: 'Dance together slowly and intimately',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 2
  },
  {
    id: 'dice28',
    action: 'Take turns describing what you want to do next',
    bodyPart: 'Mind',
    duration: '1-2 minutes',
    spicyLevel: 3
  },
  {
    id: 'dice29',
    action: 'Use your breath to create goosebumps',
    bodyPart: 'Spine',
    duration: '1 minute',
    spicyLevel: 3
  },
  {
    id: 'dice30',
    action: 'Create a trail of kisses from head to toe',
    bodyPart: 'Entire body',
    duration: '3-5 minutes',
    spicyLevel: 4
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

export const getRandomDiceAction = (maxSpicyLevel?: number, mode?: 'romantic' | 'spicy'): DiceAction => {
  let filtered = diceActions
  
  if (maxSpicyLevel) {
    filtered = filtered.filter(action => action.spicyLevel <= maxSpicyLevel)
  }
  
  if (mode === 'romantic') {
    filtered = filtered.filter(action => action.spicyLevel <= 3)
  } else if (mode === 'spicy') {
    filtered = filtered.filter(action => action.spicyLevel >= 3)
  }
  
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export const getRandomLongDistanceActivity = (): LongDistanceActivity => {
  return longDistanceActivities[Math.floor(Math.random() * longDistanceActivities.length)]
}