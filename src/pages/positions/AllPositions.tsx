import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Grid3X3, Search, Filter, ArrowLeft, Star, Eye, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { positions, searchPositions } from "@/data/positions"
import type { StyleType, DifficultyLevel } from "@/types"

const AllPositions = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStyle, setFilterStyle] = useState<StyleType | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'views' | 'newest'>('name')
  const [showFilters, setShowFilters] = useState(false)
  
  const getFilteredAndSortedPositions = () => {
    let filtered = positions

    // Apply search
    if (searchQuery.trim()) {
      filtered = searchPositions(searchQuery)
    }

    // Apply filters
    filtered = filtered.filter(position => {
      const matchesStyle = filterStyle === 'all' || position.style === filterStyle
      const matchesDifficulty = filterDifficulty === 'all' || position.difficulty === filterDifficulty
      return matchesStyle && matchesDifficulty
    })

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'views':
        return filtered.sort((a, b) => b.views - a.views)
      case 'newest':
        return filtered.sort((a, b) => a.id.localeCompare(b.id)).reverse()
      default:
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  const filteredPositions = getFilteredAndSortedPositions()

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
              <Grid3X3 className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                All Sex Positions
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our complete collection of {positions.length} intimate positions with advanced search and filtering
            </p>
          </div>

          {/* Search and Controls */}
          <Card variant="elegant" className="mb-8">
            <CardContent className="p-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search positions by name, description, tags, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-positions"
                />
              </div>

              {/* Sort and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Sort by:</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-1 border rounded-md bg-background text-sm"
                    data-testid="select-sort-by"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Highest Rated</option>
                    <option value="views">Most Popular</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
                
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

              {/* Filters */}
              {showFilters && (
                <div className="space-y-4 pt-4 border-t">
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

                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setFilterStyle('all')
                        setFilterDifficulty('all')
                        setSortBy('name')
                      }}
                      data-testid="button-clear-all"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredPositions.length} of {positions.length} positions
            </p>
            {(searchQuery || filterStyle !== 'all' || filterDifficulty !== 'all') && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setFilterStyle('all')
                  setFilterDifficulty('all')
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Positions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPositions.map((position) => (
              <Card key={position.id} variant="elegant" className="hover-romantic group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-romantic">{position.name}</CardTitle>
                    {position.featured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
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
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        {position.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {position.views.toLocaleString()}
                      </span>
                    </div>
                    <span>⏱️ {position.duration}</span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {position.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted/50 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                    {position.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted/50 text-xs rounded">
                        +{position.tags.length - 3} more
                      </span>
                    )}
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
                Try adjusting your search or filters to see more results
              </p>
              <Button 
                variant="romantic" 
                onClick={() => {
                  setSearchQuery("")
                  setFilterStyle('all')
                  setFilterDifficulty('all')
                }}
                data-testid="button-clear-all-no-results"
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

export default AllPositions