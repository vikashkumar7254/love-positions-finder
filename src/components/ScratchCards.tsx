import { Card, CardContent } from '@/components/ui/enhanced-card'
import { Button } from '@/components/ui/enhanced-button'
import { Heart, Lock, Sparkles } from 'lucide-react'
import scratchCardBg from '@/assets/scratch-card.jpg'
import { Link } from 'react-router-dom'
import { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import type React from 'react'

type ScratchItem = {
  id: string | number
  title: string
  description: string
  mediaUrl?: string | null
  revealed?: boolean
}

interface ScratchCardModalProps {
  item: ScratchItem
  onClose: () => void
  onReveal: (id: string | number) => void
}

const ScratchCardModal = ({ item, onClose, onReveal }: ScratchCardModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratched, setIsScratched] = useState(false)
  const [scratchProgress, setScratchProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with proper scaling
    const setCanvasSize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create scratch overlay
    ctx.fillStyle = '#C0C0C0'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Add scratch texture/pattern
    ctx.fillStyle = '#A0A0A0'
    for (let i = 0; i < 50; i++) {
      ctx.fillRect(
        Math.random() * canvas.offsetWidth,
        Math.random() * canvas.offsetHeight,
        2, 2
      )
    }

    // Add text
    ctx.fillStyle = '#808080'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(
      'Scratch to Reveal',
      canvas.offsetWidth / 2,
      canvas.offsetHeight / 2 - 10
    )
    ctx.font = '14px Arial'
    ctx.fillText(
      'Use mouse or finger',
      canvas.offsetWidth / 2,
      canvas.offsetHeight / 2 + 15
    )

    let isDrawing = false
    let lastScratchedPixels = 0

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      return {
        x: (clientX - rect.left) * window.devicePixelRatio,
        y: (clientY - rect.top) * window.devicePixelRatio
      }
    }

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return

      const { x, y } = getMousePos(e)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 2)
      ctx.fill()

      // Calculate scratch progress
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      let scratchedPixels = 0

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) scratchedPixels++
      }

      const totalPixels = canvas.width * canvas.height
      const progress = (scratchedPixels / totalPixels) * 100
      setScratchProgress(progress)

      if (progress > 30 && !isScratched) {
        setIsScratched(true)
        onReveal(item.id)
        // Keep modal open after reveal; user can close manually
      }
    }

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true
      scratch(e)
    }

    const stopDrawing = () => {
      isDrawing = false
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', scratch)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseleave', stopDrawing)

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault()
      startDrawing(e)
    })
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault()
      scratch(e)
    })
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault()
      stopDrawing()
    })

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', scratch)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mouseleave', stopDrawing)
      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchmove', scratch)
      canvas.removeEventListener('touchend', stopDrawing)
    }
  }, [item.id, isScratched, onReveal, onClose])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="relative">
          {/* Background image/content */}
          {item.mediaUrl ? (
            <img
              src={item.mediaUrl}
              alt={item.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-romantic flex items-center justify-center rounded-t-lg">
              <Heart className="w-16 h-16 text-white" />
            </div>
          )}

          {/* Scratch overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-64 cursor-pointer rounded-t-lg"
            style={{ touchAction: 'none' }}
          />

          {/* Progress indicator */}
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            Scratch: {Math.round(scratchProgress)}%
          </div>

          {/* Scratch hint */}
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <div className="bg-black/30 text-white px-3 py-1 rounded text-sm">
              {scratchProgress < 10 ? 'Keep scratching! 🎯' :
               scratchProgress < 30 ? 'Almost there! ✨' :
               scratchProgress > 30 ? 'Revealed! 🎉' : 'Scratch to reveal! 💫'}
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <p className="text-sm text-gray-500">
            Scratch to reveal the position
          </p>
        </div>
      </div>
    </div>
  )
}

interface ScratchCardsProps {
  items?: ScratchItem[]
  heading?: string
  subheading?: string
}

const ScratchCards = ({ items = [], heading, subheading }: ScratchCardsProps) => {
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null)
  const STORAGE_KEY = 'scratch_component_revealed_v1'
  const [revealed, setRevealed] = useState<Record<string | number, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { map: Record<string, boolean>; savedAt: number }
        // 24-hour expiry
        if (parsed && typeof parsed.savedAt === 'number' && Date.now() - parsed.savedAt < 24 * 60 * 60 * 1000) {
          return parsed.map as Record<string | number, boolean>
        }
      }
    } catch {}
    const initial: Record<string | number, boolean> = {}
    items.forEach((it, i) => (initial[it.id] = !!it.revealed || i < 2))
    return initial
  })

  const handleCardClick = (id: string | number) => {
    if (!revealed[id]) {
      setExpandedCard(id)
    }
  }

  const handleScratch = (id: string | number) => {
    setRevealed(prev => {
      const next = { ...prev, [id]: true }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ map: next, savedAt: Date.now() }))
      } catch {}
      return next
    })
    // Do not auto-close; let user view the revealed content and close manually
  }

  // Keep localStorage in sync if items change but preserve existing reveals
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ map: revealed, savedAt: Date.now() }))
    } catch {}
  }, [revealed])

  const anyMedia = useMemo(() => items.some(i => i.mediaUrl), [items])

  const handleHoverScratch = useCallback((id: string | number, e: React.MouseEvent<HTMLDivElement>) => {
    // Simplified - just reveal on hover for desktop
    if (!revealed[id]) {
      setRevealed(prev => ({ ...prev, [id]: true }))
    }
  }, [revealed])

  const renderMedia = (mediaUrl?: string | null) => {
    if (!mediaUrl) return null
    const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl)
    if (isVideo) {
      return (
        <video className="w-full h-full object-cover" src={mediaUrl} autoPlay loop muted playsInline />
      )
    }
    return <img src={mediaUrl} alt="position" className="w-full h-full object-cover" />
  }

  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-passionate bg-clip-text text-transparent">
            {heading || "Unlock Your Love Adventure"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {subheading || `Discover ${items.length} exciting intimate position cards. Each card reveals a unique romantic experience.`}
          </p>
          <div className="flex items-center justify-center gap-2 text-romantic">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Scratch to reveal your romantic surprises</span>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${anyMedia ? 'auto-rows-[1fr]' : ''}`}>
          {items.map((card, index) => (
            <Card
              key={card.id}
              variant="elegant"
              className="group cursor-pointer hover-romantic animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.06}s` }}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {revealed[card.id] ? (
                    <div className="h-full bg-gradient-romantic flex items-center justify-center p-0">
                      <div className="absolute inset-0">
                        {renderMedia(card.mediaUrl)}
                        <div className="absolute inset-0 bg-black/30" />
                      </div>
                      <div className="relative z-10 text-center text-white p-6">
                        <Heart className="w-12 h-12 mx-auto mb-4 animate-heart-pulse" />
                        <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                        <p className="text-sm text-white/90">{card.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-full bg-cover bg-center relative cursor-pointer"
                      style={{ backgroundImage: `url(${scratchCardBg})` }}
                      onClick={() => handleCardClick(card.id)}
                      onMouseEnter={(e) => handleHoverScratch(card.id, e)}
                    >
                      {/* Simple overlay - tap to reveal */}
                      <div className="absolute inset-0 bg-gradient-to-br from-romantic/40 to-passionate/40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Lock className="w-12 h-12 mx-auto mb-3 animate-float" />
                          <p className="font-bold text-lg">Tap to Reveal</p>
                          <p className="text-sm text-white/90">Touch or click</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/games/scratch-position?start=1#start">
            <Button variant="tender" size="lg">
              <Heart className="w-4 h-4" />
              View All Positions
            </Button>
          </Link>
        </div>

        {/* Scratch card modal with actual scratch functionality */}
        {expandedCard && (
          <ScratchCardModal
            item={items.find(item => item.id === expandedCard)!}
            onClose={() => setExpandedCard(null)}
            onReveal={handleScratch}
          />
        )}
      </div>
    </section>
  )
}

export default ScratchCards