import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { TrendingUp, Star, ArrowLeft, Eye, Filter, SlidersHorizontal } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { getPopularPositions } from "@/data/positions"
import type { StyleType, DifficultyLevel } from "@/types"

const MostPopular = () => {
  const [filterStyle, setFilterStyle] = useState<StyleType | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  
  const allPopularPositions = getPopularPositions()
  
  const filteredPositions = allPopularPositions.filter(position => {
    const matchesStyle = filterStyle === 'all' || position.style === filterStyle
    const matchesDifficulty = filterDifficulty === 'all' || position.difficulty === filterDifficulty
    return matchesStyle && matchesDifficulty
  })

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'romantic': return 'bg-romantic/10 text-romantic'
      case 'passionate': return 'bg-passionate/10 text-passionate'
      case 'adventurous': return 'bg-sensual/10 text-sensual'
      case 'mixed': return 'bg-warm/10 text-warm'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-orange-100 text-orange-800'
      case 'expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/positions" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Positions
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Most Popular Positions
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the most loved and highly-rated positions from our community
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card variant="elegant" className="text-center p-4">
              <div className="text-2xl font-bold text-romantic mb-1">{allPopularPositions.length}</div>
              <div className="text-sm text-muted-foreground">Popular Positions</div>
            </Card>
            <Card variant="elegant" className="text-center p-4">
              <div className="text-2xl font-bold text-passionate mb-1">
                {Math.round(allPopularPositions.reduce((acc, p) => acc + p.rating, 0) / allPopularPositions.length * 10) / 10}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </Card>
            <Card variant="elegant" className="text-center p-4">
              <div className="text-2xl font-bold text-sensual mb-1">
                {Math.round(allPopularPositions.reduce((acc, p) => acc + p.views, 0) / 1000)}K
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </Card>
            <Card variant="elegant" className="text-center p-4">
              <div className="text-2xl font-bold text-warm mb-1">{filteredPositions.length}</div>
              <div className="text-sm text-muted-foreground">Showing</div>
            </Card>
          </div>

          {/* Filters */}
          <Card variant="elegant" className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  data-testid="button-toggle-filters"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
              </div>
            </CardHeader>
            
            {showFilters && (
              <CardContent className="space-y-6">
                {/* Style Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Style</h3>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'romantic', 'passionate', 'adventurous', 'mixed'].map((style) => (
                      <Button
                        key={style}
                        variant={filterStyle === style ? "romantic" : "outline"}
                        size="sm"
                        onClick={() => setFilterStyle(style as StyleType | 'all')}
                        data-testid={`button-filter-style-${style}`}
                      >
                        {style === 'all' ? 'All Styles' : style.charAt(0).toUpperCase() + style.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={filterDifficulty === difficulty ? "passionate" : "outline"}
                        size="sm"
                        onClick={() => setFilterDifficulty(difficulty as DifficultyLevel | 'all')}
                        data-testid={`button-filter-difficulty-${difficulty}`}
                      >
                        {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setFilterStyle('all')
                      setFilterDifficulty('all')
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Positions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPositions.map((position, index) => (
              <Card key={position.id} variant="elegant" className="hover-romantic group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-romantic rounded-full flex items-center justify-center text-white font-bold text-sm">
                        #{index + 1}
                      </div>
                      <CardTitle className="text-lg text-romantic">{position.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{position.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded text-xs ${getStyleColor(position.style)}`}>
                      {position.style}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(position.difficulty)}`}>
                      {position.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">{position.category}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{position.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{position.views.toLocaleString()} views</span>
                    </div>
                    <span>⏱️ {position.duration}</span>
                  </div>
                  
                  
                  {/* Benefits Preview */}
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Benefits:</span> {position.benefits[0]}
                    {position.benefits.length > 1 && ` +${position.benefits.length - 1} more`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No positions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results
              </p>
              <Button 
                variant="romantic" 
                onClick={() => {
                  setFilterStyle('all')
                  setFilterDifficulty('all')
                }}
                data-testid="button-clear-filters-no-results"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MostPopular