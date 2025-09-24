import { LoveLanguageActivity, LoveLanguageType } from '@/types'

export const loveLanguageActivities: LoveLanguageActivity[] = [
  // Words of Affirmation
  {
    id: 'wa1',
    title: 'Daily Affirmation Cards',
    description: 'Create personalized affirmation cards for tough days',
    type: 'words_of_affirmation',
    duration: '30-45 minutes',
    difficulty: 'beginner',
    instructions: [
      'Write 20 positive affirmations about your partner',
      'Include specific qualities you love about them',
      'Write them on beautiful cards or paper',
      'Present them as a surprise gift'
    ],
    materials: ['Beautiful cards or paper', 'Nice pens', 'Small box or envelope']
  },
  {
    id: 'wa2',
    title: 'Love Story Video',
    description: 'Create a video montage with loving captions',
    type: 'words_of_affirmation',
    duration: '2-3 hours',
    difficulty: 'intermediate',
    instructions: [
      'Collect photos and videos of your relationship',
      'Add heartfelt captions to each memory',
      'Include your favorite love quotes',
      'Set it to meaningful music'
    ],
    materials: ['Photos/videos', 'Video editing app', 'Music']
  },
  {
    id: 'wa3',
    title: 'Surprise Love Notes',
    description: 'Leave sweet notes in unexpected places',
    type: 'words_of_affirmation',
    duration: '20-30 minutes',
    difficulty: 'beginner',
    instructions: [
      'Write short, sweet messages',
      'Hide them in places your partner will find',
      'Include reasons why you love them',
      'Make it a regular surprise'
    ],
    materials: ['Small notes or sticky notes', 'Pen']
  },
  {
    id: 'wa4',
    title: 'Gratitude Journal',
    description: 'Start a couples\' gratitude journal',
    type: 'words_of_affirmation',
    duration: '15 minutes daily',
    difficulty: 'beginner',
    instructions: [
      'Each partner writes daily appreciations',
      'Focus on specific actions and qualities',
      'Read entries to each other weekly',
      'Celebrate your growth together'
    ],
    materials: ['Beautiful journal', 'Two different colored pens']
  },

  // Physical Touch
  {
    id: 'pt1',
    title: 'Sensual Massage Evening',
    description: 'Create a spa-like massage experience at home',
    type: 'physical_touch',
    duration: '60-90 minutes',
    difficulty: 'intermediate',
    instructions: [
      'Set up a relaxing atmosphere with candles',
      'Warm massage oils to comfortable temperature',
      'Take turns giving 20-minute massages',
      'Focus on connection, not just technique'
    ],
    materials: ['Massage oils', 'Soft towels', 'Candles', 'Relaxing music']
  },
  {
    id: 'pt2',
    title: 'Dancing Together',
    description: 'Share intimate moments through dance',
    type: 'physical_touch',
    duration: '30-60 minutes',
    difficulty: 'beginner',
    instructions: [
      'Choose meaningful songs for your playlist',
      'Start with slow, romantic songs',
      'Focus on holding each other close',
      'Let the music guide your movements'
    ],
    materials: ['Music playlist', 'Space to dance']
  },
  {
    id: 'pt3',
    title: 'Cuddling Ritual',
    description: 'Establish daily physical connection time',
    type: 'physical_touch',
    duration: '15-30 minutes',
    difficulty: 'beginner',
    instructions: [
      'Set aside time each day for cuddling',
      'Put away all electronic devices',
      'Focus on feeling each other\'s presence',
      'Practice synchronized breathing'
    ],
    materials: ['Comfortable blanket', 'Soft pillows']
  },

  // Acts of Service
  {
    id: 'as1',
    title: 'Surprise Breakfast in Bed',
    description: 'Prepare a special breakfast surprise',
    type: 'acts_of_service',
    duration: '45-60 minutes',
    difficulty: 'intermediate',
    instructions: [
      'Wake up early without disturbing your partner',
      'Prepare their favorite breakfast foods',
      'Present beautifully on a tray with flowers',
      'Include a sweet note'
    ],
    materials: ['Breakfast ingredients', 'Nice tray', 'Fresh flower', 'Nice napkins']
  },
  {
    id: 'as2',
    title: 'Complete a Task They Dislike',
    description: 'Take care of something they find stressful',
    type: 'acts_of_service',
    duration: 'Varies',
    difficulty: 'beginner',
    instructions: [
      'Identify a chore or task they dislike',
      'Complete it without being asked',
      'Do it with love and attention to detail',
      'Present it as a gift of love'
    ],
    materials: ['Whatever is needed for the specific task']
  },
  {
    id: 'as3',
    title: 'Plan Their Ideal Day',
    description: 'Organize a day around their preferences',
    type: 'acts_of_service',
    duration: 'Full day',
    difficulty: 'advanced',
    instructions: [
      'Plan activities they love',
      'Handle all the logistics and planning',
      'Include their favorite foods and places',
      'Make it stress-free for them'
    ],
    materials: ['Varies based on planned activities']
  },

  // Quality Time
  {
    id: 'qt1',
    title: 'Device-Free Evening',
    description: 'Spend uninterrupted time together',
    type: 'quality_time',
    duration: '2-4 hours',
    difficulty: 'beginner',
    instructions: [
      'Put away all phones and devices',
      'Choose activities you both enjoy',
      'Focus entirely on each other',
      'Have meaningful conversations'
    ],
    materials: ['Board games, books, or conversation starters']
  },
  {
    id: 'qt2',
    title: 'Memory Lane Journey',
    description: 'Revisit special places from your relationship',
    type: 'quality_time',
    duration: '3-6 hours',
    difficulty: 'intermediate',
    instructions: [
      'Visit the place where you first met',
      'Go to your first date location',
      'Share memories at each location',
      'Take new photos to commemorate'
    ],
    materials: ['Transportation', 'Camera']
  },
  {
    id: 'qt3',
    title: 'Learn Something New Together',
    description: 'Take on a new challenge as a team',
    type: 'quality_time',
    duration: 'Ongoing',
    difficulty: 'intermediate',
    instructions: [
      'Choose a skill you both want to learn',
      'Schedule regular practice sessions',
      'Support each other\'s progress',
      'Celebrate milestones together'
    ],
    materials: ['Varies based on chosen activity']
  },

  // Receiving Gifts
  {
    id: 'rg1',
    title: 'Thoughtful Surprise Box',
    description: 'Create a box of meaningful small gifts',
    type: 'receiving_gifts',
    duration: '1-2 hours',
    difficulty: 'intermediate',
    instructions: [
      'Collect small items that remind you of them',
      'Include handwritten notes explaining each item',
      'Package beautifully in a special box',
      'Present during a quiet moment'
    ],
    materials: ['Small meaningful items', 'Beautiful box', 'Wrapping materials']
  },
  {
    id: 'rg2',
    title: 'Custom Photo Album',
    description: 'Create a personalized photo collection',
    type: 'receiving_gifts',
    duration: '2-3 hours',
    difficulty: 'intermediate',
    instructions: [
      'Collect photos from your relationship',
      'Add captions and dates to each photo',
      'Organize chronologically or by theme',
      'Include space for future memories'
    ],
    materials: ['Photo album', 'Printed photos', 'Decorative materials', 'Pens']
  },
  {
    id: 'rg3',
    title: 'Experience Gift',
    description: 'Give the gift of a shared experience',
    type: 'receiving_gifts',
    duration: 'Planning: 1 hour',
    difficulty: 'beginner',
    instructions: [
      'Think about experiences they\'ve mentioned wanting',
      'Research and book the experience',
      'Create a beautiful gift certificate',
      'Present it with excitement about sharing it together'
    ],
    materials: ['Experience booking', 'Nice paper for certificate']
  }
]

export const loveLanguageDescriptions = {
  words_of_affirmation: {
    title: 'Words of Affirmation',
    description: 'Express your love through heartfelt words and meaningful conversations',
    icon: '💬',
    color: 'text-blue-500',
    quote: 'In all the world, there is no heart for me like yours.'
  },
  physical_touch: {
    title: 'Physical Touch',
    description: 'Show love through appropriate physical affection and touch',
    icon: '🤗',
    color: 'text-pink-500',
    quote: 'Your touch is my favorite feeling.'
  },
  acts_of_service: {
    title: 'Acts of Service',
    description: 'Demonstrate love by doing thoughtful things for your partner',
    icon: '🛠️',
    color: 'text-green-500',
    quote: 'Actions speak louder than words.'
  },
  quality_time: {
    title: 'Quality Time',
    description: 'Show love by giving your partner your undivided attention',
    icon: '⏰',
    color: 'text-purple-500',
    quote: 'Time is the most valuable gift you can give.'
  },
  receiving_gifts: {
    title: 'Receiving Gifts',
    description: 'Express love through thoughtful and meaningful gifts',
    icon: '🎁',
    color: 'text-yellow-500',
    quote: 'It\'s not about the gift, it\'s about the thought behind it.'
  }
}

export const getActivitiesByLoveLanguage = (loveLanguage: LoveLanguageType): LoveLanguageActivity[] => {
  return loveLanguageActivities.filter(activity => activity.type === loveLanguage)
}

export const getRandomLoveLanguageActivity = (loveLanguage?: LoveLanguageType): LoveLanguageActivity => {
  let activities = loveLanguageActivities
  
  if (loveLanguage) {
    activities = getActivitiesByLoveLanguage(loveLanguage)
  }
  
  return activities[Math.floor(Math.random() * activities.length)]
}