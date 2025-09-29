import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Gamepad2, Heart, Dice1, Dice6, MessageCircle, Clock, Users, Sparkles, Mic, Map, Palette, Shuffle } from "lucide-react"
import { games } from "@/data/games"

const AllGames = () => {
  const gameDetails = {
    'passion-dice': {
      route: '/games/passion-dice',
      featured: true,
      description: 'Roll the dice for random intimate actions and discover new ways to pleasure each other'
    },
    'erotic-massage': {
      route: '/games/erotic-massage',
      featured: true,
      description: 'Master the art of sensual touch. Learn tantalizing techniques to find secret pleasure spots and build waves of sensation that will drive your partner wild.'
    },
    'fantasy-roleplay': {
      route: '/games/fantasy-roleplay',
      featured: true,
      description: 'Live out your wildest fantasies! From seductive strangers to forbidden encounters, discover scenarios that will unleash your passionate alter egos.'
    },
    'seductive-conversation': {
      route: '/games/seductive-conversation',
      featured: true,
      description: 'Ignite desire through words. These provocative questions explore your deepest fantasies, boundaries, and desires while building intense anticipation.'
    },
    'pleasure-map': {
      route: '/games/pleasure-map',
      featured: true,
      description: 'Embark on a journey of sensual discovery. Map out every sensitive spot and learn expert techniques to create waves of intense pleasure.'
    },
    'desire-explorer': {
      route: '/games/desire-explorer',
      featured: true,
      description: 'Uncover shared fantasies and discover new realms of pleasure together. Match your desires and unlock exciting new ways to play.'
    },
    'scratch-position': {
      route: '/games/scratch-position',
      featured: true,
      description: 'Discover hidden intimate positions by scratching the cards. Each reveal brings new excitement and possibilities for your intimate moments.'
    },
    'random-position': {
      route: '/games/random-position',
      featured: true,
      description: 'Get instant random position suggestions with a single click. Perfect for spontaneous intimate moments and discovering new favorites.'
    },
    'spin-for-desire': {
      route: '/games/spin-for-desire',
      featured: true,
      description: 'Spin the wheel of passion and discover your next romantic adventure. Let fate decide your intimate moment!'
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gamepad2 className="w-12 h-12 text-romantic" />
              <h1 className="text-4xl md:text-6xl font-extrabold text-romantic drop-shadow-md">
                Intimate Games & Experiences
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our collection of passionate games designed to ignite desire and deepen your connection
            </p>
            {/* Quick Nav Pills */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {[
                { label: 'All Positions', to: '/positions/all', color: 'bg-passionate/20 text-passionate' },
                { label: 'Custom Poster', to: '/custom-poster', color: 'bg-warm/20 text-warm' },
                { label: 'Passion Dice', to: '/games/passion-dice', color: 'bg-romantic/25 text-romantic' },
                { label: 'Truth or Dare', to: '/games/truth-or-dare', color: 'bg-sensual/20 text-sensual' },
                { label: 'All Sex Positions', to: '/positions/all', color: 'bg-passionate/15 text-passionate' },
                { label: 'Long Distance Relationship', to: '/games/long-distance', color: 'bg-warm/20 text-warm' },
              ].map((pill) => (
                <Link key={pill.to} to={pill.to}>
                  <span className={`px-3 py-1 rounded-full text-xs border border-white/10 ${pill.color}`}>{pill.label}</span>
                </Link>
              ))}
            </div>
          </div>

          

          {/* Curated Games (no duplicate heading) */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
              <Card variant="elegant" className="bg-gradient-to-br from-romantic/15 to-background/40 border border-romantic/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Dice1 className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Passion Dice</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4 flex flex-col h-full">
                  <p className="text-muted-foreground text-sm">
                    Roll the dice for random intimate actions and discover new ways to pleasure each other
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>10-20 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">beginner</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Dice</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/passion-dice">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card variant="elegant" className="bg-gradient-to-br from-sensual/15 to-background/40 border border-sensual/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Naughty Truth or Dare</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4 flex flex-col h-full">
                  <p className="text-muted-foreground text-sm">
                    Turn up the heat with provocative questions and seductive dares. From revealing fantasies to acting out desires, each choice brings you closer to ecstasy.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>15-30 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">beginner</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Communication</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/truth-or-dare">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card variant="elegant" className="bg-gradient-to-br from-warm/15 to-background/40 border border-warm/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Erotic Massage Journey</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Master the art of sensual touch. Learn tantalizing techniques to find secret pleasure spots and build waves of sensation that will drive your partner wild.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>20-40 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">beginner</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Connection</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/erotic-massage">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card variant="elegant" className="bg-gradient-to-br from-passionate/15 to-background/40 border border-passionate/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Fantasy Roleplay Creator</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Live out your wildest fantasies! From seductive strangers to forbidden encounters, discover scenarios that will unleash your passionate alter egos.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>20-60 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">intermediate</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Adventure</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/fantasy-roleplay">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card variant="elegant" className="bg-gradient-to-br from-romantic/15 to-background/40 border border-romantic/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Mic className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Seductive Conversation</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Ignite desire through words. These provocative questions explore your deepest fantasies, boundaries, and desires while building intense anticipation.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>10-30 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">beginner</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Communication</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/seductive-conversation">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card variant="elegant" className="bg-gradient-to-br from-sensual/15 to-background/40 border border-sensual/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Map className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Pleasure Map</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Embark on a journey of sensual discovery. Map out every sensitive spot and learn expert techniques to create waves of intense pleasure.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>15-45 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">intermediate</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Discovery</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/pleasure-map">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card variant="elegant" className="bg-gradient-to-br from-warm/15 to-background/40 border border-warm/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Scratch Position</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Discover hidden intimate positions by scratching the cards. Each reveal brings new excitement and possibilities for your intimate moments.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>10-20 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">beginner</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Interactive</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/scratch-position?start=1#start">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Start Exploring
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card variant="elegant" className="bg-gradient-to-br from-purple-500/15 to-background/40 border border-purple-500/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Shuffle className="w-8 h-8 text-purple-300" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-purple-300">Random Position</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Get instant random position suggestions with a single click. Perfect for spontaneous intimate moments and discovering new favorites.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Instant</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">instant</span>
                    <span className="px-2 py-1 bg-pink-500/10 text-pink-300 rounded text-xs">Random</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/random-position">
                    <Button variant="romantic" className="w-full mt-3">
                      <Shuffle className="w-4 h-4" />
                      Generate Random
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card variant="elegant" className="bg-gradient-to-br from-sensual/15 to-background/40 border border-sensual/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Spin for Desire</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Spin the wheel of passion and discover your next romantic adventure. Let fate decide your intimate moment!
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>5-15 minutes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">beginner</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Adventure</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/spin-for-desire">
                    <Button variant="romantic" className="w-full mt-3">
                      <Gamepad2 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card variant="elegant" className="bg-gradient-to-br from-romantic/15 to-background/40 border border-romantic/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">Honeymoon Bucket List</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    A sweet checklist of romantic honeymoon ideas to create unforgettable memories together. Check off experiences as you complete them!
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Varies</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">beginner</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Planning</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/honeymoon-bucket-list">
                    <Button variant="romantic" className="w-full mt-3">
                      <Heart className="w-4 h-4" />
                      Start Planning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card variant="elegant" className="bg-gradient-to-br from-romantic/15 to-background/40 border border-romantic/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-romantic" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-romantic">First Night Bucket List</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Gentle and memorable ideas for your special night. Create beautiful moments together with love and care.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Varies</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-romantic/10 text-romantic rounded text-xs">gentle</span>
                    <span className="px-2 py-1 bg-passionate/10 text-passionate rounded text-xs">Sweet Memories</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/first-night-bucket-list">
                    <Button variant="romantic" className="w-full mt-3">
                      <Sparkles className="w-4 h-4" />
                      Create Memories
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card variant="elegant" className="bg-gradient-to-br from-purple-500/15 to-background/40 border border-purple-500/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Palette className="w-8 h-8 text-purple-300" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-purple-300">Custom Poster</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Design your own collection of favorite positions. Create a beautiful, personalized poster for your intimate journey.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>15-30 min</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">creative</span>
                    <span className="px-2 py-1 bg-pink-500/10 text-pink-300 rounded text-xs">Design</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/positions/custom-poster">
                    <Button variant="romantic" className="w-full mt-3">
                      <Palette className="w-4 h-4" />
                      Start Designing
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card variant="elegant" className="bg-gradient-to-br from-red-500/15 to-background/40 border border-red-500/25 hover-romantic h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                      <div className="flex gap-1">
                        <Dice6 className="w-4 h-4 text-red-300" />
                        <Dice6 className="w-4 h-4 text-red-300" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-red-300">Dice to Spice</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Roll two dice for exciting combinations! One shows actions, the other body parts. Choose from Cute, Spicy, or Custom difficulty.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>5-15 min</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2 players</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="px-2 py-1 bg-red-500/10 text-red-300 rounded text-xs">Interactive</span>
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-300 rounded text-xs">Two Dice</span>
                  </div>
                  <div className="mt-auto" />
                  <Link to="/games/dice-to-spice">
                    <Button variant="romantic" className="w-full mt-3">
                      <Dice6 className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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