import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Shuffle, RefreshCw, ArrowLeft, Settings, Star, Eye, Clock } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { getRandomPositions } from "@/data/positions"
import type { Position, StyleType, DifficultyLevel } from "@/types"

const RandomGenerator = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [filterStyle, setFilterStyle] = useState<StyleType | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | 'all'>('all')
  const [generationCount, setGenerationCount] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const generatePosition = () => {
    setIsGenerating(true)
    setGenerationCount(prev => prev + 1)
    
    // Simulate generation animation
    setTimeout(() => {
      const positions = getRandomPositions(100) // Get large pool to filter from
      let filteredPositions = positions
      
      // Apply filters
      if (filterStyle !== 'all') {
        filteredPositions = filteredPositions.filter(p => p.style === filterStyle)
      }
      if (filterDifficulty !== 'all') {
        filteredPositions = filteredPositions.filter(p => p.difficulty === filterDifficulty)
      }
      
      // If no positions match filters, use all positions
      if (filteredPositions.length === 0) {
        filteredPositions = positions
      }
      
      const randomPosition = filteredPositions[Math.floor(Math.random() * filteredPositions.length)]
      setCurrentPosition(randomPosition)
      setIsGenerating(false)
    }, 1000)
  }

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
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/positions" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Positions
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shuffle className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Random Position Generator
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover new positions with our intelligent random generator. Perfect for spontaneous moments and exploring new experiences
            </p>
          </div>

          {/* Generator Button */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-6 bg-romantic rounded-xl flex items-center justify-center ${isGenerating ? 'animate-pulse' : ''} shadow-lg`}>
              <Shuffle className={`w-12 h-12 text-white ${isGenerating ? 'animate-spin' : ''}`} />
            </div>
            
            {generationCount === 0 ? (
              <p className="text-muted-foreground mb-6">Ready to discover something new? Click the button below!</p>
            ) : (
              <p className="text-sm text-muted-foreground mb-6">
                Generation #{generationCount} • Customized to your preferences
              </p>
            )}
            
            <Button 
              variant="hero" 
              size="xl" 
              onClick={generatePosition}
              disabled={isGenerating}
              className="min-w-[250px]"
              data-testid="button-generate-position"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Shuffle className="w-5 h-5" />
                  Generate Position
                </>
              )}
            </Button>
          </div>

          {/* Settings */}
          <Card variant="elegant" className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Generator Settings
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  data-testid="button-toggle-settings"
                >
                  {showSettings ? 'Hide' : 'Show'} Settings
                </Button>
              </div>
            </CardHeader>
            
            {showSettings && (
              <CardContent className="space-y-6">
                {/* Style Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Preferred Style</h3>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'romantic', 'passionate', 'adventurous', 'mixed'].map((style) => (
                      <Button
                        key={style}
                        variant={filterStyle === style ? "romantic" : "outline"}
                        size="sm"
                        onClick={() => setFilterStyle(style as StyleType | 'all')}
                        data-testid={`button-filter-style-${style}`}
                      >
                        {style === 'all' ? 'Any Style' : style.charAt(0).toUpperCase() + style.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Difficulty Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={filterDifficulty === difficulty ? "passionate" : "outline"}
                        size="sm"
                        onClick={() => setFilterDifficulty(difficulty as DifficultyLevel | 'all')}
                        data-testid={`button-filter-difficulty-${difficulty}`}
                      >
                        {difficulty === 'all' ? 'Any Level' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  💡 Tip: Set your preferences to get positions that match your comfort level and mood
                </div>
              </CardContent>
            )}
          </Card>

          {/* Generated Position */}
          {currentPosition && !isGenerating && (
            <Card variant="romantic" className="mb-8 animate-fade-in">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CardTitle className="text-2xl md:text-3xl text-romantic">
                    {currentPosition.name}
                  </CardTitle>
                  {currentPosition.featured && (
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  )}
                </div>
                
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <span className={`px-3 py-1 rounded ${getStyleColor(currentPosition.style)}`}>
                    {currentPosition.style}
                  </span>
                  <span className={`px-3 py-1 rounded ${getDifficultyColor(currentPosition.difficulty)}`}>
                    {currentPosition.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-muted rounded text-sm">
                    {currentPosition.category}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-center text-lg text-muted-foreground">
                  {currentPosition.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{currentPosition.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span>{currentPosition.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{currentPosition.duration}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-3 text-center">Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentPosition.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-romantic rounded-full flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions Preview */}
                <div>
                  <h4 className="font-semibold mb-3 text-center">Quick Guide</h4>
                  <div className="space-y-2">
                    {currentPosition.instructions.slice(0, 2).map((instruction, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <span className="w-6 h-6 bg-romantic/20 rounded-full flex items-center justify-center text-romantic font-medium text-xs flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </div>
                    ))}
                    {currentPosition.instructions.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{currentPosition.instructions.length - 2} more steps
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentPosition.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted/50 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="romantic" 
                    onClick={generatePosition}
                    data-testid="button-generate-another"
                  >
                    <Shuffle className="w-4 h-4" />
                    Generate Another
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPosition(null)}
                    data-testid="button-clear-position"
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          {generationCount > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Positions generated this session: {generationCount}</p>
              <p>Current preferences: {filterStyle === 'all' ? 'Any style' : filterStyle} • {filterDifficulty === 'all' ? 'Any difficulty' : filterDifficulty}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default RandomGenerator