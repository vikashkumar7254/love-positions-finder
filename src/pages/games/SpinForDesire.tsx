import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { RotateCcw, Play, Heart, Star, Sparkles, Zap, Gift, Crown, RefreshCw } from "lucide-react"
import { getPositionsOptimized } from "@/utils/positionsCache"
import LazyImage from "@/components/LazyImage"
import { Helmet } from "react-helmet-async"

interface DesireItem {
  id: string
  title: string
  description: string
  image: string
  category: 'romantic' | 'passionate' | 'playful' | 'sensual' | 'luxurious'
  color: string
  mediaType?: 'image' | 'gif' | 'video'
}

const SpinForDesire = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DesireItem | null>(null)
  const [rotation, setRotation] = useState(0)
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [allItems, setAllItems] = useState<DesireItem[]>([])
  const wheelRef = useRef<HTMLDivElement>(null)

  const categoryColor = (category: DesireItem["category"]): string => {
    switch (category) {
      case 'romantic': return '#ff6b9d'
      case 'passionate': return '#f8b500'
      case 'playful': return '#6c5ce7'
      case 'sensual': return '#c44569'
      case 'luxurious': return '#f59e0b'
      default: return '#6c5ce7'
    }
  }

  const getRandomCategory = (): DesireItem["category"] => {
    const categories: DesireItem["category"][] = ['romantic', 'passionate', 'playful', 'sensual', 'luxurious']
    return categories[Math.floor(Math.random() * categories.length)]
  }

  // Load 12 random scratch positions for the wheel
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const scratchPositions = await getPositionsOptimized()
        if (mounted && Array.isArray(scratchPositions) && scratchPositions.length > 0) {
          // Shuffle and take 12 random positions - Better randomization
          const shuffled = [...scratchPositions]
          // Fisher-Yates shuffle algorithm for better randomness
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          const random12 = shuffled.slice(0, 12)
          
          // Shuffle categories for more variety
          const categories = ['romantic', 'passionate', 'playful', 'sensual', 'luxurious']
          const shuffledCategories = [...categories].sort(() => Math.random() - 0.5)
          
          const mapped: DesireItem[] = random12.map((pos, index) => {
            const randomCategory = shuffledCategories[index % shuffledCategories.length]
            return {
              id: pos.id || `spin-${Date.now()}-${index}`, // Unique ID with timestamp
              title: pos.title || 'Romantic Position',
              description: pos.description || 'A beautiful intimate moment',
              image: pos.image || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center',
              category: randomCategory,
              color: categoryColor(randomCategory),
              mediaType: (pos.mediaType as 'image' | 'gif' | 'video') || 'image'
            }
          })
          
          setAllItems(mapped)
          console.log('🎯 Spin for Desire: Loaded 12 random scratch positions at', new Date().toLocaleTimeString())
        }
      } catch (error) {
        console.error('Error loading scratch positions for spin wheel:', error)
        // Fallback to empty array
        setAllItems([])
      }
    })()
    return () => { mounted = false }
  }, [])

  // Refresh wheel with new random positions
  const refreshItems = () => {
    // Reload random positions
    window.location.reload()
  }

  const spinWheel = () => {
    if (isSpinning || allItems.length === 0) return

    setIsSpinning(true)
    setSelectedItem(null)

    // Calculate random rotation (multiple full rotations + random position)
    const randomRotation = 1440 + Math.random() * 1440 // 4-8 full rotations
    const finalRotation = rotation + randomRotation

    setRotation(finalRotation)

    // Calculate which item was selected
    const normalizedRotation = finalRotation % 360
    const itemAngle = 360 / allItems.length
    const selectedIndex = Math.floor((360 - normalizedRotation + itemAngle / 2) / itemAngle) % allItems.length

    setTimeout(() => {
      setSelectedItem(allItems[selectedIndex])
      setIsSpinning(false)
    }, 3000) // 3 second spin duration
  }

  const resetWheel = () => {
    setRotation(0)
    setSelectedItem(null)
    setIsSpinning(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'romantic': return Heart
      case 'passionate': return Zap
      case 'playful': return Star
      case 'sensual': return Crown
      case 'luxurious': return Gift
      default: return Sparkles
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <Helmet>
        <title>Spin for Desire | Romantic Wheel Game</title>
        <meta name="description" content="Spin the romantic wheel and discover your next intimate adventure. Admin-curated images and items for a premium experience." />
        <link rel="canonical" href={`${window.location.origin}/games/spin-for-desire`} />
        <meta property="og:title" content="Spin for Desire | Romantic Wheel Game" />
        <meta property="og:description" content="Spin the romantic wheel and discover your next intimate adventure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/games/spin-for-desire`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Spin for Desire',
          applicationCategory: 'GameApplication',
          operatingSystem: 'Web',
          url: `${window.location.origin}/games/spin-for-desire`,
          description: 'Spin the wheel and discover curated romantic ideas.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        })}</script>
      </Helmet>
      <main className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <Gift className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent">
                Spin for Desire
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              Spin the wheel of passion and discover your next romantic adventure! 12 random positions from our collection of 500+ intimate moments. Each visit shows different positions!
            </p>
          </div>

          {/* Spinning Wheel Section */}
          <div className="flex flex-col items-center gap-8">
            {/* Wheel Container */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Wheel Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 sm:-translate-y-2 z-20">
                  <div className="w-0 h-0 border-l-[15px] sm:border-l-[20px] border-r-[15px] sm:border-r-[20px] border-b-[30px] sm:border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg"></div>
                </div>

                {/* Spinning Wheel */}
                <div 
                  ref={wheelRef}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-6 sm:border-8 border-yellow-400 shadow-2xl overflow-hidden"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
                  }}
                >
                  {allItems.map((item, index) => {
                    const angle = (360 / allItems.length) * index
                    const nextAngle = (360 / allItems.length) * (index + 1)
                    const isEven = index % 2 === 0
                    const rotationAngle = (angle + nextAngle) / 2 - 90
                    
                    return (
                      <div
                        key={item.id}
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
                        }}
                      >
                        <div 
                          className="w-full h-full flex items-center justify-center relative"
                          style={{ 
                            backgroundColor: item.color,
                            background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 50%, ${item.color}aa 100%)`
                          }}
                        >
                          {/* Background Image - More prominent */}
                          <LazyImage
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300 rounded-lg"
                          />
                          
                          {/* Gradient Overlay - Lighter for better visibility */}
                          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
                          
                          {/* Content - Rotated to fit the section */}
                          <div 
                            className="relative z-10 text-center p-1 sm:p-2"
                            style={{
                              transform: `rotate(${rotationAngle}deg)`,
                              transformOrigin: 'center'
                            }}
                          >
                            <div className="text-white font-bold text-xs sm:text-sm drop-shadow-2xl text-center leading-tight bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                              {item.title.split(' ')[0]}
                            </div>
                            <div className="text-white/90 text-xs drop-shadow-2xl font-medium bg-black/50 px-1 py-0.5 rounded mt-1 backdrop-blur-sm">
                              {item.category}
                            </div>
                          </div>
                          
                          {/* Decorative Border Lines - More visible */}
                          <div 
                            className="absolute top-0 left-1/2 w-px h-full bg-white/60"
                            style={{ transform: 'translateX(-50%)' }}
                          ></div>
                          <div 
                            className="absolute top-1/2 left-0 w-full h-px bg-white/40"
                            style={{ transform: 'translateY(-50%)' }}
                          ></div>
                          
                          {/* Hover Effect */}
                          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Section Number - More visible */}
                          <div className="absolute top-1 left-1 text-white/80 text-xs font-bold bg-black/50 px-1 py-0.5 rounded">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  
                  {/* Center Circle Background */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 sm:border-6 border-white shadow-2xl z-10"></div>
                </div>

                {/* Interactive Center Circle with Selected Image */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 sm:border-6 border-white shadow-2xl overflow-hidden z-20 transition-all duration-300 hover:scale-110 hover:shadow-yellow-400/50 cursor-pointer"
                  onClick={() => selectedItem && !isSpinning && setShowImagePopup(true)}
                >
                  {selectedItem && !isSpinning ? (
                    <div className="relative w-full h-full">
                      <LazyImage
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                      {/* Overlay with title */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white text-xs font-bold text-center px-2">
                          {selectedItem.title.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white mx-auto mb-1" />
                        <div className="text-white text-xs font-bold">SPIN</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spin Controls Below Wheel */}
            <div className="w-full max-w-md space-y-6">
              <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    {isSpinning ? 'Spinning...' : selectedItem ? 'Your Desire Awaits!' : 'Ready to Spin?'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Spin Button */}
                  <div className="text-center">
                    <button
                      onClick={spinWheel}
                      disabled={isSpinning}
                      className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-white font-bold text-base sm:text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <Play className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                        <span>{isSpinning ? 'Spinning...' : 'Spin the Wheel'}</span>
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {(selectedItem || rotation > 0) && !isSpinning && (
                      <button
                        onClick={resetWheel}
                        className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <RotateCcw className="w-5 h-5" />
                          Reset Wheel
                        </div>
                      </button>
                    )}
                    
                    <button
                      onClick={refreshItems}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-purple-500/30"
                    >
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5" />
                        New Random Set
                      </div>
                    </button>
                  </div>

                  {/* Instructions */}
                  {!selectedItem && !isSpinning && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="text-blue-300 font-bold mb-2">How to Play:</h4>
                      <div className="space-y-1 text-blue-200/80 text-sm">
                        <div>• 12 random positions from 500+ available</div>
                        <div>• Click "Spin the Wheel" to start</div>
                        <div>• Watch as the wheel spins and stops</div>
                        <div>• Discover your romantic adventure</div>
                        <div>• Click center image for full view</div>
                        <div>• Get new random set anytime!</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Selected Result - Mobile Friendly Display */}
          {selectedItem && !isSpinning && (
            <Card variant="elegant" className="bg-gradient-to-br from-black/40 to-black/60 border-yellow-400/40 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                {/* Selected Item Image */}
                <div className="mb-4 sm:mb-6">
                  <LazyImage
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover border-4 border-yellow-400 shadow-2xl"
                  />
                </div>
                
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {(() => {
                    const IconComponent = getCategoryIcon(selectedItem.category)
                    return <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                  })()}
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-400/20 text-yellow-300 rounded-full text-sm sm:text-lg font-medium capitalize border border-yellow-400/30">
                    {selectedItem.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  {selectedItem.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-xl text-white/90 max-w-2xl mx-auto mb-4 sm:mb-6">
                  {selectedItem.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-pink-500/20 text-pink-300 rounded-full text-xs sm:text-sm border border-pink-500/30">
                    ✨ Perfect for Tonight
                  </div>
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 text-purple-300 rounded-full text-xs sm:text-sm border border-purple-500/30">
                    💕 Romantic
                  </div>
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 text-red-300 rounded-full text-xs sm:text-sm border border-red-500/30">
                    🔥 Passionate
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>

      {/* Image Popup Modal */}
      {showImagePopup && selectedItem && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setShowImagePopup(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-black/90 to-black/70 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-yellow-400 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowImagePopup(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-all duration-300 text-lg sm:text-xl"
            >
              ✕
            </button>

            {/* Large Image */}
            <div className="relative flex items-center justify-center bg-gray-100 min-h-[50vh] sm:min-h-[60vh]">
              <LazyImage
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-w-full max-h-[50vh] sm:max-h-[60vh] object-contain"
              />
            </div>

            {/* Content Below Image */}
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-black/90 to-black/70">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                {(() => {
                  const IconComponent = getCategoryIcon(selectedItem.category)
                  return <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-300" />
                })()}
                <span className="px-4 py-2 sm:px-6 sm:py-3 bg-yellow-400/20 text-yellow-300 rounded-full text-sm sm:text-lg lg:text-xl font-bold capitalize border border-yellow-400/30">
                  {selectedItem.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-center">
                {selectedItem.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed text-center mb-6">
                {selectedItem.description}
              </p>
            </div>

            {/* Bottom Action Area */}
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
              {/* Tips and Instructions */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">💡 How to Try This Position</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4 border border-yellow-400/30">
                    <h4 className="text-yellow-300 font-bold mb-2">🎯 Getting Started</h4>
                    <p className="text-white/90 text-sm">Start slowly and communicate with your partner. Make sure both of you are comfortable.</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-pink-400/30">
                    <h4 className="text-pink-300 font-bold mb-2">💕 Communication</h4>
                    <p className="text-white/90 text-sm">Talk about what feels good and adjust as needed. Remember, consent is key!</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm sm:text-base font-medium border border-pink-500/30">
                  ✨ Perfect for Tonight
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm sm:text-base font-medium border border-purple-500/30">
                  💕 Romantic
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500/20 text-red-300 rounded-full text-sm sm:text-base font-medium border border-red-500/30">
                  🔥 Passionate
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm sm:text-base font-medium border border-blue-500/30">
                  🌟 Intimate
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowImagePopup(false)}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg sm:text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  🚀 Start This Adventure
                </button>
                <button
                  onClick={() => {
                    // Copy position details to clipboard
                    const text = `${selectedItem.title}\n${selectedItem.description}\n\nTry this position tonight! 💕`
                    navigator.clipboard.writeText(text)
                    alert('Position details copied to clipboard! 📋')
                  }}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg sm:text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  📋 Copy Details
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-white/70 text-sm">
                  💝 Remember: Every couple is different. Adjust this position to what works best for you both!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpinForDesire
