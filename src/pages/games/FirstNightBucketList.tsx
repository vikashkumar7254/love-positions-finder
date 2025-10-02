import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, Moon, Sparkles, CheckCircle, Circle, Star, Music, Wine, Flower, Camera, Gift, Flame } from "lucide-react"

interface FirstNightItem {
  id: string
  title: string
  description: string
  category: 'preparation' | 'romantic' | 'intimate' | 'memories' | 'comfort' | 'connection'
  difficulty: 'easy' | 'medium' | 'special'
  duration: string
  tips: string[]
  sweetLevel: 1 | 2 | 3 | 4 | 5
  spiceTips?: string[]
}

const FirstNightBucketList = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSpice, setShowSpice] = useState<boolean>(false)
  const [comfortLevel, setComfortLevel] = useState<'Gentle' | 'Romantic' | 'Passionate'>('Gentle')

  const firstNightItems: FirstNightItem[] = [
    {
      id: 'romantic-setup',
      title: 'Create a Romantic Room Setup',
      description: 'Transform your bedroom with soft lighting, candles, and rose petals for a magical atmosphere',
      category: 'preparation',
      difficulty: 'easy',
      duration: '30-45 minutes',
      sweetLevel: 4,
      tips: ['Use battery-operated candles for safety', 'Scatter rose petals on the bed', 'Dim the main lights', 'Play soft romantic music'],
      spiceTips: ['Add a light fragrance or linen spray', 'Lay out a silky robe or lingerie as a surprise']
    },
    {
      id: 'gentle-massage',
      title: 'Give Each Other Gentle Massages',
      description: 'Start with tender shoulder and back massages using warm oil and slow, sensual strokes to help each other relax and connect',
      category: 'intimate',
      difficulty: 'easy',
      duration: '15-30 minutes',
      sweetLevel: 3,
      tips: ['Use massage oil or lotion', 'Start with light pressure', 'Focus on shoulders and back', 'Take turns being gentle', 'Check in about pressure and comfort'],
      spiceTips: ['Warm the oil between your hands first', 'Guide hands to preferred areas with gentle whispers']
    },
    {
      id: 'share-vows',
      title: 'Share Personal Vows or Love Letters',
      description: 'Exchange heartfelt letters or personal vows expressing your love and dreams together',
      category: 'connection',
      difficulty: 'medium',
      duration: '20-40 minutes',
      sweetLevel: 5,
      tips: ['Write letters beforehand', 'Speak from the heart', 'Take time to listen', 'Keep letters as keepsakes']
    },
    {
      id: 'champagne-toast',
      title: 'Toast with Champagne or Special Drink',
      description: 'Celebrate your union with a special toast and your favorite drinks',
      category: 'romantic',
      difficulty: 'easy',
      duration: '10-15 minutes',
      sweetLevel: 3,
      tips: ['Chill drinks beforehand', 'Prepare special glasses', 'Make a meaningful toast', 'Take a photo of the moment'],
      spiceTips: ['Add chocolate-dipped strawberries', 'Feed each other a sip to build playful tension']
    },
    {
      id: 'slow-dance',
      title: 'Dance Together to Your Wedding Song',
      description: 'Have a private slow dance to your special song in your intimate space',
      category: 'romantic',
      difficulty: 'easy',
      duration: '10-20 minutes',
      sweetLevel: 4,
      tips: ['Choose your special song', 'Clear some space', 'Hold each other close', 'Enjoy the moment'],
      spiceTips: ['Whisper one compliment each minute', 'Let the dance end with a slow, lingering embrace']
    },
    {
      id: 'comfort-talk',
      title: 'Have an Open Comfort Conversation',
      description: 'Talk openly about your feelings, expectations, and any nervousness in a loving way',
      category: 'connection',
      difficulty: 'medium',
      duration: '20-45 minutes',
      sweetLevel: 4,
      tips: ['Be honest about feelings', 'Listen without judgment', 'Share your hopes', 'Reassure each other']
    },
    {
      id: 'photo-memories',
      title: 'Take Sweet Photos Together',
      description: 'Capture beautiful, tasteful photos of your special night to remember forever',
      category: 'memories',
      difficulty: 'easy',
      duration: '15-30 minutes',
      sweetLevel: 3,
      tips: ['Use soft lighting', 'Focus on faces and hands', 'Capture genuine smiles', 'Keep photos private and special']
    },
    {
      id: 'gentle-bath',
      title: 'Share a Relaxing Bath or Shower',
      description: 'Enjoy a warm, relaxing bath or shower together—dim the lights, add bubbles or bath salts, and savor slow, intimate closeness',
      category: 'intimate',
      difficulty: 'easy',
      duration: '20-40 minutes',
      sweetLevel: 3,
      tips: ['Prepare towels and robes', 'Use nice bath products', 'Keep water temperature comfortable', 'Take your time'],
      spiceTips: ['Light safe, unscented candles nearby', 'Wash each other’s hands and shoulders slowly']
    },
    {
      id: 'feed-treats',
      title: 'Feed Each Other Sweet Treats',
      description: 'Share chocolates, strawberries, or wedding cake in a playful, loving way',
      category: 'romantic',
      difficulty: 'easy',
      duration: '15-25 minutes',
      sweetLevel: 3,
      tips: ['Prepare treats beforehand', 'Use your fingers gently', 'Make eye contact', 'Laugh and enjoy'],
      spiceTips: ['Blindfold for one bite (optional)', 'Describe the taste in a soft voice']
    },
    {
      id: 'comfort-setup',
      title: 'Create a Cozy Comfort Zone',
      description: 'Set up soft pillows, blankets, and a comfortable space for intimate conversations',
      category: 'comfort',
      difficulty: 'easy',
      duration: '15-20 minutes',
      sweetLevel: 2,
      tips: ['Use soft blankets', 'Arrange comfortable pillows', 'Ensure room temperature is perfect', 'Have water nearby']
    },
    {
      id: 'gentle-exploration',
      title: 'Take Time for Gentle Exploration',
      description: 'Explore each other\'s preferences with patience, communication, and lots of love',
      category: 'intimate',
      difficulty: 'special',
      duration: 'As long as needed',
      sweetLevel: 5,
      tips: ['Communicate constantly', 'Go very slowly', 'Focus on comfort', 'Stop anytime if needed'],
      spiceTips: ['Agree on a soft “pause” word beforehand', 'Explore only within comfort—slow is sexy']
    },
    {
      id: 'morning-cuddle',
      title: 'Plan a Sweet Morning Together',
      description: 'Prepare for a lovely morning with breakfast in bed and gentle cuddles',
      category: 'comfort',
      difficulty: 'easy',
      duration: '30-60 minutes',
      sweetLevel: 4,
      tips: ['Prepare breakfast items', 'Stay in comfortable clothes', 'Enjoy slow morning', 'Share your feelings']
    },
    {
      id: 'love-playlist',
      title: 'Create Your Love Playlist',
      description: 'Put together songs that are meaningful to your relationship for the perfect ambiance',
      category: 'preparation',
      difficulty: 'easy',
      duration: '20-30 minutes',
      sweetLevel: 3,
      tips: ['Include your special songs', 'Keep volume soft', 'Mix slow and romantic songs', 'Prepare playlist beforehand']
    },
    {
      id: 'gift-exchange',
      title: 'Exchange Small Meaningful Gifts',
      description: 'Give each other small, thoughtful gifts to commemorate your special night',
      category: 'memories',
      difficulty: 'medium',
      duration: '15-25 minutes',
      sweetLevel: 4,
      tips: ['Choose something personal', 'Write a sweet note', 'Present thoughtfully', 'Explain the meaning']
    },
    {
      id: 'stargazing',
      title: 'Stargaze Together (if possible)',
      description: 'If you have access to a balcony or window, spend time looking at stars and talking',
      category: 'romantic',
      difficulty: 'easy',
      duration: '20-40 minutes',
      sweetLevel: 4,
      tips: ['Find a comfortable spot', 'Bring a blanket', 'Talk about your dreams', 'Enjoy the peaceful moment'],
      spiceTips: ['Make 3 soft wishes together', 'Share one secret dream in a whisper']
    },
    {
      id: 'consent-check',
      title: 'Set Boundaries & Safe Signals',
      description: 'Lovingly agree on comfort levels, boundaries, and a simple pause word so both of you feel safe, respected, and free to explore',
      category: 'connection',
      difficulty: 'easy',
      duration: '5-10 minutes',
      sweetLevel: 4,
      tips: ['Share what feels good and what does not', 'Choose a soft pause phrase (e.g., “slow” or “pause”)', 'Revisit boundaries anytime', 'Offer reassurance and appreciation']
    },
    {
      id: 'midnight-story',
      title: 'Midnight Story Time',
      description: 'Tell each other how you first knew you were in love, and your favorite memory so far',
      category: 'connection',
      difficulty: 'easy',
      duration: '15-25 minutes',
      sweetLevel: 3,
      tips: ['Keep phones away', 'Look into each other’s eyes while sharing']
    },
    {
      id: 'scented-ritual',
      title: 'Scented Oil Ritual',
      description: 'Choose a signature scent for the night and dab it on wrists and neck as a shared memory anchor',
      category: 'preparation',
      difficulty: 'easy',
      duration: '5-10 minutes',
      sweetLevel: 3,
      tips: ['Patch test if sensitive skin', 'Choose soft notes like vanilla or rose'],
      spiceTips: ['Apply the scent on pulse points for a warm trail']
    },
    {
      id: 'pillow-qa',
      title: 'Pillow Talk Q&A',
      description: 'Ask 5 tender questions about hopes, comfort, and what makes each other feel loved',
      category: 'connection',
      difficulty: 'easy',
      duration: '15-20 minutes',
      sweetLevel: 4,
      tips: ['Alternate asking and answering', 'Listen fully before responding']
    },
    {
      id: 'keepsake-box',
      title: 'Keepsake Box Moment',
      description: 'Place a small note or memento from today into a keepsake box to open on your anniversary',
      category: 'memories',
      difficulty: 'easy',
      duration: '10-15 minutes',
      sweetLevel: 4,
      tips: ['Date your note', 'Write one gratitude line each']
    },
    {
      id: 'private-polaroid',
      title: 'Private Polaroid Session',
      description: 'Take a few sweet, tasteful photos together just for you two—kept private and cherished',
      category: 'memories',
      difficulty: 'easy',
      duration: '10-20 minutes',
      sweetLevel: 3,
      tips: ['Use warm lighting', 'Store safely and privately']
    },
    {
      id: 'silky-sheets',
      title: 'Silky Sheet Upgrade',
      description: 'Make the bed ultra-comfortable with soft sheets and extra pillows for maximum coziness',
      category: 'comfort',
      difficulty: 'easy',
      duration: '10-15 minutes',
      sweetLevel: 2,
      tips: ['Fluff pillows', 'Turn down the bed and warm the room']
    },
    {
      id: 'gratitude-exchange',
      title: 'Gratitude Exchange',
      description: 'Each share 3 specific things you love and appreciate about the other—end with a warm hug',
      category: 'connection',
      difficulty: 'easy',
      duration: '10-15 minutes',
      sweetLevel: 4,
      tips: ['Be specific, not general', 'Keep eye contact during the hug']
    },
    {
      id: 'balcony-chill',
      title: 'Balcony Moonlight Chill',
      description: 'Sit together outdoors or by a window with soft music and a warm drink, soaking in the moment',
      category: 'romantic',
      difficulty: 'easy',
      duration: '15-30 minutes',
      sweetLevel: 3,
      tips: ['Bring a shared blanket', 'Keep the playlist low'],
      spiceTips: ['Hold hands under the blanket', 'Rest your head on each other’s shoulder']
    },
    {
      id: 'sensual-massage',
      title: 'Full Body Sensual Massage',
      description: 'Give each other a complete sensual massage with warm oils, exploring every inch of each other\'s body',
      category: 'intimate',
      difficulty: 'medium',
      duration: '45-60 minutes',
      sweetLevel: 5,
      tips: ['Use high-quality massage oil', 'Warm the oil in your hands first', 'Start with gentle pressure', 'Focus on erogenous zones', 'Communicate about pressure and comfort'],
      spiceTips: ['Use different textures - silk, feathers, ice cubes', 'Whisper sweet nothings while massaging', 'End with a passionate kiss']
    },
    {
      id: 'striptease-performance',
      title: 'Private Striptease Performance',
      description: 'Take turns performing a seductive striptease for each other, building anticipation and desire',
      category: 'intimate',
      difficulty: 'medium',
      duration: '20-30 minutes',
      sweetLevel: 5,
      tips: ['Choose music that makes you feel confident', 'Practice your moves beforehand', 'Make eye contact throughout', 'Move slowly and sensually', 'End with a dramatic reveal'],
      spiceTips: ['Use props like scarves or gloves', 'Incorporate your partner into the performance', 'End with passionate kissing and touching']
    },
    {
      id: 'roleplay-fantasy',
      title: 'Roleplay Fantasy Night',
      description: 'Act out your deepest fantasies together, creating characters and scenarios that excite you both',
      category: 'intimate',
      difficulty: 'special',
      duration: '60-90 minutes',
      sweetLevel: 5,
      tips: ['Discuss fantasies beforehand', 'Choose characters you both find attractive', 'Set clear boundaries and safe words', 'Use costumes or props if desired', 'Stay in character throughout'],
      spiceTips: ['Create a detailed backstory for your characters', 'Use different voices and mannerisms', 'End with passionate lovemaking in character']
    },
    {
      id: 'blindfold-exploration',
      title: 'Blindfolded Sensual Exploration',
      description: 'Take turns being blindfolded while your partner explores your body with different textures and sensations',
      category: 'intimate',
      difficulty: 'medium',
      duration: '30-45 minutes',
      sweetLevel: 5,
      tips: ['Use a soft, comfortable blindfold', 'Start with gentle touches', 'Use different textures - silk, feathers, ice', 'Communicate about what feels good', 'Switch roles halfway through'],
      spiceTips: ['Use food items like chocolate or whipped cream', 'Incorporate temperature play with ice and warm oil', 'End with passionate kissing and touching']
    },
    {
      id: 'shower-passion',
      title: 'Passionate Shower Together',
      description: 'Turn your shower into a steamy, passionate experience with soap, water, and intimate touching',
      category: 'intimate',
      difficulty: 'easy',
      duration: '20-30 minutes',
      sweetLevel: 4,
      tips: ['Adjust water temperature to comfortable level', 'Use waterproof lube if needed', 'Be careful of slippery surfaces', 'Take turns washing each other', 'Enjoy the steam and intimacy'],
      spiceTips: ['Use shower gel for sensual massaging', 'Play with water pressure and temperature', 'End with passionate kissing under the water']
    },
    {
      id: 'lingerie-reveal',
      title: 'Lingerie Surprise Reveal',
      description: 'Surprise your partner with sexy lingerie and perform a seductive reveal, building anticipation and desire',
      category: 'intimate',
      difficulty: 'easy',
      duration: '15-25 minutes',
      sweetLevel: 4,
      tips: ['Choose lingerie that makes you feel confident', 'Practice your reveal beforehand', 'Make eye contact throughout', 'Move slowly and sensually', 'Let your partner undress you slowly'],
      spiceTips: ['Use multiple layers for a longer reveal', 'Incorporate music and lighting', 'End with passionate kissing and touching']
    },
    {
      id: 'dirty-talk-session',
      title: 'Dirty Talk and Fantasy Sharing',
      description: 'Share your dirtiest fantasies and desires while engaging in passionate dirty talk together',
      category: 'intimate',
      difficulty: 'medium',
      duration: '30-45 minutes',
      sweetLevel: 5,
      tips: ['Start with gentle, romantic dirty talk', 'Share fantasies you both find exciting', 'Use descriptive language', 'Be open about your desires', 'End with passionate lovemaking'],
      spiceTips: ['Use your partner\'s name frequently', 'Describe what you want to do to them', 'End with passionate kissing and touching']
    },
    {
      id: 'toys-exploration',
      title: 'Intimate Toys Exploration',
      description: 'Explore each other\'s bodies using intimate toys and accessories, discovering new sensations together',
      category: 'intimate',
      difficulty: 'medium',
      duration: '45-60 minutes',
      sweetLevel: 5,
      tips: ['Choose toys you both find exciting', 'Start with gentle, smaller toys', 'Use plenty of lube', 'Communicate about pressure and speed', 'Take turns being pleasured'],
      spiceTips: ['Use different textures and vibrations', 'Incorporate the toys into foreplay', 'End with passionate lovemaking']
    },
    {
      id: 'passionate-kissing',
      title: 'Passionate Kissing Marathon',
      description: 'Spend an entire session focused on passionate, intense kissing, exploring each other\'s mouths and lips',
      category: 'intimate',
      difficulty: 'easy',
      duration: '20-30 minutes',
      sweetLevel: 4,
      tips: ['Start with gentle, soft kisses', 'Vary pressure and intensity', 'Use your tongue sensually', 'Make eye contact between kisses', 'End with passionate lovemaking'],
      spiceTips: ['Use different kissing techniques', 'Incorporate gentle biting and sucking', 'End with passionate touching and kissing']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Ideas', icon: Heart, color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    { id: 'preparation', label: 'Preparation', icon: Star, color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'romantic', label: 'Romantic', icon: Heart, color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    { id: 'intimate', label: 'Intimate', icon: Moon, color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'connection', label: 'Connection', icon: Sparkles, color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
    { id: 'memories', label: 'Memories', icon: Camera, color: 'bg-green-500/20 text-green-300 border-green-500/30' },
    { id: 'comfort', label: 'Comfort', icon: Flower, color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
  ]

  const toggleComplete = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const filteredItems = selectedCategory === 'all' 
    ? firstNightItems 
    : firstNightItems.filter(item => item.category === selectedCategory)

  // Apply comfort level filter (Gentle ≤3, Romantic ≤4, Passionate ≤5)
  const comfortFilteredItems = filteredItems.filter((item) => {
    if (comfortLevel === 'Gentle') return item.sweetLevel <= 3
    if (comfortLevel === 'Romantic') return item.sweetLevel <= 4
    return item.sweetLevel <= 5
  })

  const completionPercentage = Math.round((completedItems.length / firstNightItems.length) * 100)

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'special': return 'bg-pink-500/20 text-pink-300 border-pink-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getSweetLevelText = (level: number) => {
    const levels = ['Sweet', 'Lovely', 'Romantic', 'Magical', 'Unforgettable']
    return levels[level - 1] || 'Sweet'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <Moon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-pink-300" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent text-center">
                First Night Bucket List
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              Gentle and memorable ideas for your special night. Create beautiful moments together with love and care.
            </p>

            {/* Progress */}
            <div className="mt-6 sm:mt-8">
              <div className="bg-black/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">Sweet Memories Created</span>
                  <span className="text-pink-300 font-bold">{completedItems.length}/{firstNightItems.length}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-white/70 text-sm mt-2">{completionPercentage}% Complete</p>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 lg:mb-8">
            {categories.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg border-2 transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 flex items-center gap-1 sm:gap-2 ${
                    selectedCategory === category.id
                      ? `${category.color} shadow-lg scale-105` 
                      : 'bg-black/20 border-white/20 text-white/70 hover:border-white/40'
                  }`}
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>

          {/* Spice Toggle - Now visible on mobile */}
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <button
              onClick={() => setShowSpice(s => !s)}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border-2 text-xs sm:text-sm transition-all bg-black/20 border-white/20 text-white/80 hover:border-white/40"
              title="Show extra romantic tips"
            >
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-300" />
              {showSpice ? 'Hide Extra Tips' : 'Show Extra Tips'}
            </button>
          </div>

          {/* First Night Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {comfortFilteredItems.map((item) => {
              const isCompleted = completedItems.includes(item.id)
              
              return (
                <Card 
                  key={item.id} 
                  variant="elegant" 
                  className={`transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500/10 border-green-500/30 shadow-lg' 
                      : 'bg-black/20 border-white/10 hover:border-pink-500/30'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className={`text-lg sm:text-xl break-words ${
                          isCompleted ? 'text-green-300 line-through' : 'text-white'
                        }`}>
                          {item.title}
                        </CardTitle>
                        <p className={`text-sm sm:text-base mt-2 break-words hyphens-auto ${
                          isCompleted ? 'text-green-200/70' : 'text-white/70'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className="flex-shrink-0 transition-all duration-300 hover:scale-110"
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-white/40 hover:text-pink-300" />
                        )}
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Details */}
                      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" />
                          <span className="text-white/70 break-words">{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-300 flex-shrink-0" />
                          <span className="text-white/70 break-words">{getSweetLevelText(item.sweetLevel)}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {item.category}
                        </span>
                      </div>

                      {/* Tips - Now visible on mobile */}
                      <div className="block">
                        <h4 className="text-white font-semibold mb-2 text-xs sm:text-sm">How to do it:</h4>
                        <ul className="space-y-1">
                          {item.tips.slice(0, 3).map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-white/70">
                              <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                              <span className="break-words hyphens-auto">{tip}</span>
                            </li>
                          ))}
                        </ul>
                        {showSpice && item.spiceTips && item.spiceTips.length>0 && (
                          <div className="mt-3">
                            <h5 className="text-white font-semibold mb-2 text-xs sm:text-sm flex items-center gap-2"><Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-300"/>Extra Tips:</h5>
                            <ul className="space-y-1">
                              {item.spiceTips.slice(0,2).map((tip, i)=>(
                                <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                                  <span className="w-1 h-1 rounded-full bg-orange-300 mt-2 flex-shrink-0"></span>
                                  <span className="break-words hyphens-auto">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Completion Message */}
          {completedItems.length === firstNightItems.length && (
            <Card variant="elegant" className="bg-gradient-to-r from-green-500/20 to-pink-500/20 border-green-500/30 text-center">
              <CardContent className="py-8">
                <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Beautiful! 💕</h3>
                <p className="text-white/80">
                  You've created all these sweet memories together! Your first night was truly magical! ✨
                </p>
              </CardContent>
            </Card>
          )}

          {/* Sweet Message */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 text-center">
            <CardContent className="py-6">
              <Heart className="w-8 h-8 text-pink-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Remember</h3>
              <p className="text-white/70 text-sm">
                Your first night is about love, comfort, and connection. Take your time, communicate openly, 
                and focus on making each other feel loved and cherished. Every couple's journey is unique and beautiful. 💖
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default FirstNightBucketList
