import { useState, useRef, useEffect } from "react"
import { getPositions as apiGetPositions } from "@/lib/positionsApi"
import { getPositionsOptimized, getCachedPositions, clearPositionsCache } from "@/utils/positionsCache"
import { useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Eye, Gift, RefreshCw } from "lucide-react"

const STORAGE_KEY = 'scratch_positions_all'
const REVEALED_KEY = 'scratch_positions_revealed_v1'
const VISIBLE_KEY = 'scratch_positions_visibleCount_v1'
const DAY_MS = 24 * 60 * 60 * 1000

type ScratchCard = {
  id: string
  title: string
  image: string
  description?: string
  category?: string
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  duration?: string
  tags?: string[]
  mediaType?: 'image' | 'gif' | 'video'
  revealed: boolean
  isDefault?: boolean
}

const ScratchPosition = () => {
  const location = useLocation()
  const [cards, setCards] = useState<ScratchCard[]>([])
  const [isScratching, setIsScratching] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)
  const [started, setStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Loading positions...')
  const gridRef = useRef<HTMLDivElement | null>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const isDev = (import.meta as any)?.env?.DEV || (import.meta as any)?.env?.VITE_SHOW_DEBUG === 'true'

  // Restore persisted visible count on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISIBLE_KEY)
      if (raw) {
        const parsed = parseInt(raw, 10)
        if (!Number.isNaN(parsed) && parsed > 0) {
          setVisibleCount(parsed)
        }
      }
    } catch {}
  }, [])

  // Clamp visible count if card list shrinks and persist changes
  useEffect(() => {
    if (cards.length > 0 && visibleCount > cards.length) {
      setVisibleCount(cards.length)
    }
    try {
      localStorage.setItem(VISIBLE_KEY, String(visibleCount))
    } catch {}
  }, [cards.length, visibleCount])

  // Helper to apply positions to UI and re-init canvases
  const applyPositions = (positions: ScratchCard[]) => {
    // Merge with persisted revealed state (24h)
    const now = Date.now()
    let revealMap: Record<string, number> = {}
    try {
      const raw = localStorage.getItem(REVEALED_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>
        if (parsed && typeof parsed === 'object') {
          revealMap = parsed
        }
      }
    } catch {}

    const merged = positions.map(p => {
      const ts = revealMap[p.id]
      const withinDay = typeof ts === 'number' && (now - ts) < DAY_MS
      return { ...p, revealed: withinDay || !!p.revealed }
    })

    setCards(merged)
    canvasRefs.current = canvasRefs.current.slice(0, positions.length)
    setTimeout(() => {
      canvasRefs.current.forEach((canvas, index) => {
        if (canvas) initializeScratchCanvas(canvas, index)
      })
    }, 100)
  }

  // Handle visible count changes - reinitialize canvases for newly visible cards
  useEffect(() => {
    if (cards.length > 0 && visibleCount > 0) {
      // Initialize canvases for newly visible cards
      const startIndex = Math.max(0, visibleCount - 4) // Previous count
      const endIndex = Math.min(visibleCount, cards.length)

      setTimeout(() => {
        for (let i = startIndex; i < endIndex; i++) {
          const canvas = canvasRefs.current[i]
          if (canvas) {
            initializeScratchCanvas(canvas, i)
          }
        }
      }, 100)
    }
  }, [visibleCount, cards.length])

  // Load positions from unified admin system
  const loadPositions = (): ScratchCard[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)

      // Comprehensive empty state detection
      const isEmpty = !raw ||
                      raw.trim() === '' ||
                      raw === 'null' ||
                      raw === 'undefined' ||
                      raw === '[]' ||
                      (raw.trim().startsWith('[') && raw.trim().endsWith(']') && raw.trim().length <= 2)

      if (isEmpty) {
        return []
      }

      try {
        const parsed = JSON.parse(raw)

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(item => ({ ...item, revealed: false }))
        } else {
          return []
        }
      } catch (parseError) {
        return []
      }
    } catch (error) {
      return []
    }
  }

  const refreshCards = () => {
    const positions = loadPositions()
    setCards(positions)

    // Resize canvas refs array to match total positions
    canvasRefs.current = canvasRefs.current.slice(0, positions.length)

    // Reinitialize canvases for all positions
    setTimeout(() => {
      canvasRefs.current.forEach((canvas, index) => {
        if (canvas) {
          initializeScratchCanvas(canvas, index)
        }
      })
    }, 100)
  }

  useEffect(() => {
    // Load positions with instant cache
    const load = async () => {
      try {
        // Check cache first for instant loading
        const cached = getCachedPositions()
        if (cached.length > 0) {
          setLoadingMessage('Loading from cache...')
          applyPositions(cached.map(p => ({...p, revealed: false})))
          setIsLoading(false)
          
          // Refresh in background
          setLoadingMessage('Updating in background...')
          const freshPositions = await getPositionsOptimized()
          if (freshPositions.length > 0) {
            applyPositions(freshPositions.map(p => ({...p, revealed: false})))
          }
          return
        }
        
        // No cache, fetch from API
        setLoadingMessage('Loading from server...')
        const positions = await getPositionsOptimized()
        applyPositions(positions.map(p => ({...p, revealed: false})))
        setIsLoading(false)
      } catch (e) {
        setLoadingMessage('Loading fallback data...')
        // Fallback to localStorage
        const fallback = loadPositions()
        applyPositions(fallback)
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // Production-level sync: on events refresh from API
  useEffect(() => {
    let lastSyncVersion = ''
    let lastUpdateTime = 0

    const refreshFromApi = async (source = 'unknown') => {
      try {
        const positions = await apiGetPositions()
        applyPositions(positions.map(p => ({...p, revealed: false})))
      } catch (e) {
        // API refresh failed, continue with existing data
      }
    }

    // Method 1: Storage events (cross-tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.storageArea === localStorage) {
        refreshFromApi('storage-event')
      }
    }

    // Method 2: Custom events (same-tab)
    const handleCustomUpdate = (e: CustomEvent) => {
      refreshFromApi('custom-event')
    }

    // Method 3: BroadcastChannel API (modern cross-tab)
    let broadcastChannel: BroadcastChannel | null = null
    if (typeof BroadcastChannel !== 'undefined') {
      broadcastChannel = new BroadcastChannel('scratch-positions-sync')
      broadcastChannel.onmessage = (event) => {
        refreshFromApi('broadcast-channel')
      }
    }

    // Method 4: Focus events
    const handleFocus = () => {
      refreshFromApi('focus-event')
    }

    // Method 5: Advanced polling with version checking
    const pollInterval = setInterval(async () => {
      try {
        // Simple API poll every 1s
        await refreshFromApi('api-polling')
        } catch (error) {
          // Silent fail for polling
        }
    }, 5000)

    // Listen for all sync events
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('scratchPositionsUpdated', handleCustomUpdate as EventListener)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('scratchPositionsUpdated', handleCustomUpdate as EventListener)
      window.removeEventListener('focus', handleFocus)
      clearInterval(pollInterval)
      if (broadcastChannel) {
        broadcastChannel.close()
      }
    }
  }, [])

  // Enhanced polling mechanism with aggressive cross-tab sync
  useEffect(() => {
    let lastKnownData = localStorage.getItem(STORAGE_KEY)
    let pollCount = 0

    const pollInterval = setInterval(() => {
      pollCount++
      const currentData = localStorage.getItem(STORAGE_KEY)
      
      // Check for any changes in raw data
      if (currentData !== lastKnownData) {
        lastKnownData = currentData
        
        const positions = loadPositions()
        setCards(positions)

        if (positions.length > 0) {
          canvasRefs.current = canvasRefs.current.slice(0, positions.length)

          setTimeout(() => {
            canvasRefs.current.forEach((canvas, index) => {
              if (canvas) {
                initializeScratchCanvas(canvas, index)
              }
            })
          }, 100)
        }
      }
    }, 2000)

    return () => clearInterval(pollInterval)
  }, [])

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

      // Persist reveal timestamp (24h)
      try {
        const raw = localStorage.getItem(REVEALED_KEY)
        const map = raw ? (JSON.parse(raw) as Record<string, number>) : {}
        const id = cards[index]?.id
        if (id) {
          map[id] = Date.now()
          localStorage.setItem(REVEALED_KEY, JSON.stringify(map))
        }
      } catch {}

      // Hide canvas with animation but keep it visible for a moment
      setTimeout(() => {
        canvas.style.opacity = '0'
        setTimeout(() => {
          canvas.style.display = 'none'
        }, 500)
      }, 1000)
    }
  }

  

  // Difficulty badges removed in simplified UI

  // Show loading screen if still loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-pink-300/20 border-t-pink-300 rounded-full mx-auto mb-4"></div>
              <p className="text-white/70 text-lg">{loadingMessage}</p>
              <div className="mt-4 text-sm text-white/50">
                {getCachedPositions().length > 0 ? '⚡ Loading from cache...' : '🔄 Fetching from server...'}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

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
                {cards.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Positions Available</h3>
                    <p className="text-white/70 mb-2">New positions will appear here soon.</p>
                    <p className="text-white/50 text-sm">Please check back later.</p>
                    {isDev && (
                      <div className="mt-6">
                        <Button
                          onClick={() => window.open('/admin/scratch-positions', '_blank')}
                          variant="outline"
                          className="px-8 py-3"
                        >
                          Open Admin (Dev)
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  cards.slice(0, visibleCount).map((card, index) => (
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
                          {card.mediaType === 'video' ? (
                            <video 
                              src={card.image} 
                              className={`w-full h-full object-cover transition-all duration-500 ${
                                card.revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                              }`}
                              muted
                              loop
                              playsInline
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center'
                              }}
                            />
                          ) : (
                            <img 
                              src={card.image} 
                              alt={card.title}
                              className={`w-full h-full object-cover transition-all duration-500 ${
                                card.revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                              }`}
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center'
                              }}
                            />
                          )}
                        </div>
                        {/* Title overlay at bottom */}
                        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-1.5 transition-all duration-500 ${
                          card.revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}>
                          <div className="text-white font-semibold text-sm drop-shadow-sm">
                            {card.title}
                          </div>
                          {card.revealed && card.difficulty && (
                            <div className="text-white/80 text-xs mt-1">
                              {card.difficulty} • {card.category || 'Romantic'}
                            </div>
                          )}
                        </div>
                        
                        {/* Media type indicator */}
                        {card.revealed && card.mediaType && (
                          <div className="absolute top-1.5 right-1.5 z-30">
                            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              card.mediaType === 'video' ? 'bg-blue-500 text-white' :
                              card.mediaType === 'gif' ? 'bg-purple-500 text-white' :
                              'bg-green-500 text-white'
                            }`}>
                              {card.mediaType.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                  ))
                )}
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
                    onClick={() => {
                      const newCount = Math.min(visibleCount + 4, cards.length)
                      setVisibleCount(newCount)
                    }}
                    className="px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                  >
                    <div className="flex items-center gap-3 justify-center">
                      <Eye className="w-6 h-6" />
                      <span>Show More Positions ({Math.max(cards.length - visibleCount, 0)} more)</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Show message when all positions are visible */}
              {visibleCount >= cards.length && cards.length > 0 && (
                <div className="text-center mt-8">
                  <div className="text-white/60 text-sm">
                    All {cards.length} positions are now visible
                  </div>
                </div>
              )}

              {/* Quick Refresh Button (Dev only) */}
              {isDev && (
                <div className="text-center mt-8">
                    <Button
                      onClick={() => {
                        const positions = loadPositions()
                        setCards(positions)
                        
                        // Force re-render
                        setTimeout(() => {
                          window.location.reload()
                        }, 100)
                      }}
                    variant="outline"
                    className="px-6 py-3 bg-purple-500/20 border-purple-500/30 text-white hover:bg-purple-500/30"
                  >
                    🔄 Refresh from Admin
                  </Button>
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

          {/* Debug Section (Dev only) */}
          {isDev && (
            <Card variant="elegant" className="bg-red-900/20 border-red-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-white font-bold">🐛 Debug Tools</h3>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button
                      onClick={() => {
                        // Check all possible storage keys
                        const keys = Object.keys(localStorage)
                        const rawData = localStorage.getItem(STORAGE_KEY)
                        const scratchKeys = keys.filter(key => key.includes('scratch'))
                        
                        alert(`Storage Key: ${STORAGE_KEY}\nData: ${rawData}\nAll Keys: ${keys.length}\nScratch Keys: ${scratchKeys.join(', ')}`)
                      }}
                      variant="outline"
                      className="px-4 py-2 bg-red-500/20 border-red-500/30 text-white hover:bg-red-500/30"
                    >
                      🔍 Check Storage
                    </Button>
                    
                    <Button
                      onClick={() => {
                        // Clear all related storage
                        localStorage.removeItem(STORAGE_KEY)
                        localStorage.removeItem('scratch_admin_initialized')
                        
                        // Force clear any cached data
                        localStorage.clear()
                        
                        // Reset state
                        setCards([])
                        
                        // Force page reload to ensure clean state
                        window.location.reload()
                      }}
                      variant="outline"
                      className="px-4 py-2 bg-red-600/20 border-red-600/30 text-white hover:bg-red-600/30"
                    >
                      🗑️ Force Clear & Reload
                    </Button>
                    
                    <Button
                      onClick={() => {
                        const positions = loadPositions()
                        setCards(positions)
                      }}
                      variant="outline"
                      className="px-4 py-2 bg-blue-500/20 border-blue-500/30 text-white hover:bg-blue-500/30"
                    >
                      🔄 Force Refresh
                    </Button>
                    
                    <Button
                      onClick={() => {
                        clearPositionsCache()
                        const positions = loadPositions()
                        setCards(positions)
                        alert('Cache cleared! Next load will fetch fresh data.')
                      }}
                      variant="outline"
                      className="px-4 py-2 bg-orange-500/20 border-orange-500/30 text-white hover:bg-orange-500/30"
                    >
                      🗑️ Clear Cache
                    </Button>
                  </div>
                  <div className="text-xs text-white/60">
                    Current State: {cards.length} positions | Storage Key: {STORAGE_KEY}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default ScratchPosition

