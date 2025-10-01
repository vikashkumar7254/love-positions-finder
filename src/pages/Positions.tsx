import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Sparkles, Star, Grid3X3, Shuffle, ArrowRight, Heart, TrendingUp } from "lucide-react"
import { positions, getPopularPositions, getFeaturedPositions } from "@/data/positions"
import { Helmet } from "react-helmet-async"

const Positions = () => {
  const popularPositions = getPopularPositions().slice(0, 3)
  const featuredPositions = getFeaturedPositions().slice(0, 6)
  
  const categories = [
    { name: "Romantic", count: positions.filter(p => p.style === 'romantic').length, color: "bg-romantic/10 text-romantic", icon: Heart },
    { name: "Passionate", count: positions.filter(p => p.style === 'passionate').length, color: "bg-passionate/10 text-passionate", icon: Sparkles },
    { name: "Adventurous", count: positions.filter(p => p.style === 'adventurous').length, color: "bg-sensual/10 text-sensual", icon: Star },
    { name: "Mixed", count: positions.filter(p => p.style === 'mixed').length, color: "bg-warm/10 text-warm", icon: Shuffle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Helmet>
        <title>Positions Collection | 500+ Romantic & Passionate Styles</title>
        <meta name="description" content="Browse 500+ intimate positions across romantic, passionate, adventurous, and mixed styles. Filters, featured, and most popular." />
        <link rel="canonical" href={`${window.location.origin}/positions`} />
        <meta property="og:title" content="Positions Collection | 500+ Romantic & Passionate Styles" />
        <meta property="og:description" content="Browse featured and popular intimate positions. Discover your next favorite." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/positions`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-12 h-12 text-romantic" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Positions Collection
              </h1>
              <Heart className="w-12 h-12 text-passionate" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our comprehensive collection of 500+ intimate positions designed to enhance your connection and bring you closer together
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-romantic mb-2">500+</div>
                <div className="text-muted-foreground">Unique Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-passionate mb-2">4</div>
                <div className="text-muted-foreground">Style Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sensual mb-2">All</div>
                <div className="text-muted-foreground">Difficulty Levels</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-12 px-6 bg-gradient-card">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/positions/most-popular">
                <Card variant="romantic" className="hover-romantic group cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center group-hover:bg-romantic/30 transition-colors">
                        <TrendingUp className="w-8 h-8 text-romantic" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-romantic">Most Popular</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Discover the most loved positions by our community
                    </p>
                    <Button variant="romantic" className="w-full" data-testid="button-most-popular">
                      <TrendingUp className="w-4 h-4" />
                      View Popular
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/positions/all">
                <Card variant="elegant" className="hover-romantic group cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-passionate/20 rounded-full flex items-center justify-center group-hover:bg-passionate/30 transition-colors">
                        <Grid3X3 className="w-8 h-8 text-passionate" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-passionate">All Positions</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Browse our complete collection with filters and search
                    </p>
                    <Button variant="passionate" className="w-full" data-testid="button-all-positions">
                      <Grid3X3 className="w-4 h-4" />
                      Browse All
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Random Generator removed */}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Style</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card key={category.name} variant="elegant" className="hover-tender cursor-pointer text-center p-6">
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} positions</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Positions */}
        <section className="py-12 px-6 bg-gradient-card">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Featured Positions</h2>
              <Link to="/positions/all">
                <Button variant="outline" data-testid="button-view-all-featured">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPositions.map((position) => (
                <Card key={position.id} variant="elegant" className="hover-romantic group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-romantic">{position.name}</CardTitle>
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        position.style === 'romantic' ? 'bg-romantic/10 text-romantic' :
                        position.style === 'passionate' ? 'bg-passionate/10 text-passionate' :
                        position.style === 'adventurous' ? 'bg-sensual/10 text-sensual' :
                        'bg-warm/10 text-warm'
                      }`}>
                        {position.style}
                      </span>
                      <span className="text-xs text-muted-foreground">{position.difficulty}</span>
                      <span className="text-xs text-muted-foreground">⭐ {position.rating}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{position.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>👁️ {position.views.toLocaleString()} views</span>
                      <span>⏱️ {position.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Positions Preview */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Most Popular</h2>
              <Link to="/positions/most-popular">
                <Button variant="outline" data-testid="button-view-all-popular">
                  View All Popular
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularPositions.map((position, index) => (
                <Card key={position.id} variant="romantic" className="hover-romantic group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-romantic rounded-full flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <CardTitle className="text-lg text-romantic">{position.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{position.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-romantic font-medium">⭐ {position.rating}/5</span>
                      <span className="text-muted-foreground">👁️ {position.views.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Positions