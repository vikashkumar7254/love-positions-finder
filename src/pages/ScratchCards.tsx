import { useState, useRef, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { ArrowLeft, RefreshCw, Star, Clock, Sparkles, Gift, Eye } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { getRandomPositions } from "@/data/positions"
import type { Position } from "@/types"

interface ScratchCard {
  id: number
  position: Position | null
  isScratched: boolean
  scratchProgress: number
}

const ScratchCards = () => {
  const [cards, setCards] = useState<ScratchCard[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [scratchedCount, setScratchedCount] = useState(0)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const [isDrawing, setIsDrawing] = useState<boolean[]>([false, false, false, false, false, false])
  const STORAGE_KEY = 'scratchCardsStateV1'

  function saveState(nextCards: ScratchCard[], nextScratchedCount: number) {
    try {
      const payload = {
        cards: nextCards,
        scratchedCount: nextScratchedCount,
        savedAt: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {}
  }

  // Initialize cards (restore from localStorage if available)
  useEffect(() => {
    if (!isInitialized) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as { cards: ScratchCard[]; scratchedCount: number }
          if (Array.isArray(parsed?.cards)) {
            setCards(parsed.cards)
            setScratchedCount(typeof parsed.scratchedCount === 'number' ? parsed.scratchedCount : 0)
            setIsInitialized(true)
            return
          }
        }
      } catch {}

      const randomPositions = getRandomPositions(6)
      const initialCards: ScratchCard[] = Array.from({ length: 6 }, (_, index) => ({
        id: index,
        position: randomPositions[index] || null,
        isScratched: false,
        scratchProgress: 0
      }))
      setCards(initialCards)
      setScratchedCount(0)
      saveState(initialCards, 0)
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Initialize canvas scratch surface
  useEffect(() => {
    if (cards.length > 0) {
      cards.forEach((_, index) => {
        const canvas = canvasRefs.current[index]
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            canvas.width = 300
            canvas.height = 200
            
            // Create scratch surface with gradient
            const gradient = ctx.createLinearGradient(0, 0, 300, 200)
            gradient.addColorStop(0, '#e91e63')
            gradient.addColorStop(0.5, '#9c27b0')
            gradient.addColorStop(1, '#673ab7')
            
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, 300, 200)
            
            // Add scratch instruction text
            ctx.fillStyle = 'white'
            ctx.font = 'bold 16px Arial'
            ctx.textAlign = 'center'
            ctx.fillText('Scratch to Reveal', 150, 90)
            ctx.fillText('💫', 150, 120)
          }
        }
      })
    }
  }, [cards])

  const handleScratch = (index: number, clientX: number, clientY: number) => {
    const canvas = canvasRefs.current[index]
    if (!canvas || cards[index].isScratched) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Scale coordinates to canvas size
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x * scaleX, y * scaleY, 20, 0, 2 * Math.PI)
    ctx.fill()

    // Calculate scratch progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    
    const scratchPercent = (transparent / (canvas.width * canvas.height)) * 100
    
    // Update card scratch progress
    setCards(prev => {
      const next = prev.map((card, i) => i === index ? { ...card, scratchProgress: scratchPercent } : card)
      saveState(next, scratchedCount)
      return next
    })

    // Mark as scratched if enough is revealed
    if (scratchPercent > 30 && !cards[index].isScratched) {
      setCards(prev => {
        const next = prev.map((card, i) => i === index ? { ...card, isScratched: true } : card)
        const nextCount = scratchedCount + 1
        saveState(next, nextCount)
        return next
      })
      setScratchedCount(prev => prev + 1)
    }
  }

  const handlePointerDown = (index: number, event: React.PointerEvent<HTMLCanvasElement>) => {
    // Only block scroll while actually scratching
    setIsDrawing(prev => prev.map((drawing, i) => i === index ? true : drawing))
    handleScratch(index, event.clientX, event.clientY)
  }

  const handlePointerMove = (index: number, event: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing[index]) {
      // While drawing, we prevent default to avoid page scroll
      event.preventDefault()
      handleScratch(index, event.clientX, event.clientY)
    }
  }

  const handlePointerUp = (index: number, event: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(prev => prev.map((drawing, i) => i === index ? false : drawing))
  }

  const resetCards = () => {
    const randomPositions = getRandomPositions(6)
    const newCards: ScratchCard[] = Array.from({ length: 6 }, (_, index) => ({
      id: index,
      position: randomPositions[index] || null,
      isScratched: false,
      scratchProgress: 0
    }))
    setCards(newCards)
    setScratchedCount(0)
    saveState(newCards, 0)
    
    // Reset canvas surfaces
    setTimeout(() => {
      cards.forEach((_, index) => {
        const canvas = canvasRefs.current[index]
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.globalCompositeOperation = 'source-over'
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            const gradient = ctx.createLinearGradient(0, 0, 300, 200)
            gradient.addColorStop(0, '#e91e63')
            gradient.addColorStop(0.5, '#9c27b0')
            gradient.addColorStop(1, '#673ab7')
            
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, 300, 200)
            
            ctx.fillStyle = 'white'
            ctx.font = 'bold 16px Arial'
            ctx.textAlign = 'center'
            ctx.fillText('Scratch to Reveal', 150, 90)
            ctx.fillText('💫', 150, 120)
          }
        }
      })
    }, 100)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600'
      case 'intermediate': return 'text-yellow-600'
      case 'advanced': return 'text-orange-600'
      case 'expert': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStyleIcon = (style: string) => {
    switch (style) {
      case 'romantic': return '💕'
      case 'passionate': return '🔥'
      case 'adventurous': return '🌟'
      case 'mixed': return '🎭'
      default: return '💫'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Helmet>
        <title>Scratch Cards | Reveal 6 Surprise Positions</title>
        <meta name="description" content="Scratch to reveal 6 surprise intimate positions with instructions and tips. Mobile-friendly canvas with progress tracking." />
        <link rel="canonical" href={`${window.location.origin}/games/scratch-position`} />
        <meta property="og:title" content="Scratch Cards | Reveal 6 Surprise Positions" />
        <meta property="og:description" content="Scratch to reveal 6 surprise intimate positions with instructions and tips." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/games/scratch-position`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Game',
          name: 'Scratch Position Cards',
          description: 'Scratch to reveal surprise intimate positions.',
          url: `${window.location.origin}/games/scratch-position`,
          applicationCategory: 'GameApplication',
          operatingSystem: 'Web'
        })}</script>
      </Helmet>
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Scratch Cards
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scratch off the silver coating to reveal 6 surprise intimate positions. Each card contains a unique position with detailed instructions and benefits.
            </p>
          </div>

          {/* Progress */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-card rounded-full">
              <Sparkles className="w-5 h-5 text-romantic" />
              <span className="font-medium">
                {scratchedCount}/6 Cards Revealed
              </span>
              {scratchedCount === 6 && (
                <span className="text-romantic font-bold">🎉 All Revealed!</span>
              )}
            </div>
          </div>

          {/* Reset Button */}
          <div className="text-center mb-8">
            <Button 
              variant="romantic" 
              onClick={resetCards}
              className="gap-2"
              data-testid="button-reset-cards"
            >
              <RefreshCw className="w-4 h-4" />
              New Cards
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <Card key={card.id} variant="elegant" className="overflow-hidden">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Card #{index + 1}</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="relative w-full h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20">
                    {/* Revealed Position */}
                    {card.position && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <div className="text-3xl mb-2">{getStyleIcon(card.position.style)}</div>
                        <h3 className="font-bold text-lg mb-2 text-romantic">{card.position.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {card.position.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className={`font-medium ${getDifficultyColor(card.position.difficulty)}`}>
                            {card.position.difficulty}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            {card.position.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {card.position.duration}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {card.position.category}
                        </div>
                      </div>
                    )}
                    
                    {/* Scratch Canvas */}
                    <canvas
                      ref={el => canvasRefs.current[index] = el}
                      className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity ${
                        card.isScratched ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ touchAction: card.isScratched ? 'auto' : 'pan-y', pointerEvents: card.isScratched ? 'none' : 'auto' }}
                      // Pointer Events only (unified)
                      onPointerDown={(e) => handlePointerDown(index, e)}
                      onPointerMove={(e) => handlePointerMove(index, e)}
                      onPointerUp={(e) => handlePointerUp(index, e)}
                      onPointerLeave={(e) => handlePointerUp(index, e)}
                      onPointerCancel={(e) => handlePointerUp(index, e)}
                      data-testid={`scratch-card-${index}`}
                    />
                  </div>
                  
                  {/* Scratch Progress */}
                  {!card.isScratched && card.scratchProgress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Scratch Progress</span>
                        <span>{Math.round(card.scratchProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-romantic h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(card.scratchProgress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Revealed State */}
                  {card.isScratched && card.position && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Revealed!</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Completion Message */}
          {scratchedCount === 6 && (
            <div className="mt-12 text-center">
              <Card variant="romantic" className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-romantic mb-4">
                    Congratulations!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    You've revealed all 6 positions! Each card contains detailed instructions and benefits to explore with your partner.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="romantic" 
                      onClick={resetCards}
                      data-testid="button-play-again"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Play Again
                    </Button>
                    <Link to="/journey-planner">
                      <Button variant="outline" data-testid="button-journey-planner">
                        Create Journey
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card variant="elegant">
              <CardHeader>
                <CardTitle className="text-center">How to Play</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl mb-2">1️⃣</div>
                    <h4 className="font-semibold mb-2">Scratch</h4>
                    <p className="text-sm text-muted-foreground">
                      Use your mouse to scratch off the silver coating on each card
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">2️⃣</div>
                    <h4 className="font-semibold mb-2">Reveal</h4>
                    <p className="text-sm text-muted-foreground">
                      Discover the hidden intimate position with detailed information
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">3️⃣</div>
                    <h4 className="font-semibold mb-2">Explore</h4>
                    <p className="text-sm text-muted-foreground">
                      Try the positions with your partner or create a custom journey
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ScratchCards