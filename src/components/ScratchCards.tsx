import { Card, CardContent } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, Lock, Sparkles } from "lucide-react"
import scratchCardBg from "@/assets/scratch-card.jpg"

const ScratchCards = () => {
  const cards = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    isScratched: i < 2, // First 2 cards are revealed for demo
    position: `Romantic Position ${i + 1}`,
    description: "A tender and passionate embrace that brings you closer together"
  }))

  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-passionate bg-clip-text text-transparent">
            Unlock Your Love Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover 6 exciting intimate position cards. Each card reveals a unique romantic experience.
          </p>
          <div className="flex items-center justify-center gap-2 text-romantic">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Scratch to reveal your romantic surprises</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card, index) => (
            <Card 
              key={card.id} 
              variant="elegant" 
              className="group cursor-pointer hover-romantic animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {card.isScratched ? (
                    <div className="h-full bg-gradient-romantic flex items-center justify-center p-6">
                      <div className="text-center text-white">
                        <Heart className="w-12 h-12 mx-auto mb-4 animate-heart-pulse" />
                        <h3 className="font-bold text-lg mb-2">{card.position}</h3>
                        <p className="text-sm text-white/90">{card.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="h-full bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${scratchCardBg})` }}
                    >
                      <div className="absolute inset-0 bg-romantic/20 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Lock className="w-12 h-12 mx-auto mb-4 animate-float" />
                          <p className="font-medium text-lg">Scratch to Reveal</p>
                          <p className="text-sm text-white/80 mt-2">Love Position #{card.id}</p>
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
          <Button variant="hero" size="xl" className="min-w-[250px]">
            <Sparkles className="w-5 h-5" />
            Start Exploring
          </Button>
          <div className="mt-6">
            <Button variant="tender" size="lg">
              <Heart className="w-4 h-4" />
              View All Positions
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScratchCards