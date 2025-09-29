import { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Eye, Gift, RefreshCw } from "lucide-react"
import { scratchPositions } from "@/data/scratchPositions"

interface ScratchCard {
  id: string
  title: string
  image: string
  revealed: boolean
}

const ScratchPosition = () => {
  const location = useLocation()
  const [cards, setCards] = useState<ScratchCard[]>([])
  const [isScratching, setIsScratching] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)
  const [started, setStarted] = useState(false)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  // Build cards from data file for easy future additions
  const positionCards: ScratchCard[] = scratchPositions.map(p => ({ ...p, revealed: false }))

  // Load admin-added custom items from localStorage
  const loadCustom = (): ScratchCard[] => {
    try {
      const raw = localStorage.getItem('scratch_positions_custom')
      const arr = raw ? JSON.parse(raw) as { id: string; title: string; image: string }[] : []
      if (!Array.isArray(arr)) return []
      return arr.map(it => ({ ...it, revealed: false }))
    } catch {
      return []
    }
  }

  const refreshCards = () => {
    const merged = [...positionCards, ...loadCustom()]
    setCards(merged.map(c => ({ ...c, revealed: false })))
    canvasRefs.current = canvasRefs.current.slice(0, merged.length)

    // Reinitialize canvases
    setTimeout(() => {
      canvasRefs.current.forEach((canvas, index) => {
        if (canvas) {
          initializeScratchCanvas(canvas, index)
        }
      })
    }, 100)
  }

  useEffect(() => {
    // Always start fresh on load and merge defaults with admin custom
    const merged = [...positionCards, ...loadCustom()]
    setCards(merged.map(c => ({ ...c, revealed: false })))
    // Initialize canvas scratch effects
    canvasRefs.current = canvasRefs.current.slice(0, merged.length)

    // Initialize canvases after a short delay to ensure DOM is ready
    setTimeout(() => {
      canvasRefs.current.forEach((canvas, index) => {
        if (canvas) {
          initializeScratchCanvas(canvas, index)
        }
      })
    }, 100)
  }, [])

  // Add localStorage change listener to refresh when admin adds new items
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'scratch_positions_custom' && e.newValue) {
        // Refresh cards when custom positions are updated
        const merged = [...positionCards, ...loadCustom()]
        setCards(merged.map(c => ({ ...c, revealed: false })))
        canvasRefs.current = canvasRefs.current.slice(0, merged.length)
      }
    }

    // Listen for storage events (works across tabs)
    window.addEventListener('storage', handleStorageChange)

    // Also listen for focus events to refresh when user returns to tab
    const handleFocus = () => {
      const merged = [...positionCards, ...loadCustom()]
      setCards(merged.map(c => ({ ...c, revealed: false })))
      canvasRefs.current = canvasRefs.current.slice(0, merged.length)
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [positionCards])

  // Smoothly scroll to the grid when starting
  useEffect(() => {
    if (started && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [started])

  // Auto-start behavior
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const explicitIntro = params.get('intro') === '1'
    const explicitStart = params.get('start') === '1' || location.hash === '#start'
    // Default: start automatically unless intro=1 is present
    const shouldStart = explicitStart || !explicitIntro
    // Defer a tick to ensure DOM is painted
    if (shouldStart) requestAnimationFrame(() => setStarted(true))
  }, [location.search, location.hash])

  const initializeScratchCanvas = (canvas: HTMLCanvasElement, index: number) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get the actual card dimensions
    const card = canvas.parentElement
    if (!card) return
    
    const rect = card.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Silver scratch coating overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#eeeeee')
    gradient.addColorStop(0.5, '#cfcfcf')
    gradient.addColorStop(1, '#fafafa')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Subtle metallic noise
    ctx.globalCompositeOperation = 'source-over'
    for (let i = 0; i < 1800; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        3,
        3
      )
    }

    // Instruction text
    ctx.fillStyle = '#374151'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('🔒 Scratch to Reveal', canvas.width / 2, canvas.height / 2 - 20)
    
    ctx.font = '16px Arial'
    ctx.fillStyle = '#4b5563'
    ctx.fillText('Hidden Position', canvas.width / 2, canvas.height / 2 + 10)
    
    ctx.font = '14px Arial'
    ctx.fillStyle = '#6b7280'
    ctx.fillText('Use mouse or finger to scratch', canvas.width / 2, canvas.height / 2 + 35)
  }

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, index: number) => {
    const canvas = canvasRefs.current[index]
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    let x: number, y: number

    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0]
      x = touch.clientX - rect.left
      y = touch.clientY - rect.top
    } else {
      // Mouse event
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    // Create scratch effect
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    // Make scratch radius larger for touch events (mobile)
    const scratchRadius = 'touches' in e ? 25 : 20
    ctx.arc(x, y, scratchRadius, 0, 2 * Math.PI)
    ctx.fill()

    // Check if enough area is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparentPixels = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++
    }

    const scratchPercentage = (transparentPixels / (canvas.width * canvas.height)) * 100

    if (scratchPercentage > 30) {
      // Reveal the card
      setCards(prev => prev.map((card, i) =>
        i === index ? { ...card, revealed: true } : card
      ))

      // Hide canvas with animation
      canvas.style.opacity = '0'
      setTimeout(() => {
        canvas.style.display = 'none'
      }, 300)
    }
  }

  

  // Difficulty badges removed in simplified UI

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Gift className="w-12 h-12 text-pink-300" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent">
                Scratch Positions
              </h1>
              <Button
                onClick={refreshCards}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                title="Refresh to load new custom positions"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Unlock your intimate adventure. Scratch to reveal romantic positions and discover new ways to connect.
            </p>
          </div>

          {/* Intro Hero */}
          {!started && (
            <Card variant="elegant" className="bg-black/25 border-pink-500/25 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">
                  Unlock Your Intimate Adventure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-white font-bold mb-2">Discover 6 Cards</h3>
                    <p className="text-white/70 text-sm">Each card hides a unique romantic position</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-white font-bold mb-2">Scratch to Reveal</h3>
                    <p className="text-white/70 text-sm">Use your mouse or finger to scratch and unlock details</p>
                    <p className="text-white/50 text-xs mt-1">💡 Mobile: Use your finger to scratch the silver area</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-white font-bold mb-2">Start Exploring</h3>
                    <p className="text-white/70 text-sm">Reveal surprises and try them together</p>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <Button onClick={() => setStarted(true)} variant="romantic" className="px-10 py-4 text-lg">
                    Start Exploring
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          

          {started && (
            <>
              {/* Scratch Cards Grid (2 per row) */}
              <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 place-items-center`}>
                {cards.slice(0, visibleCount).map((card, index) => (
                  <div key={card.id} className="relative w-full max-w-[340px]">
                    <Card variant="elegant" className="bg-gradient-to-br from-black/60 to-black/80 border-pink-500/30 shadow-2xl rounded-2xl backdrop-blur-sm overflow-hidden">
                      {/* Scratch Canvas Overlay */}
                      {!card.revealed && (
                        <canvas
                          ref={el => {
                            canvasRefs.current[index] = el
                            if (el) {
                              // Initialize canvas when ref is set
                              setTimeout(() => initializeScratchCanvas(el, index), 50)
                            }
                          }}
                          className="absolute inset-0 z-20 cursor-pointer rounded-2xl"
                          onMouseDown={() => setIsScratching(true)}
                          onMouseUp={() => setIsScratching(false)}
                          onMouseMove={(e) => isScratching && handleScratch(e, index)}
                          onMouseLeave={() => setIsScratching(false)}
                          onClick={(e) => handleScratch(e, index)}
                          onTouchStart={(e) => {
                            e.preventDefault()
                            setIsScratching(true)
                            handleScratch(e, index)
                          }}
                          onTouchMove={(e) => {
                            e.preventDefault()
                            if (isScratching) handleScratch(e, index)
                          }}
                          onTouchEnd={(e) => {
                            e.preventDefault()
                            setIsScratching(false)
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            transition: 'opacity 0.3s ease',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            touchAction: 'none'
                          }}
                        />
                      )}

                      {/* Card Content: Only image + title */}
                      <div className="relative z-0">
                        {/* Number badge */}
                        <div className="absolute top-1.5 left-1.5 z-30">
                          <span className="px-1.5 py-0.5 rounded-full bg-white/90 text-black text-xs font-semibold shadow">
                            {index + 1}
                          </span>
                        </div>
                        <div className="w-full aspect-[1/1] bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center'
                            }}
                            
                          />
                        </div>
                        {/* Title overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-1.5">
                          <div className="text-white font-semibold text-sm drop-shadow-sm">
                            {card.title}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Showing count */}
              <div className="text-center text-white/80 mt-4">
                {(() => {
                  const shown = Math.min(cards.length, visibleCount)
                  const total = cards.length
                  return <span>Showing {shown} of {total} positions</span>
                })()}
              </div>

              {/* Show More Button (increments by 4) */}
              {visibleCount < cards.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCount(c => Math.min(c + 4, cards.length))}
                    className="px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                  >
                    <div className="flex items-center gap-3 justify-center">
                      <Eye className="w-6 h-6" />
                      <span>Show More Positions ({Math.max(cards.length - visibleCount, 0)} more)</span>
                    </div>
                  </button>
                </div>
              )}
            </>
          )}
          

          {/* Progress Indicator */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Positions Revealed</span>
                <span className="text-white/60">
                  {cards.filter(card => card.revealed).length} / {cards.length}
                </span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${(cards.filter(card => card.revealed).length / cards.length) * 100}%` }}
                />
              </div>
              {cards.filter(card => card.revealed).length === cards.length && (
                <div className="text-center mt-4">
                  <div className="text-green-300 font-bold">🎉 All Positions Unlocked!</div>
                  <p className="text-green-200/80 text-sm">You've discovered all the intimate positions. Time to explore!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ScratchPosition
