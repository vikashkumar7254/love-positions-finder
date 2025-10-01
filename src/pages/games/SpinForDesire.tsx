import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { RotateCcw, Play, Heart, Star, Sparkles, Zap, Gift, Crown, RefreshCw } from "lucide-react"
import { desireItems } from "@/data/desireItems"
import { getSpinDesires, type SpinDesireItem } from "@/lib/spinDesiresApi"
import { getCategoryImage } from "@/utils/imageManager"
import LazyImage from "@/components/LazyImage"
import { Helmet } from "react-helmet-async"

interface DesireItem {
  id: string
  title: string
  description: string
  image: string
  category: 'romantic' | 'passionate' | 'playful' | 'sensual' | 'luxurious'
  color: string
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

  // Load items: prefer server (admin-managed), fallback to defaults
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const apiItems = await getSpinDesires()
        if (mounted && Array.isArray(apiItems) && apiItems.length > 0) {
          const mapped: DesireItem[] = apiItems.map((it: SpinDesireItem) => ({
            id: it.id,
            title: it.title,
            description: it.description || '',
            image: it.image,
            category: (it.category as DesireItem["category"]) || 'romantic',
            color: categoryColor((it.category as DesireItem["category"]) || 'romantic'),
          }))
          setAllItems(mapped)
          return
        }
      } catch {}
      if (mounted) {
        // Fallback: local defaults
        setAllItems(desireItems)
      }
    })()
    return () => { mounted = false }
  }, [])

  // If needed, future: subscribe to server updates (skipped for now)

  const refreshItems = () => {
    const customItems = loadCustomItems()
    const merged = [...desireItems, ...customItems]
    setAllItems(merged)
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
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Gift className="w-12 h-12 text-pink-300" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent">
                Spin for Desire
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Spin the wheel of passion and discover your next romantic adventure. Let fate decide your intimate moment!
            </p>
          </div>

          {/* Spinning Wheel Section */}
          <div className="flex flex-col items-center gap-8">
            {/* Wheel Container */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Wheel Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                  <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg"></div>
                </div>

                {/* Spinning Wheel */}
                <div 
                  ref={wheelRef}
                  className="relative w-96 h-96 rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
                  }}
                >
                  {allItems.map((item, index) => {
                    const angle = (360 / allItems.length) * index
                    const nextAngle = (360 / allItems.length) * (index + 1)
                    
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
                          style={{ backgroundColor: item.color }}
                        >
                          {/* Background Image */}
                          <LazyImage
                            src={getCategoryImage('games', item.image)}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                            width={200}
                            height={200}
                          />
                          
                          {/* Content */}
                          <div className="relative z-10 text-center p-4">
                            <div className="text-white font-bold text-sm transform rotate-0">
                              {item.title.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Interactive Center Circle with Selected Image */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-6 border-white shadow-2xl overflow-hidden z-10 transition-all duration-300 hover:scale-110 hover:shadow-yellow-400/50 cursor-pointer"
                  onClick={() => selectedItem && !isSpinning && setShowImagePopup(true)}
                >
                  {selectedItem && !isSpinning ? (
                    <LazyImage
                      src={getCategoryImage('games', selectedItem.image)}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onClick={() => setShowImagePopup(true)}
                      width={128}
                      height={128}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-white" />
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
                      className="px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3">
                        <Play className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                        <span>{isSpinning ? 'Spinning...' : 'Spin the Wheel'}</span>
                        <Sparkles className="w-6 h-6" />
                      </div>
                    </button>
                  </div>

                  {/* Reset Button */}
                  {(selectedItem || rotation > 0) && !isSpinning && (
                    <div className="text-center">
                      <button
                        onClick={resetWheel}
                        className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <RotateCcw className="w-5 h-5" />
                          Reset Wheel
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Instructions */}
                  {!selectedItem && !isSpinning && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="text-blue-300 font-bold mb-2">How to Play:</h4>
                      <div className="space-y-1 text-blue-200/80 text-sm">
                        <div>• Click "Spin the Wheel" to start</div>
                        <div>• Watch as the wheel spins and stops</div>
                        <div>• Discover your romantic adventure</div>
                        <div>• Enjoy the moment with your partner!</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Selected Result - Simple Text Display */}
          {selectedItem && !isSpinning && (
            <Card variant="elegant" className="bg-gradient-to-br from-black/40 to-black/60 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {(() => {
                    const IconComponent = getCategoryIcon(selectedItem.category)
                    return <IconComponent className="w-8 h-8 text-yellow-300" />
                  })()}
                  <span className="px-4 py-2 bg-white/20 text-white rounded-full text-lg font-medium capitalize">
                    {selectedItem.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {selectedItem.title}
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                  {selectedItem.description}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                    ✨ Perfect for Tonight
                  </div>
                  <div className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    💕 Romantic
                  </div>
                  <div className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm">
                    🔥 Passionate
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Options Preview */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl text-center">All Desire Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allItems.map((item) => {
                  const IconComponent = getCategoryIcon(item.category)
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedItem?.id === item.id
                          ? 'border-yellow-400 bg-yellow-400/10 scale-105'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: item.color }}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                        <p className="text-white/60 text-xs capitalize">{item.category}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Image Popup Modal */}
      {showImagePopup && selectedItem && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowImagePopup(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-gradient-to-br from-black/90 to-black/70 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowImagePopup(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-all duration-300"
            >
              ✕
            </button>

            {/* Large Image */}
            <div className="relative">
              <LazyImage
                src={getCategoryImage('games', selectedItem.image)}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[70vh] object-cover"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Image Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const IconComponent = getCategoryIcon(selectedItem.category)
                    return <IconComponent className="w-10 h-10 text-yellow-300" />
                  })()}
                  <span className="px-6 py-3 bg-white/20 text-white rounded-full text-xl font-bold capitalize">
                    {selectedItem.category}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {selectedItem.title}
                </h2>
                <p className="text-2xl text-white/90 max-w-3xl leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="p-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-6 py-3 bg-pink-500/20 text-pink-300 rounded-full text-lg font-medium">
                  ✨ Perfect for Tonight
                </div>
                <div className="px-6 py-3 bg-purple-500/20 text-purple-300 rounded-full text-lg font-medium">
                  💕 Romantic
                </div>
                <div className="px-6 py-3 bg-red-500/20 text-red-300 rounded-full text-lg font-medium">
                  🔥 Passionate
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => setShowImagePopup(false)}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Start This Adventure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpinForDesire
