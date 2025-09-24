import { DifficultyLevel } from '@/types'

export interface RomanticGuide {
  id: string
  title: string
  description: string
  category: RomanticGuideCategory
  difficulty: DifficultyLevel
  duration: string
  icon: string
  color: string
  sections: GuideSection[]
  tips: string[]
  materials?: string[]
  featured: boolean
}

export interface GuideSection {
  id: string
  title: string
  content: string
  steps?: string[]
  examples?: string[]
}

export type RomanticGuideCategory = 
  | 'romantic_connection' 
  | 'sensual_activities' 
  | 'intimate_desires' 
  | 'romance_rituals' 
  | 'atmosphere_setting'

export const romanticGuides: RomanticGuide[] = [
  // Romantic Connection Guides
  {
    id: 'emotional-intimacy',
    title: 'Building Emotional Intimacy',
    description: 'Deepen your emotional connection through meaningful conversations and shared experiences',
    category: 'romantic_connection',
    difficulty: 'beginner',
    duration: 'Ongoing',
    icon: '💝',
    color: 'text-romantic',
    featured: true,
    sections: [
      {
        id: 'understanding',
        title: 'Understanding Emotional Intimacy',
        content: 'Emotional intimacy is the foundation of any deep, lasting relationship. It involves being vulnerable, authentic, and genuinely connected with your partner on an emotional level.'
      },
      {
        id: 'building-blocks',
        title: 'The Building Blocks',
        content: 'Trust, vulnerability, empathy, and open communication form the core of emotional intimacy.',
        steps: [
          'Practice active listening without judgment',
          'Share your feelings openly and honestly',
          'Show empathy and validate your partner\'s emotions',
          'Create safe spaces for vulnerable conversations',
          'Express appreciation and gratitude regularly'
        ]
      },
      {
        id: 'daily-practices',
        title: 'Daily Intimacy Practices',
        content: 'Small, consistent actions that build emotional closeness over time.',
        examples: [
          'Morning coffee conversations about dreams and goals',
          'Evening check-ins about each other\'s day',
          'Weekly relationship appreciation talks',
          'Monthly deep conversation dates',
          'Sharing one thing you\'re grateful for about each other daily'
        ]
      }
    ],
    tips: [
      'Start small with 5-10 minute daily conversations',
      'Put away devices during intimate talks',
      'Practice the 5:1 ratio - five positive interactions for every negative one',
      'Remember that vulnerability takes courage and should be honored',
      'Be patient - emotional intimacy develops over time'
    ]
  },

  {
    id: 'communication-mastery',
    title: 'Mastering Romantic Communication',
    description: 'Learn the art of loving communication that brings you closer together',
    category: 'romantic_connection',
    difficulty: 'intermediate',
    duration: '2-4 weeks practice',
    icon: '💬',
    color: 'text-passionate',
    featured: true,
    sections: [
      {
        id: 'love-languages',
        title: 'Speaking Each Other\'s Love Language',
        content: 'Understanding and speaking your partner\'s primary love language creates deeper connection and reduces misunderstandings.'
      },
      {
        id: 'conflict-resolution',
        title: 'Healthy Conflict Resolution',
        content: 'Transform disagreements into opportunities for deeper understanding and connection.',
        steps: [
          'Use "I" statements to express feelings',
          'Listen to understand, not to win',
          'Take breaks when emotions run high',
          'Focus on solutions, not blame',
          'Always reconnect after resolving issues'
        ]
      },
      {
        id: 'appreciation',
        title: 'The Art of Appreciation',
        content: 'Regular appreciation strengthens your bond and creates positive relationship momentum.',
        examples: [
          'Specific compliments about character traits',
          'Acknowledging efforts, not just achievements',
          'Writing love notes with specific appreciations',
          'Verbal affirmations during intimate moments',
          'Celebrating small wins together'
        ]
      }
    ],
    tips: [
      'Practice the 24-hour rule - wait before discussing heated topics',
      'Create appreciation rituals - daily, weekly, monthly',
      'Use your partner\'s name when speaking to them',
      'Mirror their communication style when they\'re upset',
      'End difficult conversations with affection'
    ]
  },

  // Sensual Activities Guides
  {
    id: 'sensual-massage',
    title: 'Art of Sensual Massage',
    description: 'Create intimate spa experiences that relax, connect, and arouse',
    category: 'sensual_activities',
    difficulty: 'beginner',
    duration: '60-90 minutes',
    icon: '🌸',
    color: 'text-sensual',
    featured: true,
    materials: ['Massage oils', 'Soft towels', 'Candles', 'Relaxing music', 'Comfortable pillows'],
    sections: [
      {
        id: 'preparation',
        title: 'Setting the Scene',
        content: 'The environment is crucial for creating a truly sensual massage experience.',
        steps: [
          'Warm the room to a comfortable temperature',
          'Dim the lights and light candles',
          'Play soft, ambient music',
          'Warm massage oils between your hands',
          'Remove all distractions and interruptions'
        ]
      },
      {
        id: 'techniques',
        title: 'Massage Techniques',
        content: 'Learn basic techniques that feel amazing and build intimacy.',
        steps: [
          'Start with light, teasing touches',
          'Use long, flowing strokes',
          'Vary pressure from light to firm',
          'Pay attention to your partner\'s responses',
          'Focus on often-neglected areas like hands and feet'
        ]
      },
      {
        id: 'connection',
        title: 'Maintaining Connection',
        content: 'Keep the focus on intimacy and connection, not just technique.',
        examples: [
          'Maintain eye contact when possible',
          'Whisper sweet words of appreciation',
          'Check in with your partner\'s comfort',
          'Let your hands linger in tender moments',
          'End with cuddling and gentle affection'
        ]
      }
    ],
    tips: [
      'Quality over quantity - focus on connection, not perfection',
      'Take turns being the giver and receiver',
      'Start with non-intimate areas to build comfort',
      'Use this time for quiet conversation or comfortable silence',
      'Have water available for hydration'
    ]
  },

  {
    id: 'sensual-exploration',
    title: 'Sensual Discovery Journey',
    description: 'Explore new ways to experience pleasure and intimacy together',
    category: 'sensual_activities',
    difficulty: 'intermediate',
    duration: 'Ongoing exploration',
    icon: '✨',
    color: 'text-warm',
    featured: false,
    sections: [
      {
        id: 'sensory-play',
        title: 'Awakening the Senses',
        content: 'Discover how different textures, temperatures, and sensations can enhance intimacy.',
        examples: [
          'Ice cubes for cooling sensations',
          'Feathers for light, tickling touches',
          'Silk scarves for smooth textures',
          'Warm oils for heating sensations',
          'Blindfolds to heighten other senses'
        ]
      },
      {
        id: 'new-experiences',
        title: 'Trying New Things Together',
        content: 'Step outside your comfort zone in a safe, loving environment.',
        steps: [
          'Discuss boundaries and desires openly',
          'Start with small experiments',
          'Check in frequently during new activities',
          'Celebrate discoveries together',
          'Respect any "no" without pressure'
        ]
      }
    ],
    tips: [
      'Communication is essential for any new exploration',
      'Go slow and pay attention to reactions',
      'Remember that not everything will work for everyone',
      'Focus on the journey, not the destination',
      'Create a safe word system for comfort'
    ]
  },

  // Intimate Desires Guides
  {
    id: 'fantasy-exploration',
    title: 'Exploring Fantasies Together',
    description: 'Safely share and explore intimate fantasies as a couple',
    category: 'intimate_desires',
    difficulty: 'advanced',
    duration: 'Ongoing conversation',
    icon: '🌙',
    color: 'text-passionate',
    featured: true,
    sections: [
      {
        id: 'safe-sharing',
        title: 'Creating a Safe Space',
        content: 'Establish trust and safety before sharing intimate fantasies.',
        steps: [
          'Choose a comfortable, private setting',
          'Agree on non-judgmental listening',
          'Start with less intimate fantasies',
          'Respect boundaries and comfort levels',
          'Remember that sharing doesn\'t mean acting out'
        ]
      },
      {
        id: 'exploration-methods',
        title: 'Ways to Explore',
        content: 'Different approaches to fantasy exploration that maintain safety and consent.',
        examples: [
          'Written fantasy exchanges',
          'Verbal storytelling during intimate moments',
          'Role-playing scenarios',
          'Fantasy-inspired romantic dates',
          'Creating shared fantasy stories'
        ]
      },
      {
        id: 'boundaries',
        title: 'Maintaining Healthy Boundaries',
        content: 'Keep fantasy exploration positive and relationship-enhancing.',
        steps: [
          'Establish clear boundaries before exploring',
          'Regular check-ins about comfort levels',
          'Separate fantasy from expectations',
          'Respect when someone isn\'t interested',
          'Focus on mutual pleasure and connection'
        ]
      }
    ],
    tips: [
      'Not all fantasies need to be acted upon',
      'Start with vanilla fantasies before exploring kinkier ones',
      'Remember that fantasy and reality are different',
      'Use fantasy to enhance, not replace, real intimacy',
      'Jealousy about fantasies is normal - discuss it openly'
    ]
  },

  {
    id: 'desire-communication',
    title: 'Communicating Desires',
    description: 'Learn to express your intimate needs and desires clearly and lovingly',
    category: 'intimate_desires',
    difficulty: 'intermediate',
    duration: '1-2 weeks practice',
    icon: '🗣️',
    color: 'text-romantic',
    featured: false,
    sections: [
      {
        id: 'self-awareness',
        title: 'Understanding Your Own Desires',
        content: 'Before you can communicate desires, you need to understand them yourself.',
        steps: [
          'Spend time in self-reflection',
          'Journal about your intimate needs',
          'Notice what feels good and what doesn\'t',
          'Identify emotional needs alongside physical ones',
          'Consider your relationship goals'
        ]
      },
      {
        id: 'expressing-needs',
        title: 'Expressing Needs Lovingly',
        content: 'How to share desires in ways that bring you closer together.',
        examples: [
          '"I love it when you..." instead of "You never..."',
          '"I\'d like to try..." instead of "We should..."',
          '"It would mean a lot to me if..." instead of demands',
          'Timing conversations for relaxed moments',
          'Using positive language and appreciation'
        ]
      }
    ],
    tips: [
      'Choose the right time and place for intimate conversations',
      'Be specific about what you want and need',
      'Listen as much as you speak',
      'Be prepared for different comfort levels',
      'Focus on connection, not just physical desires'
    ]
  },

  // Romance Rituals
  {
    id: 'daily-romance',
    title: 'Daily Romance Rituals',
    description: 'Simple daily practices that keep romance alive in your relationship',
    category: 'romance_rituals',
    difficulty: 'beginner',
    duration: '5-30 minutes daily',
    icon: '🌹',
    color: 'text-romantic',
    featured: true,
    sections: [
      {
        id: 'morning-rituals',
        title: 'Starting the Day with Love',
        content: 'Begin each day by connecting with your partner and setting a loving tone.',
        examples: [
          'Good morning kisses and hugs',
          'Coffee or tea together in bed',
          'Sharing one thing you\'re grateful for',
          'Writing a quick love note for their day',
          'Planning something special for later'
        ]
      },
      {
        id: 'evening-rituals',
        title: 'Ending with Connection',
        content: 'Close each day by reconnecting and appreciating each other.',
        steps: [
          'Put away devices 30 minutes before bed',
          'Share highlights from your day',
          'Express appreciation for something they did',
          'Physical affection - cuddling, massage, holding',
          'Say "I love you" with intention'
        ]
      },
      {
        id: 'weekly-traditions',
        title: 'Weekly Romance Traditions',
        content: 'Establish weekly traditions that you both look forward to.',
        examples: [
          'Date night every Friday',
          'Sunday morning breakfast in bed',
          'Wednesday appreciation texts',
          'Saturday afternoon walks together',
          'Monthly relationship check-ins'
        ]
      }
    ],
    tips: [
      'Consistency matters more than perfection',
      'Customize rituals to fit your schedules and preferences',
      'Take turns planning and initiating',
      'Keep rituals simple and sustainable',
      'Focus on quality time over expensive gestures'
    ]
  },

  {
    id: 'special-occasions',
    title: 'Celebrating Special Moments',
    description: 'Create memorable celebrations for anniversaries, birthdays, and milestones',
    category: 'romance_rituals',
    difficulty: 'intermediate',
    duration: 'Event planning',
    icon: '🎉',
    color: 'text-passionate',
    featured: false,
    sections: [
      {
        id: 'anniversary-ideas',
        title: 'Anniversary Celebrations',
        content: 'Make your anniversaries special and meaningful.',
        examples: [
          'Recreate your first date',
          'Create a photo album of your year together',
          'Write letters to read on future anniversaries',
          'Plan a surprise getaway',
          'Cook your first meal together again'
        ]
      },
      {
        id: 'milestone-moments',
        title: 'Celebrating Relationship Milestones',
        content: 'Acknowledge and celebrate your growth together.',
        steps: [
          'Moving in together celebration',
          'Job promotion or achievement parties',
          'Overcoming challenge ceremonies',
          'Personal growth acknowledgments',
          'Future planning celebrations'
        ]
      }
    ],
    tips: [
      'Focus on meaning over expense',
      'Include personal touches and inside jokes',
      'Document special moments with photos or journals',
      'Create new traditions each year',
      'Remember that your presence is the best present'
    ]
  },

  // Atmosphere Setting
  {
    id: 'romantic-ambiance',
    title: 'Creating Romantic Ambiance',
    description: 'Transform any space into a romantic haven with lighting, scents, and music',
    category: 'atmosphere_setting',
    difficulty: 'beginner',
    duration: '15-30 minutes setup',
    icon: '🕯️',
    color: 'text-warm',
    featured: true,
    materials: ['Candles', 'Soft lighting', 'Music playlist', 'Essential oils', 'Fresh flowers'],
    sections: [
      {
        id: 'lighting',
        title: 'Perfect Lighting',
        content: 'Lighting sets the mood more than any other single element.',
        steps: [
          'Dim overhead lights or turn them off',
          'Use candles for warm, flickering light',
          'Add string lights for magical ambiance',
          'Use lamps with warm, soft bulbs',
          'Consider colored lighting for special effects'
        ]
      },
      {
        id: 'scents',
        title: 'Romantic Scents',
        content: 'Engage the sense of smell to create a multisensory romantic experience.',
        examples: [
          'Vanilla for warmth and comfort',
          'Jasmine for sensuality',
          'Rose for classic romance',
          'Sandalwood for exotic appeal',
          'Clean, fresh scents for purity'
        ]
      },
      {
        id: 'music',
        title: 'Setting the Musical Mood',
        content: 'Choose music that enhances intimacy without overwhelming conversation.',
        steps: [
          'Create playlists for different moods',
          'Keep volume low enough for conversation',
          'Choose songs with positive associations',
          'Avoid overly familiar or distracting music',
          'Consider instrumental or soft vocal music'
        ]
      }
    ],
    tips: [
      'Less is often more when creating ambiance',
      'Test scents beforehand to ensure both partners enjoy them',
      'Have backup plans if candles aren\'t practical',
      'Personal touches matter more than expensive items',
      'Pay attention to temperature and comfort'
    ]
  },

  {
    id: 'bedroom-sanctuary',
    title: 'Bedroom as Romantic Sanctuary',
    description: 'Design your bedroom to support intimacy and romance',
    category: 'atmosphere_setting',
    difficulty: 'intermediate',
    duration: 'Weekend project',
    icon: '🛏️',
    color: 'text-sensual',
    featured: false,
    sections: [
      {
        id: 'physical-space',
        title: 'Optimizing Physical Space',
        content: 'Create a bedroom environment that invites intimacy and relaxation.',
        steps: [
          'Declutter for a peaceful environment',
          'Invest in quality bedding and pillows',
          'Remove work materials and electronics',
          'Add plants for natural beauty and air quality',
          'Create clear pathways and open space'
        ]
      },
      {
        id: 'intimate-touches',
        title: 'Adding Intimate Elements',
        content: 'Include elements that specifically enhance romantic connection.',
        examples: [
          'Silk sheets and soft textures',
          'Dimmer switches for adjustable lighting',
          'A comfortable chair for intimate conversations',
          'Mirror placement for visual appeal',
          'Storage for romantic accessories'
        ]
      }
    ],
    tips: [
      'Make the bedroom a device-free zone',
      'Choose colors that feel warm and inviting',
      'Ensure privacy and soundproofing if needed',
      'Keep the space clean and fresh',
      'Add personal touches that represent your relationship'
    ]
  }
]

export const getGuidesByCategory = (category: RomanticGuideCategory): RomanticGuide[] => {
  return romanticGuides.filter(guide => guide.category === category)
}

export const getFeaturedGuides = (): RomanticGuide[] => {
  return romanticGuides.filter(guide => guide.featured)
}

export const getGuideById = (id: string): RomanticGuide | undefined => {
  return romanticGuides.find(guide => guide.id === id)
}

export const guideCategories = {
  romantic_connection: {
    title: 'Romantic Connection',
    description: 'Deepen your emotional bond and communication',
    icon: '💝',
    color: 'text-romantic'
  },
  sensual_activities: {
    title: 'Sensual Activities',
    description: 'Explore physical intimacy and sensual experiences',
    icon: '🌸',
    color: 'text-sensual'
  },
  intimate_desires: {
    title: 'Intimate Desires',
    description: 'Safely explore fantasies and deeper desires',
    icon: '🌙',
    color: 'text-passionate'
  },
  romance_rituals: {
    title: 'Romance Rituals',
    description: 'Daily and special occasion romantic practices',
    icon: '🌹',
    color: 'text-romantic'
  },
  atmosphere_setting: {
    title: 'Atmosphere Setting',
    description: 'Create the perfect romantic environment',
    icon: '🕯️',
    color: 'text-warm'
  }
}