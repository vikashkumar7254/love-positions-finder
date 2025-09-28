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
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null)
  const [revealed, setRevealed] = useState<Record<string | number, boolean>>(() => {
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
    setRevealed(prev => ({ ...prev, [id]: true }))
    setExpandedCard(null) // Close expanded view after revealing
  }

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

        {/* Expanded scratch card modal */}
        {expandedCard && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-auto">
              {(() => {
                const card = items.find(item => item.id === expandedCard)
                if (!card) return null

                return (
                  <div>
                    <div className="relative">
                      {card.mediaUrl ? (
                        <img
                          src={card.mediaUrl}
                          alt={card.title}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-romantic flex items-center justify-center">
                          <Heart className="w-16 h-16 text-white" />
                        </div>
                      )}
                      <button
                        onClick={() => setExpandedCard(null)}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-gray-600 mb-4">{card.description}</p>
                      <button
                        onClick={() => handleScratch(card.id)}
                        className="w-full bg-gradient-romantic text-white py-3 rounded-lg font-medium"
                      >
                        Reveal Position
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ScratchCards