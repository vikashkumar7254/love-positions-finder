import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Gamepad2, Heart, Dice1, Flame, MessageCircle, MapPin } from "lucide-react"
import Navigation from "@/components/Navigation"
import { games } from "@/data/games"

const Games = () => {
  const gameIcons = {
    '🎭': MessageCircle,
    '🎲': Dice1,
    '🎯': Gamepad2,
    '💌': Heart,
    '💝': Heart
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gamepad2 className="w-12 h-12 text-romantic" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Intimate Games
              </h1>
              <Flame className="w-12 h-12 text-passionate" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover exciting games designed to deepen your connection and add playful intimacy to your relationship
            </p>
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Adventure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => {
                const IconComponent = gameIcons[game.icon as keyof typeof gameIcons] || Gamepad2
                // Handle special routing cases
                const gameRoute = game.id === 'random-generator' 
                  ? '/positions/random-generator' 
                  : `/games/${game.id}`
                
                return (
                  <Card key={game.id} variant="elegant" className="hover-romantic group cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center group-hover:bg-romantic/30 transition-colors">
                          <IconComponent className="w-8 h-8 text-romantic" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-romantic">{game.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-muted-foreground">{game.description}</p>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>⏱️ {game.duration}</span>
                        <span>👫 {game.playerCount} players</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">
                          {game.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">
                          {game.category}
                        </span>
                      </div>
                      
                      <Link to={gameRoute}>
                        <Button variant="romantic" className="w-full" data-testid={`button-play-${game.id}`}>
                          <Gamepad2 className="w-4 h-4" />
                          Play Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-12 px-6 bg-gradient-card">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-8">Quick Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/games/truth-or-dare">
                <Button variant="passionate" size="lg" className="w-full" data-testid="button-quick-truth-or-dare">
                  <MessageCircle className="w-5 h-5" />
                  Truth or Dare
                </Button>
              </Link>
              <Link to="/games/foreplay-dice">
                <Button variant="passionate" size="lg" className="w-full" data-testid="button-quick-foreplay-dice">
                  <Dice1 className="w-5 h-5" />
                  Foreplay Dice
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Games