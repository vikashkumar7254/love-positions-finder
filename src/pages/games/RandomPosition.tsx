import { useState, useEffect } from "react"
import { getPositions as apiGetPositions } from "@/lib/positionsApi"
import { getPositionsOptimized } from "@/utils/positionsCache"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Shuffle, Heart, Sparkles } from "lucide-react"
import Navigation from "@/components/Navigation"

type Position = {
  id: string
  title: string
  image: string
  isDefault?: boolean
}

const RandomPosition = () => {
  const [positions, setPositions] = useState<Position[]>([])
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load positions with instant cache
  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await getPositionsOptimized()
        setPositions(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    loadPositions()
    document.title = "Random Position Generator | ScratchSexPositions"
  }, [])

  // Get random position
  const getRandomPosition = () => {
    if (positions.length === 0) return

    setIsRevealing(true)
    
    // Add suspense with multiple random selections
    let count = 0
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * positions.length)
      setCurrentPosition(positions[randomIndex])
      count++
      
      if (count >= 8) { // Show 8 quick changes for suspense
        clearInterval(interval)
        setTimeout(() => {
          setIsRevealing(false)
          setHasRevealed(true)
        }, 300)
      }
    }, 100)
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-romantic via-passionate to-sensual">
        <Navigation />
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
              <p className="text-white/70">Loading positions...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic via-passionate to-sensual">
      <Navigation />
      <main className="pt-16 pb-8 px-4 sm:pt-20 sm:pb-12 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2">
              Random Position Generator
            </h1>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2 leading-relaxed">
              Get instant random position suggestions with a single click. Perfect for spontaneous intimate moments!
            </p>
          </div>
          {/* Main Game Area */}
          <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            
            {/* Position Card */}
            <div className="w-full max-w-sm sm:max-w-md">
              {!currentPosition ? (
                // Initial state
                <Card variant="elegant" className="bg-gradient-to-br from-black/60 to-black/80 border-pink-500/30 shadow-2xl rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <Shuffle className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white/60" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Ready to Discover?</h3>
                    <p className="text-white/70 text-xs sm:text-sm lg:text-base">Click the button below to reveal a random position</p>
                  </CardContent>
                </Card>
              ) : (
                // Position revealed
                <Card variant="elegant" className={`bg-gradient-to-br from-black/60 to-black/80 border-pink-500/30 shadow-2xl rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                  isRevealing ? 'scale-105 shadow-pink-500/20' : hasRevealed ? 'scale-100' : ''
                }`}>
                  <div className="relative">
                    {/* Image */}
                    <div className="h-40 sm:h-48 lg:h-64 bg-muted overflow-hidden relative">
                      <img
                        src={currentPosition.image}
                        alt={currentPosition.title}
                        className={`w-full h-full object-contain transition-all duration-300 ${
                          isRevealing ? 'blur-sm scale-110' : 'blur-0 scale-100'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Position+Image'
                        }}
                      />
                      
                      {/* Revealing overlay */}
                      {isRevealing && (
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 animate-spin" />
                            <p className="text-xs sm:text-sm">Revealing...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <CardContent className="p-2 sm:p-3">
                      <h3 className={`text-base sm:text-lg lg:text-xl font-bold text-white text-center transition-all duration-300 px-2 ${
                        isRevealing ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                      }`}>
                        {currentPosition.title}
                      </h3>
                    </CardContent>
                  </div>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center px-4">
              {!hasRevealed ? (
                <Button
                  onClick={getRandomPosition}
                  disabled={positions.length === 0 || isRevealing}
                  variant="romantic"
                  size="lg"
                  className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold w-full sm:w-auto"
                >
                  {isRevealing ? (
                    <>
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                      <span className="text-xs sm:text-sm lg:text-base">Revealing...</span>
                    </>
                  ) : (
                    <>
                      <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm lg:text-base">Generate Random Position</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={getRandomPosition}
                  disabled={positions.length === 0 || isRevealing}
                  variant="romantic"
                  size="lg"
                  className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold w-full sm:w-auto"
                >
                  <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-xs sm:text-sm lg:text-base">Get Another Position</span>
                </Button>
              )}
            </div>

            {/* Empty State */}
            {positions.length === 0 && !loading && (
              <Card variant="elegant" className="bg-black/40 border-white/10 backdrop-blur-sm mx-4">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="text-5xl sm:text-6xl mb-4">📭</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No Positions Available</h3>
                  <p className="text-white/70 text-sm sm:text-base">
                    Positions will appear here once they're added by the admin.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* How it Works */}
          <Card variant="elegant" className="bg-black/20 border-white/10 backdrop-blur-sm mx-4">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-center text-base sm:text-lg lg:text-xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 text-center">
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-pink-300 font-bold text-sm sm:text-base">1</span>
                  </div>
                  <h4 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Click Generate</h4>
                  <p className="text-white/70 text-xs sm:text-sm">Press the button to start the random selection</p>
                </div>
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-purple-300 font-bold text-sm sm:text-base">2</span>
                  </div>
                  <h4 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Watch the Magic</h4>
                  <p className="text-white/70 text-xs sm:text-sm">Enjoy the suspenseful reveal animation</p>
                </div>
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-pink-300 font-bold text-sm sm:text-base">3</span>
                  </div>
                  <h4 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Discover & Enjoy</h4>
                  <p className="text-white/70 text-xs sm:text-sm">Your random position is revealed - time to explore!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default RandomPosition
