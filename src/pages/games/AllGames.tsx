import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Gamepad2, Heart, Dice1, MessageCircle, MapPin, ArrowLeft, Star, Clock, Users } from "lucide-react"
import Navigation from "@/components/Navigation"
import { games } from "@/data/games"

const AllGames = () => {
  const gameDetails = {
    'truth-or-dare': {
      route: '/games/truth-or-dare',
      featured: true,
      description: 'Explore deep questions and exciting challenges that bring you closer together'
    },
    'foreplay-dice': {
      route: '/games/foreplay-dice',
      featured: true,
      description: 'Let chance guide your intimate moments with playful dice rolls'
    },
    'random-generator': {
      route: '/positions/random-generator',
      featured: true,
      description: 'Discover new positions with our random position generator'
    },
    'long-distance': {
      route: '/games/long-distance',
      featured: false,
      description: 'Special activities designed for couples separated by distance'
    },
    'love-quiz': {
      route: '/games/love-quiz',
      featured: false,
      description: 'Learn about your love languages and communication styles'
    }
  }

  const gameIcons = {
    '🎭': MessageCircle,
    '🎲': Dice1,
    '🎯': Gamepad2,
    '💌': MapPin,
    '💝': Heart
  }

  const featuredGames = games.filter(game => gameDetails[game.id as keyof typeof gameDetails]?.featured)
  const otherGames = games.filter(game => !gameDetails[game.id as keyof typeof gameDetails]?.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gamepad2 className="w-12 h-12 text-romantic" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                All Sexy Games
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete collection of intimate games designed to enhance your relationship and add excitement to your romantic life
            </p>
          </div>

          {/* Featured Games */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Games</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map((game) => {
                const IconComponent = gameIcons[game.icon as keyof typeof gameIcons] || Gamepad2
                const details = gameDetails[game.id as keyof typeof gameDetails]
                
                return (
                  <Card key={game.id} variant="romantic" className="hover-romantic group cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center group-hover:bg-romantic/30 transition-colors">
                          <IconComponent className="w-8 h-8 text-romantic" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-romantic">{game.name}</CardTitle>
                      <div className="flex justify-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-muted-foreground">{details?.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{game.duration}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{game.playerCount} players</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">
                          {game.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">
                          {game.category}
                        </span>
                      </div>
                      
                      <Link to={details?.route || '#'}>
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
          </section>

          {/* All Games */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Games</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => {
                const IconComponent = gameIcons[game.icon as keyof typeof gameIcons] || Gamepad2
                const details = gameDetails[game.id as keyof typeof gameDetails]
                
                return (
                  <Card key={game.id} variant="elegant" className="hover-romantic group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-romantic/20 rounded-lg flex items-center justify-center group-hover:bg-romantic/30 transition-colors flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-romantic" />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-romantic">{game.name}</h3>
                            {details?.featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-3">{game.description}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {game.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {game.playerCount} players
                            </span>
                            <span className="px-2 py-1 bg-romantic/10 text-romantic rounded">
                              {game.difficulty}
                            </span>
                          </div>
                          
                          <Link to={details?.route || '#'}>
                            <Button variant="outline" size="sm" data-testid={`button-play-${game.id}-list`}>
                              <Gamepad2 className="w-3 h-3" />
                              Play
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Categories */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Game Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Communication', 'Foreplay', 'Positions', 'Connection', 'Understanding'].map((category) => (
                <Card key={category} variant="elegant" className="text-center p-4 hover-tender cursor-pointer">
                  <h4 className="font-semibold text-romantic mb-2">{category}</h4>
                  <p className="text-xs text-muted-foreground">
                    {games.filter(game => game.category === category).length} games
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AllGames