import { Card, CardContent } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, Lock, Sparkles } from "lucide-react"
import scratchCardBg from "@/assets/scratch-card.jpg"
import { Link } from "react-router-dom"
import { useMemo, useState, useCallback } from "react"
import type React from "react"

type ScratchItem = {
  id: string | number
  title: string
  description: string
  mediaUrl?: string | null
  revealed?: boolean
}

interface ScratchCardsProps {
  items?: ScratchItem[]
  heading?: string
  subheading?: string
}

const ScratchCards = ({ items = [], heading, subheading }: ScratchCardsProps) => {
  const [revealed, setRevealed] = useState<Record<string | number, boolean>>(() => {
    const initial: Record<string | number, boolean> = {}
    items.forEach((it, i) => (initial[it.id] = !!it.revealed || i < 2))
    return initial
  })

  // Track 4x4 tile clearing per card for hover-scratch effect
  const [tileCleared, setTileCleared] = useState<Record<string | number, boolean[]>>(() => {
    const initial: Record<string | number, boolean[]> = {}
    items.forEach((it) => (initial[it.id] = new Array(16).fill(false)))
    return initial
  })

  // When items change, ensure we have state for new IDs
  const ensureStateFor = useCallback((id: string | number) => {
    setTileCleared((prev) => {
      if (prev[id]) return prev
      return { ...prev, [id]: new Array(16).fill(false) }
    })
  }, [])

  const anyMedia = useMemo(() => items.some(i => i.mediaUrl), [items])

  const handleScratch = (id: string | number) => {
    setRevealed(prev => ({ ...prev, [id]: true }))
  }

  const handleHoverScratch = useCallback((id: string | number, e: React.MouseEvent<HTMLDivElement>) => {
    if (revealed[id]) return
    ensureStateFor(id)
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cols = 4
    const rows = 4
    const col = Math.min(cols - 1, Math.max(0, Math.floor((x / rect.width) * cols)))
    const row = Math.min(rows - 1, Math.max(0, Math.floor((y / rect.height) * rows)))
    const idx = row * cols + col
    setTileCleared((prev) => {
      const current = prev[id] || new Array(16).fill(false)
      if (current[idx]) return prev
      const next = { ...prev, [id]: [...current] }
      next[id][idx] = true
      return next
    })
    // Auto-reveal after threshold of cleared tiles
    setTileCleared((prev) => {
      const current = prev[id] || []
      const cleared = current.filter(Boolean).length
      if (cleared >= 6) {
        setRevealed((r) => (r[id] ? r : { ...r, [id]: true }))
      }
      return prev
    })
  }, [ensureStateFor, revealed])

  const handleTouchScratch = useCallback((id: string | number, e: React.TouchEvent<HTMLDivElement>) => {
    if (revealed[id]) return
    ensureStateFor(id)
    
    // Handle both touchstart and touchmove
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const touch = e.touches[0] || e.changedTouches[0]
    
    // Ensure touch coordinates are within the element
    const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left))
    const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top))
    
    const cols = 4
    const rows = 4
    const col = Math.min(cols - 1, Math.max(0, Math.floor((x / rect.width) * cols)))
    const row = Math.min(rows - 1, Math.max(0, Math.floor((y / rect.height) * rows)))
    const idx = row * cols + col
    
    // Clear the tile
    if (idx >= 0 && idx < 16) {
      setTileCleared((prev) => {
        const current = prev[id] || new Array(16).fill(false)
        if (current[idx]) return prev // Already cleared
        const next = { ...prev, [id]: [...current] }
        next[id][idx] = true
        return next
      })
    }
    
    // Check if enough tiles are cleared to reveal
    setTileCleared((prev) => {
      const current = prev[id] || []
      const cleared = current.filter(Boolean).length
      if (cleared >= 3) { // Even lower threshold for mobile
        setRevealed((r) => (r[id] ? r : { ...r, [id]: true }))
      }
      return prev
    })
  }, [ensureStateFor, revealed])

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
          {/* Mobile instructions */}
          <p className="text-sm text-muted-foreground mt-4 md:hidden">
            💡 Use your finger to scratch and reveal cards
          </p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${anyMedia ? 'auto-rows-[1fr]' : ''}`}>
          {items.map((card, index) => (
            <Card 
              key={card.id} 
              variant="elegant" 
              className="group cursor-pointer hover-romantic animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.06}s` }}
              onClick={() => handleScratch(card.id)}
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
                      className="h-full bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${scratchCardBg})` }}
                      onMouseMove={(e) => handleHoverScratch(card.id, e)}
                      onMouseEnter={(e) => handleHoverScratch(card.id, e)}
                      onTouchMove={(e) => handleTouchScratch(card.id, e)}
                      onTouchStart={(e) => handleTouchScratch(card.id, e)}
                    >
                      {/* Base lock/message content under tiles */}
                      <div className="absolute inset-0 bg-romantic/20 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-white">
                          <Lock className="w-12 h-12 mx-auto mb-4 animate-float" />
                          <p className="font-medium text-lg">Scratch to Reveal</p>
                          <p className="text-sm text-white/80 mt-2">Love Position</p>
                        </div>
                      </div>

                      {/* 4x4 scratch tiles overlay */}
                      <div className="absolute inset-0">
                        {Array.from({ length: 16 }).map((_, i) => {
                          const row = Math.floor(i / 4)
                          const col = i % 4
                          const cleared = tileCleared[card.id]?.[i]
                          return (
                            <div
                              key={i}
                              className="absolute transition-opacity duration-200"
                              style={{
                                top: `${(row * 100) / 4}%`,
                                left: `${(col * 100) / 4}%`,
                                width: `${100 / 4}%`,
                                height: `${100 / 4}%`,
                                backgroundImage: `url(${scratchCardBg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: cleared ? 0 : 1,
                              }}
                            />
                          )
                        })}
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
      </div>
    </section>
  )
}

export default ScratchCards