import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, Download, Palette, Grid3X3, ArrowLeft, Star, Plus, X, Settings } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { positions, getPositionsByStyle } from "@/data/positions"
import type { Position, StyleType, CustomPoster as CustomPosterType } from "@/types"

const CustomPoster = () => {
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([])
  const [posterStyle, setPosterStyle] = useState<StyleType>('romantic')
  const [posterLayout, setPosterLayout] = useState<'grid' | 'list' | 'artistic'>('grid')
  const [posterColors, setPosterColors] = useState(['#E91E63', '#9C27B0', '#673AB7'])
  const [showPreview, setShowPreview] = useState(false)
  const [posterName, setPosterName] = useState('')

  const stylePositions = getPositionsByStyle(posterStyle)
  const maxPositions = 12

  const addPosition = (position: Position) => {
    if (selectedPositions.length < maxPositions && !selectedPositions.find(p => p.id === position.id)) {
      setSelectedPositions([...selectedPositions, position])
    }
  }

  const removePosition = (positionId: string) => {
    setSelectedPositions(selectedPositions.filter(p => p.id !== positionId))
  }

  const generatePoster = () => {
    if (selectedPositions.length === 0) return
    
    setShowPreview(true)
    // In a real app, this would generate an actual poster image
  }

  const downloadPoster = () => {
    // In a real app, this would download the generated poster
    alert('Poster download feature would be implemented here!')
  }

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'romantic': return 'bg-romantic/10 text-romantic border-romantic/20'
      case 'passionate': return 'bg-passionate/10 text-passionate border-passionate/20'
      case 'adventurous': return 'bg-sensual/10 text-sensual border-sensual/20'
      case 'mixed': return 'bg-warm/10 text-warm border-warm/20'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Palette className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Custom Poster Creator
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create your personalized intimate positions poster. Choose your favorite positions and customize the design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Poster Settings */}
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Poster Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Poster Name */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Poster Name</label>
                    <input
                      type="text"
                      value={posterName}
                      onChange={(e) => setPosterName(e.target.value)}
                      placeholder="My Custom Poster"
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      data-testid="input-poster-name"
                    />
                  </div>

                  {/* Style Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Style Theme</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['romantic', 'passionate', 'adventurous', 'mixed'] as StyleType[]).map((style) => (
                        <Button
                          key={style}
                          variant={posterStyle === style ? "romantic" : "outline"}
                          size="sm"
                          onClick={() => setPosterStyle(style)}
                          data-testid={`button-style-${style}`}
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Layout Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Layout</label>
                    <div className="space-y-2">
                      {[
                        { id: 'grid', label: 'Grid Layout', icon: Grid3X3 },
                        { id: 'list', label: 'List Layout', icon: Grid3X3 },
                        { id: 'artistic', label: 'Artistic Layout', icon: Star }
                      ].map((layout) => (
                        <Button
                          key={layout.id}
                          variant={posterLayout === layout.id ? "romantic" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setPosterLayout(layout.id as typeof posterLayout)}
                          data-testid={`button-layout-${layout.id}`}
                        >
                          <layout.icon className="w-4 h-4" />
                          {layout.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Color Theme</label>
                    <div className="flex gap-2">
                      {posterColors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Positions */}
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Selected Positions</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {selectedPositions.length}/{maxPositions}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedPositions.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      No positions selected yet. Browse and add positions from the right panel.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedPositions.map((position) => (
                        <div key={position.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <div className="font-medium text-sm">{position.name}</div>
                            <div className="text-xs text-muted-foreground">{position.style}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePosition(position.id)}
                            data-testid={`button-remove-${position.id}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 space-y-2">
                    <Button 
                      variant="romantic" 
                      className="w-full"
                      onClick={generatePoster}
                      disabled={selectedPositions.length === 0}
                      data-testid="button-generate-poster"
                    >
                      <Heart className="w-4 h-4" />
                      Generate Poster
                    </Button>
                    
                    {showPreview && (
                      <Button 
                        variant="passionate" 
                        className="w-full"
                        onClick={downloadPoster}
                        data-testid="button-download-poster"
                      >
                        <Download className="w-4 h-4" />
                        Download Poster
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Position Selection */}
            <div className="lg:col-span-2">
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle>Choose Positions - {posterStyle.charAt(0).toUpperCase() + posterStyle.slice(1)} Style</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select up to {maxPositions} positions for your custom poster
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stylePositions.slice(0, 20).map((position) => {
                      const isSelected = selectedPositions.find(p => p.id === position.id)
                      const canAdd = selectedPositions.length < maxPositions
                      
                      return (
                        <Card
                          key={position.id}
                          variant="elegant"
                          className={`cursor-pointer transition-all ${
                            isSelected 
                              ? `${getStyleColor(position.style)} border-2` 
                              : 'hover:shadow-md hover:scale-105'
                          } ${!canAdd && !isSelected ? 'opacity-50' : ''}`}
                          onClick={() => isSelected ? removePosition(position.id) : canAdd && addPosition(position)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm">{position.name}</h4>
                              <div className="flex items-center gap-1">
                                {position.featured && (
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                )}
                                {isSelected ? (
                                  <X className="w-4 h-4 text-red-500" />
                                ) : (
                                  <Plus className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-2">
                              {position.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className={`px-2 py-1 rounded ${getStyleColor(position.style)}`}>
                                {position.difficulty}
                              </span>
                              <span className="text-muted-foreground">⭐ {position.rating}</span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <Card variant="romantic" className="mt-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {posterName || 'My Custom Poster'} - Preview
                </CardTitle>
                <p className="text-muted-foreground">
                  {posterLayout.charAt(0).toUpperCase() + posterLayout.slice(1)} layout • {selectedPositions.length} positions
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-romantic p-8 rounded-lg text-white text-center min-h-[400px] flex items-center justify-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{posterName || 'My Custom Poster'}</h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                      {selectedPositions.map((position, index) => (
                        <div key={position.id} className="bg-white/20 rounded p-2 text-xs">
                          <div className="font-medium">{position.name}</div>
                          <div className="opacity-80">{position.style}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-lg opacity-90">
                      Your Personalized Collection of {selectedPositions.length} Positions
                    </p>
                    <p className="text-sm opacity-75 mt-2">
                      {posterStyle.charAt(0).toUpperCase() + posterStyle.slice(1)} Style • {posterLayout.charAt(0).toUpperCase() + posterLayout.slice(1)} Layout
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default CustomPoster