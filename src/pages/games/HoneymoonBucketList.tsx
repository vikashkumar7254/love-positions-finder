import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, MapPin, Camera, Utensils, Plane, Sparkles, CheckCircle, Circle, Star, Sunset, Wine, Music, Flame } from "lucide-react"

interface BucketListItem {
  id: string
  title: string
  description: string
  category: 'romantic' | 'adventure' | 'relaxation' | 'cultural' | 'intimate' | 'food' | 'memories'
  difficulty: 'easy' | 'medium' | 'challenging'
  location: string
  estimatedCost: 'low' | 'medium' | 'high'
  bestTime: string
  tips: string[]
  spiceTips?: string[]
}

const HoneymoonBucketList = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSpice, setShowSpice] = useState<boolean>(false)

  const bucketListItems: BucketListItem[] = [
    {
      id: 'sunset-beach',
      title: 'Watch Sunset on a Private Beach',
      description: 'Experience a magical sunset together on a secluded beach with champagne and strawberries—just the two of you',
      category: 'romantic',
      difficulty: 'easy',
      location: 'Beach Destination',
      estimatedCost: 'medium',
      bestTime: 'Evening',
      tips: ['Book a private beach setup', 'Bring a cozy blanket', 'Pack some snacks and drinks', 'Don\'t forget the camera'],
      spiceTips: ['Play your special song while the sun sets', 'Feed each other strawberries for a sweet moment']
    },
    {
      id: 'couples-massage',
      title: 'Couples Spa Day',
      description: 'Indulge in a relaxing couples massage and spa treatments together—slow, soothing, and intimate',
      category: 'relaxation',
      difficulty: 'easy',
      location: 'Resort Spa',
      estimatedCost: 'high',
      bestTime: 'Afternoon',
      tips: ['Book in advance', 'Try aromatherapy treatments', 'Stay hydrated', 'Enjoy the relaxation time'],
      spiceTips: ['Choose a shared scent (vanilla/rose)', 'Hold hands during the foot soak']
    },
    {
      id: 'hot-air-balloon',
      title: 'Hot Air Balloon Ride',
      description: 'Soar above beautiful landscapes in a romantic hot air balloon adventure',
      category: 'adventure',
      difficulty: 'medium',
      location: 'Scenic Areas',
      estimatedCost: 'high',
      bestTime: 'Early Morning',
      tips: ['Check weather conditions', 'Wear comfortable clothes', 'Bring a camera', 'Book sunrise flights for best views'],
      spiceTips: ['Share a quiet kiss above the clouds', 'Take a selfie kiss to remember']
    },
    {
      id: 'private-dinner',
      title: 'Private Candlelit Dinner',
      description: 'Enjoy an intimate dinner for two under the stars with personalized service and your favorite playlist',
      category: 'romantic',
      difficulty: 'easy',
      location: 'Resort/Restaurant',
      estimatedCost: 'high',
      bestTime: 'Evening',
      tips: ['Request special decorations', 'Choose meaningful music', 'Dress up for the occasion', 'Order champagne'],
      spiceTips: ['Write a one-line love note for the other', 'Share bites playfully']
    },
    {
      id: 'cooking-class',
      title: 'Local Cooking Class',
      description: 'Learn to cook traditional dishes together and create lasting memories',
      category: 'cultural',
      difficulty: 'medium',
      location: 'Local Cooking School',
      estimatedCost: 'medium',
      bestTime: 'Morning/Afternoon',
      tips: ['Choose local cuisine', 'Wear comfortable clothes', 'Take notes of recipes', 'Enjoy the meal together'],
      spiceTips: ['Feed each other a first taste', 'Pick a dessert to share from one plate']
    },
    {
      id: 'wine-tasting',
      title: 'Wine Tasting Tour',
      description: 'Explore local vineyards and taste exquisite wines together',
      category: 'food',
      difficulty: 'easy',
      location: 'Wine Region',
      estimatedCost: 'medium',
      bestTime: 'Afternoon',
      tips: ['Book a guided tour', 'Pace yourselves', 'Take photos at vineyards', 'Buy a bottle to take home'],
      spiceTips: ['Clink glasses with a soft toast to your future', 'Choose a signature bottle together']
    },
    {
      id: 'adventure-hike',
      title: 'Scenic Hiking Adventure',
      description: 'Hike to a beautiful viewpoint and enjoy nature together',
      category: 'adventure',
      difficulty: 'challenging',
      location: 'Mountains/Hills',
      estimatedCost: 'low',
      bestTime: 'Morning',
      tips: ['Wear proper hiking shoes', 'Bring water and snacks', 'Check trail difficulty', 'Start early to avoid heat'],
      spiceTips: ['Share a kiss at the summit', 'Take a selfie with the view as your backdrop']
    },
    {
      id: 'cultural-tour',
      title: 'Historical Site Exploration',
      description: 'Discover the local history and culture together at famous landmarks',
      category: 'cultural',
      difficulty: 'easy',
      location: 'Historical Sites',
      estimatedCost: 'low',
      bestTime: 'Morning/Afternoon',
      tips: ['Hire a local guide', 'Wear comfortable walking shoes', 'Bring a guidebook', 'Take lots of photos'],
      spiceTips: ['Hold hands during the tour', 'Share a secret kiss near a quiet corner']
    },
    {
      id: 'beach-picnic',
      title: 'Romantic Beach Picnic',
      description: 'Pack a delicious picnic and enjoy it on a beautiful beach',
      category: 'romantic',
      difficulty: 'easy',
      location: 'Beach',
      estimatedCost: 'low',
      bestTime: 'Afternoon',
      tips: ['Pack non-perishable foods', 'Bring a large blanket', 'Don\'t forget sunscreen', 'Include some games'],
      spiceTips: ['Lie down together and listen to the waves', 'Share fruit bites slowly']
    },
    {
      id: 'stargazing',
      title: 'Stargazing Night',
      description: 'Lie under the stars and enjoy the night sky together—quiet, close, and connected',
      category: 'romantic',
      difficulty: 'easy',
      location: 'Clear Sky Area',
      estimatedCost: 'low',
      bestTime: 'Night',
      tips: ['Find a dark location', 'Bring blankets and pillows', 'Download a stargazing app', 'Pack some hot drinks'],
      spiceTips: ['Make 3 wishes together', 'Count falling stars with cuddles']
    },
    {
      id: 'dance-lesson',
      title: 'Private Dance Lesson',
      description: 'Learn a romantic dance together like salsa or ballroom',
      category: 'intimate',
      difficulty: 'medium',
      location: 'Dance Studio/Resort',
      estimatedCost: 'medium',
      bestTime: 'Evening',
      tips: ['Choose a dance you both like', 'Wear comfortable shoes', 'Don\'t worry about perfection', 'Have fun with it'],
      spiceTips: ['End with a slow dip and embrace', 'Whisper compliments between steps']
    },
    {
      id: 'boat-cruise',
      title: 'Sunset Boat Cruise',
      description: 'Sail into the sunset on a romantic boat cruise',
      category: 'romantic',
      difficulty: 'easy',
      location: 'Coastal Area',
      estimatedCost: 'high',
      bestTime: 'Evening',
      tips: ['Book a private cruise if possible', 'Bring motion sickness medicine', 'Dress warmly for evening', 'Enjoy the views'],
      spiceTips: ['Share a cozy blanket at the bow', 'Take a couple selfie at golden hour']
    },
    {
      id: 'snorkel-reaf',
      title: 'Snorkel a Coral Reef',
      description: 'Discover colorful fish side-by-side in crystal waters',
      category: 'adventure',
      difficulty: 'medium',
      location: 'Tropical Cove',
      estimatedCost: 'medium',
      bestTime: 'Morning',
      tips: ['Use reef-safe sunscreen', 'Practice breathing in shallow water first', 'Stay close together'],
      spiceTips: ['Hold hands while floating', 'Share excitement after each sighting']
    },
    {
      id: 'rooftop-dinner',
      title: 'Rooftop City Dinner',
      description: 'Dine with skyline views and twinkling lights',
      category: 'romantic',
      difficulty: 'easy',
      location: 'City Rooftop',
      estimatedCost: 'high',
      bestTime: 'Night',
      tips: ['Reserve window/edge seating', 'Bring a light shawl for wind'],
      spiceTips: ['Share dessert with one spoon', 'Exchange a tiny gift at the table']
    },
    {
      id: 'couple-photoshoot',
      title: 'Couple Photoshoot in Local Attire',
      description: 'Dress in traditional outfits and capture timeless portraits',
      category: 'cultural',
      difficulty: 'easy',
      location: 'Old Town/Studio',
      estimatedCost: 'medium',
      bestTime: 'Afternoon',
      tips: ['Hire a local photographer', 'Choose iconic backdrops'],
      spiceTips: ['Pose forehead-to-forehead', 'Hold a close hand embrace']
    },
    {
      id: 'scooter-coast',
      title: 'Coastal Scooter Ride',
      description: 'Ride along the shoreline and stop for small scenic cafes',
      category: 'adventure',
      difficulty: 'medium',
      location: 'Coastal Road',
      estimatedCost: 'low',
      bestTime: 'Morning',
      tips: ['Wear helmets', 'Plan scenic stops on maps'],
      spiceTips: ['Hug from behind at slow speeds', 'Stop for a quick sunset kiss']
    },
    {
      id: 'airbnb-cook',
      title: 'Cook Together in Your Stay',
      description: 'Pick local ingredients and make dinner as a team',
      category: 'food',
      difficulty: 'medium',
      location: 'Your Stay/Airbnb',
      estimatedCost: 'low',
      bestTime: 'Evening',
      tips: ['Shop a farmers market', 'Choose a simple recipe'],
      spiceTips: ['Taste test from one spoon', 'Dance in the kitchen between steps']
    },
    {
      id: 'sunrise-breakfast',
      title: 'Sunrise Balcony Breakfast',
      description: 'Wake early, sip coffee, and watch the world wake up together',
      category: 'relaxation',
      difficulty: 'easy',
      location: 'Hotel Balcony',
      estimatedCost: 'low',
      bestTime: 'Early Morning',
      tips: ['Order the night before', 'Bring a warm throw'],
      spiceTips: ['Share a croissant bite', 'Write a tiny note on a napkin']
    },
    {
      id: 'couple-yoga',
      title: 'Couple Yoga Session',
      description: 'Stretch and breathe together for harmony and balance',
      category: 'relaxation',
      difficulty: 'medium',
      location: 'Beach/Studio',
      estimatedCost: 'low',
      bestTime: 'Morning',
      tips: ['Bring water and towels', 'Focus on simple partner poses'],
      spiceTips: ['Hold a longer hands-to-heart pose', 'End with a shared deep-breath embrace']
    },
    {
      id: 'night-market',
      title: 'Night Market Date',
      description: 'Taste street foods and pick a tiny souvenir for each other',
      category: 'cultural',
      difficulty: 'easy',
      location: 'Old Town/Night Market',
      estimatedCost: 'low',
      bestTime: 'Night',
      tips: ['Carry small cash', 'Try one new food each'],
      spiceTips: ['Share a sweet drink with two straws', 'Hold hands through the crowd']
    },
    {
      id: 'villa-pool',
      title: 'Private Villa Pool Day',
      description: 'Slow day with swims, sun, and long conversations',
      category: 'relaxation',
      difficulty: 'easy',
      location: 'Private Villa',
      estimatedCost: 'high',
      bestTime: 'Afternoon',
      tips: ['Use sunscreen', 'Bring a waterproof speaker'],
      spiceTips: ['Float together holding hands', 'Share a poolside fruit plate']
    },
    {
      id: 'flower-bath',
      title: 'Flower Bath Experience',
      description: 'A petal-filled bath for a dreamy, intimate soak',
      category: 'intimate',
      difficulty: 'easy',
      location: 'Spa/Resort',
      estimatedCost: 'medium',
      bestTime: 'Evening',
      tips: ['Book ahead', 'Request preferred scents'],
      spiceTips: ['Clink glasses at the tub edge', 'Share a whispered wish']
    },
    {
      id: 'love-postcards',
      title: 'Write Love Postcards',
      description: 'Write postcards to your future selves and mail them home',
      category: 'memories',
      difficulty: 'easy',
      location: 'Cafe/Post',
      estimatedCost: 'low',
      bestTime: 'Afternoon',
      tips: ['Date and address them', 'Add a tiny sketch'],
      spiceTips: ['Seal with a kiss', 'Include one flirty line']
    },
    {
      id: 'lock-bridge',
      title: 'Love Lock Bridge Moment',
      description: 'Place a tiny lock (where allowed) and keep the key as a keepsake',
      category: 'romantic',
      difficulty: 'easy',
      location: 'City Bridge',
      estimatedCost: 'low',
      bestTime: 'Evening',
      tips: ['Check local rules', 'Engrave initials if possible']
    },
    {
      id: 'scenic-train',
      title: 'Scenic Train Ride',
      description: 'Watch landscapes roll by and share snacks by the window',
      category: 'adventure',
      difficulty: 'easy',
      location: 'Countryside Line',
      estimatedCost: 'medium',
      bestTime: 'Morning',
      tips: ['Choose window seats', 'Pack small snacks'],
      spiceTips: ['Share earbuds for a playlist', 'Rest head on shoulder']
    },
    {
      id: 'horseback-beach',
      title: 'Horseback on the Beach',
      description: 'Gentle guided ride with sea breeze and soft sand',
      category: 'adventure',
      difficulty: 'medium',
      location: 'Seaside Ranch',
      estimatedCost: 'medium',
      bestTime: 'Late Afternoon',
      tips: ['Book a beginner-friendly route', 'Wear secure footwear']
    },
    {
      id: 'tandem-kayak',
      title: 'Tandem Kayak Paddle',
      description: 'Glide across calm water as a team',
      category: 'adventure',
      difficulty: 'medium',
      location: 'Lagoon/Lake',
      estimatedCost: 'medium',
      bestTime: 'Morning',
      tips: ['Wear life vests', 'Stay near the shore'],
      spiceTips: ['Pause in a quiet cove to cuddle', 'A shared splash for fun']
    },
    {
      id: 'hammock-chill',
      title: 'Two-Person Hammock Chill',
      description: 'Sway gently under palms with a shared book or playlist',
      category: 'relaxation',
      difficulty: 'easy',
      location: 'Beach Garden',
      estimatedCost: 'low',
      bestTime: 'Late Afternoon',
      tips: ['Choose a shady spot', 'Bring bug spray'],
      spiceTips: ['Read one paragraph to each other', 'Share one earbud for music']
    },
    {
      id: 'fireplace-cabin',
      title: 'Mountain Cabin Fireplace Night',
      description: 'Cozy up by the fire with blankets and a warm drink',
      category: 'relaxation',
      difficulty: 'easy',
      location: 'Mountain Cabin',
      estimatedCost: 'medium',
      bestTime: 'Night',
      tips: ['Bring board/card games', 'Use safe fireplace practices']
    },
    {
      id: 'chocolate-workshop',
      title: 'Chocolate-Making Workshop',
      description: 'Craft truffles together and take a sweet box back',
      category: 'food',
      difficulty: 'medium',
      location: 'Artisan Kitchen',
      estimatedCost: 'medium',
      bestTime: 'Afternoon',
      tips: ['Wear an apron', 'Choose flavors you both enjoy'],
      spiceTips: ['Share a taste from each other’s spoon', 'Pick a signature flavor for “your” truffle']
    },
    {
      id: 'pottery-class',
      title: 'Pottery Couples Class',
      description: 'Create something with your hands and keep as a memento',
      category: 'cultural',
      difficulty: 'medium',
      location: 'Local Studio',
      estimatedCost: 'medium',
      bestTime: 'Morning',
      tips: ['Wear clothes you can get messy', 'Personalize with initials']
    },
    {
      id: 'nude-beach-day',
      title: 'Private Nude Beach Experience',
      description: 'Find a secluded beach where you can enjoy complete privacy and freedom together',
      category: 'intimate',
      difficulty: 'medium',
      location: 'Secluded Beach',
      estimatedCost: 'low',
      bestTime: 'Early Morning/Late Evening',
      tips: ['Research local laws and customs', 'Choose a completely private location', 'Bring sunscreen and towels', 'Start with partial nudity if nervous', 'Enjoy the freedom and intimacy'],
      spiceTips: ['Take sensual photos together', 'Give each other massages with sunscreen', 'End with passionate kissing in the water']
    },
    {
      id: 'hotel-room-service',
      title: 'Seductive Room Service Night',
      description: 'Order room service and turn it into a seductive, intimate dining experience',
      category: 'intimate',
      difficulty: 'easy',
      location: 'Hotel Room',
      estimatedCost: 'medium',
      bestTime: 'Evening',
      tips: ['Order your favorite foods', 'Set up romantic lighting', 'Dress up for the occasion', 'Feed each other playfully', 'Enjoy the privacy'],
      spiceTips: ['Use food items sensually', 'Take turns feeding each other', 'End with passionate lovemaking']
    },
    {
      id: 'sensual-photoshoot',
      title: 'Intimate Photoshoot Session',
      description: 'Take sensual, tasteful photos of each other to create lasting intimate memories',
      category: 'intimate',
      difficulty: 'medium',
      location: 'Hotel Room/Private Space',
      estimatedCost: 'low',
      bestTime: 'Anytime',
      tips: ['Use natural lighting', 'Choose comfortable poses', 'Keep photos private and secure', 'Focus on connection and intimacy', 'Have fun with it'],
      spiceTips: ['Use different outfits and props', 'Take turns being photographer', 'End with passionate kissing and touching']
    },
    {
      id: 'champagne-bath',
      title: 'Champagne Bubble Bath Together',
      description: 'Fill a large tub with champagne and bubbles for an ultra-luxurious, intimate experience',
      category: 'intimate',
      difficulty: 'easy',
      location: 'Hotel Suite/Home',
      estimatedCost: 'high',
      bestTime: 'Evening',
      tips: ['Use a large, comfortable tub', 'Add champagne and bubble bath', 'Set up romantic lighting', 'Bring towels and robes', 'Enjoy the luxury'],
      spiceTips: ['Feed each other champagne', 'Give each other sensual massages', 'End with passionate kissing in the water']
    },
    {
      id: 'midnight-swim',
      title: 'Midnight Pool Swim',
      description: 'Take a romantic midnight swim together, enjoying the privacy and intimacy',
      category: 'intimate',
      difficulty: 'easy',
      location: 'Private Pool',
      estimatedCost: 'low',
      bestTime: 'Night',
      tips: ['Ensure complete privacy', 'Check pool temperature', 'Bring towels and robes', 'Start with gentle swimming', 'Enjoy the intimacy'],
      spiceTips: ['Swim together holding hands', 'Give each other underwater kisses', 'End with passionate touching']
    },
    {
      id: 'sensual-dance',
      title: 'Private Sensual Dance',
      description: 'Dance together sensually in your private space, exploring movement and connection',
      category: 'intimate',
      difficulty: 'medium',
      location: 'Hotel Room/Private Space',
      estimatedCost: 'low',
      bestTime: 'Evening',
      tips: ['Choose music that moves you', 'Start with slow, sensual movements', 'Make eye contact throughout', 'Let the music guide you', 'Enjoy the connection'],
      spiceTips: ['Dance in minimal clothing', 'Incorporate sensual touches', 'End with passionate kissing and touching']
    },
    {
      id: 'chocolate-fondue',
      title: 'Chocolate Fondue Sensual Experience',
      description: 'Turn chocolate fondue into a sensual, playful experience with feeding and touching',
      category: 'intimate',
      difficulty: 'easy',
      location: 'Hotel Room/Private Space',
      estimatedCost: 'medium',
      bestTime: 'Evening',
      tips: ['Prepare chocolate fondue', 'Use various fruits and treats', 'Feed each other playfully', 'Use fingers and tongues', 'Enjoy the mess and fun'],
      spiceTips: ['Use chocolate as body paint', 'Give each other chocolate massages', 'End with passionate kissing']
    },
    {
      id: 'mirror-play',
      title: 'Mirror Intimacy Session',
      description: 'Use mirrors to enhance your intimate experience, watching yourselves together',
      category: 'intimate',
      difficulty: 'medium',
      location: 'Hotel Room/Private Space',
      estimatedCost: 'low',
      bestTime: 'Anytime',
      tips: ['Set up mirrors strategically', 'Start with gentle touching', 'Make eye contact in the mirror', 'Explore different angles', 'Enjoy the visual connection'],
      spiceTips: ['Use the mirror for guidance', 'Take sensual photos in the mirror', 'End with passionate lovemaking']
    },
    {
      id: 'silk-scarves',
      title: 'Silk Scarf Sensual Play',
      description: 'Use silk scarves for gentle, sensual exploration and light bondage play',
      category: 'intimate',
      difficulty: 'medium',
      location: 'Hotel Room/Private Space',
      estimatedCost: 'low',
      bestTime: 'Evening',
      tips: ['Use soft, smooth scarves', 'Start with gentle binding', 'Communicate about comfort', 'Focus on sensation and trust', 'Have scissors nearby for safety'],
      spiceTips: ['Use scarves for blindfolding', 'Incorporate gentle teasing', 'End with passionate kissing and touching']
    },
    {
      id: 'temperature-play',
      title: 'Temperature Sensation Play',
      description: 'Explore different temperatures with ice, warm oil, and other sensations',
      category: 'intimate',
      difficulty: 'medium',
      location: 'Hotel Room/Private Space',
      estimatedCost: 'low',
      bestTime: 'Evening',
      tips: ['Test temperatures on your own skin first', 'Use ice cubes and warm oil', 'Start with gentle touches', 'Communicate about what feels good', 'Enjoy the contrast'],
      spiceTips: ['Use ice cubes for teasing', 'Give warm oil massages', 'End with passionate kissing and touching']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Ideas', icon: Heart, color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    { id: 'romantic', label: 'Romantic', icon: Heart, color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    { id: 'adventure', label: 'Adventure', icon: MapPin, color: 'bg-green-500/20 text-green-300 border-green-500/30' },
    { id: 'relaxation', label: 'Relaxation', icon: Sunset, color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'cultural', label: 'Cultural', icon: Star, color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'food', label: 'Food & Wine', icon: Wine, color: 'bg-red-500/20 text-red-300 border-red-500/30' },
    { id: 'intimate', label: 'Intimate', icon: Music, color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { id: 'memories', label: 'Memories', icon: Camera, color: 'bg-green-500/20 text-green-300 border-green-500/30' }
  ]

  const toggleComplete = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const filteredItems = selectedCategory === 'all' 
    ? bucketListItems 
    : bucketListItems.filter(item => item.category === selectedCategory)

  const completionPercentage = Math.round((completedItems.length / bucketListItems.length) * 100)

  const getCostColor = (cost: string) => {
    switch(cost) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'challenging': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-pink-300" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent text-center">
                Honeymoon Bucket List
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              A sweet checklist of romantic honeymoon ideas to create unforgettable memories together
            </p>

            {/* Progress */}
            <div className="mt-6 sm:mt-8">
              <div className="bg-black/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">Progress</span>
                  <span className="text-pink-300 font-bold">{completedItems.length}/{bucketListItems.length}</span>
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

          {/* Bucket List Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredItems.map((item) => {
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
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300 flex-shrink-0" />
                          <span className="text-white/70 break-words">{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" />
                          <span className="text-white/70 break-words">{item.bestTime}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getCostColor(item.estimatedCost)}`}>
                          {item.estimatedCost} cost
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
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
          {completedItems.length === bucketListItems.length && (
            <Card variant="elegant" className="bg-gradient-to-r from-green-500/20 to-pink-500/20 border-green-500/30 text-center">
              <CardContent className="py-8">
                <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Congratulations! 🎉</h3>
                <p className="text-white/80">
                  You've completed your entire honeymoon bucket list! What an amazing journey together! 💕
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default HoneymoonBucketList
