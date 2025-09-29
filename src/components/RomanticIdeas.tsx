import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, Sparkles, Coffee, Music, Camera, Gift, Clock, RefreshCw } from "lucide-react"

const romanticIdeas = [
  {
    id: 1,
    title: "Candlelit Dinner at Home",
    description: "Cook your partner's favorite meal together, set up candles, and create a restaurant atmosphere at home.",
    icon: Heart,
    category: "Date Night",
    duration: "2-3 hours",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Sunrise/Sunset Picnic",
    description: "Pack a basket with favorite snacks and watch the sunrise or sunset together in a beautiful location.",
    icon: Sparkles,
    category: "Outdoor",
    duration: "3-4 hours",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Memory Lane Photo Walk",
    description: "Visit places that are special to your relationship and recreate old photos or make new memories.",
    icon: Camera,
    category: "Adventure",
    duration: "Half day",
    difficulty: "Medium"
  },
  {
    id: 4,
    title: "Love Letter Exchange",
    description: "Write heartfelt letters to each other and read them aloud over coffee or wine.",
    icon: Heart,
    category: "Intimate",
    duration: "1-2 hours",
    difficulty: "Easy"
  },
  {
    id: 5,
    title: "Stargazing Night",
    description: "Find a quiet spot away from city lights, bring blankets, and spend the night looking at stars together.",
    icon: Sparkles,
    category: "Outdoor",
    duration: "3-5 hours",
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "Dance in the Living Room",
    description: "Create a playlist of your favorite songs and have a private dance party in your living room.",
    icon: Music,
    category: "Indoor Fun",
    duration: "1-2 hours",
    difficulty: "Easy"
  },
  {
    id: 7,
    title: "Surprise Breakfast in Bed",
    description: "Wake up early and surprise your partner with their favorite breakfast served in bed.",
    icon: Coffee,
    category: "Sweet Gesture",
    duration: "1 hour",
    difficulty: "Easy"
  },
  {
    id: 8,
    title: "Midnight Movie Marathon",
    description: "Pick your favorite romantic movies, prepare snacks, and have a cozy movie night under blankets.",
    icon: Heart,
    category: "Date Night",
    duration: "4-6 hours",
    difficulty: "Easy"
  },
  {
    id: 9,
    title: "Flower Garden Visit",
    description: "Visit a botanical garden or flower market together and pick out flowers for each other.",
    icon: Gift,
    category: "Outdoor",
    duration: "2-3 hours",
    difficulty: "Easy"
  },
  {
    id: 10,
    title: "Surprise Date Planning",
    description: "Plan a complete surprise date for your partner based on their interests and favorite activities.",
    icon: Gift,
    category: "Adventure",
    duration: "Full day",
    difficulty: "Medium"
  },
  {
    id: 11,
    title: "Couples Spa Night",
    description: "Create a relaxing spa experience at home with massages, face masks, and soothing music.",
    icon: Sparkles,
    category: "Relaxation",
    duration: "2-3 hours",
    difficulty: "Easy"
  },
  {
    id: 12,
    title: "Local Adventure Day",
    description: "Explore your own city like tourists - visit museums, try new restaurants, or discover hidden gems.",
    icon: Camera,
    category: "Adventure",
    duration: "Full day",
    difficulty: "Medium"
  }
]

const RomanticIdeas = () => {
  const [currentIdea, setCurrentIdea] = useState(romanticIdeas[0])
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-rotate ideas every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getNewIdea()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getNewIdea = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const availableIdeas = romanticIdeas.filter(idea => idea.id !== currentIdea.id)
      const randomIdea = availableIdeas[Math.floor(Math.random() * availableIdeas.length)]
      setCurrentIdea(randomIdea)
      setIsAnimating(false)
    }, 300)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Date Night": "bg-romantic/20 text-romantic",
      "Outdoor": "bg-sensual/20 text-sensual", 
      "Adventure": "bg-passionate/20 text-passionate",
      "Intimate": "bg-warm/20 text-warm",
      "Indoor Fun": "bg-romantic/20 text-romantic",
      "Sweet Gesture": "bg-sensual/20 text-sensual",
      "Relaxation": "bg-warm/20 text-warm"
    }
    return colors[category as keyof typeof colors] || "bg-romantic/20 text-romantic"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "Easy": "bg-green-100 text-green-700",
      "Medium": "bg-yellow-100 text-yellow-700", 
      "Hard": "bg-red-100 text-red-700"
    }
    return colors[difficulty as keyof typeof colors] || "bg-green-100 text-green-700"
  }

  return (
    <section className="px-6 py-12 bg-gradient-to-b from-background to-romantic/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">
            💕 Romantic Ideas for Couples
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
            Fresh romantic ideas to keep the spark alive in your relationship. New ideas every few seconds!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card 
            variant="elegant" 
            className={`bg-gradient-to-br from-romantic/10 to-passionate/5 border border-romantic/20 shadow-xl transition-all duration-300 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}
          >
            <CardHeader className="text-center pb-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-romantic/25 flex items-center justify-center">
                  <currentIdea.icon className="w-5 sm:w-6 h-5 sm:h-6 text-romantic" />
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-center">
                  {currentIdea.title}
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentIdea.category)}`}>
                  {currentIdea.category}
                </span>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentIdea.difficulty)}`}>
                  {currentIdea.difficulty}
                </span>
                <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-background/60 text-foreground/80 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentIdea.duration}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="text-center">
              <p className="text-base sm:text-lg text-foreground/90 mb-6 leading-relaxed">
                {currentIdea.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button 
                  variant="romantic" 
                  onClick={getNewIdea}
                  className="px-6 py-2 flex items-center gap-2 w-full sm:w-auto"
                  disabled={isAnimating}
                >
                  <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
                  {isAnimating ? 'Getting New Idea...' : 'Get New Idea'}
                </Button>
                
                <Button variant="outline" className="px-6 py-2 w-full sm:w-auto">
                  <Heart className="w-4 h-4 mr-2" />
                  Save This Idea
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Ideas Grid */}
          <div className="mt-8">
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-foreground/90">
              Quick Romantic Gestures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { icon: Heart, text: "Leave love notes", color: "text-romantic" },
                { icon: Coffee, text: "Morning coffee surprise", color: "text-warm" },
                { icon: Music, text: "Play their favorite song", color: "text-sensual" },
                { icon: Gift, text: "Small thoughtful gift", color: "text-passionate" }
              ].map((item, index) => (
                <Card key={index} variant="elegant" className="p-3 sm:p-4 text-center hover:scale-105 transition-transform cursor-pointer">
                  <item.icon className={`w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 ${item.color}`} />
                  <p className="text-xs sm:text-sm font-medium text-foreground/80">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RomanticIdeas
