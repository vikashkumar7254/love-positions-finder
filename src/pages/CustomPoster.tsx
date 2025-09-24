import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Download, Palette, Grid3X3, ArrowLeft, Star, Plus, X, Settings, Search, Filter, Wand2, Share2, Eye, Type, Image } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { positions, getPositionsByStyle } from "@/data/positions"
import type { Position, StyleType, CustomPoster as CustomPosterType, DifficultyLevel } from "@/types"

const CustomPoster = () => {
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([])
  const [posterStyle, setPosterStyle] = useState<StyleType>('romantic')
  const [posterLayout, setPosterLayout] = useState<'grid' | 'list' | 'artistic'>('grid')
  const [posterTemplate, setPosterTemplate] = useState<'modern' | 'classic' | 'minimal' | 'elegant'>('modern')
  const [posterColors, setPosterColors] = useState(['#E91E63', '#9C27B0', '#673AB7'])
  const [posterFont, setPosterFont] = useState<'serif' | 'sans' | 'script' | 'modern'>('modern')
  const [posterBackground, setPosterBackground] = useState<'gradient' | 'solid' | 'pattern' | 'image'>('gradient')
  const [showPreview, setShowPreview] = useState(false)
  const [posterName, setPosterName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | 'all'>('all')
  const [currentStep, setCurrentStep] = useState<'select' | 'customize' | 'preview'>('select')
  const posterRef = useRef<HTMLDivElement>(null)

  const maxPositions = 12

  // Get filtered positions
  const getFilteredPositions = () => {
    let filteredPositions = getPositionsByStyle(posterStyle)
    
    if (searchTerm) {
      filteredPositions = filteredPositions.filter(position =>
        position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    if (filterDifficulty !== 'all') {
      filteredPositions = filteredPositions.filter(position => position.difficulty === filterDifficulty)
    }
    
    return filteredPositions
  }

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
    if (posterName && posterName.trim()) {
      setCurrentStep('preview')
      setShowPreview(true)
    } else {
      setCurrentStep('customize')
      setShowPreview(false)
      alert('Please enter a poster name to continue to preview.')
    }
  }

  const downloadPoster = async () => {
    try {
      const posterElement = posterRef.current
      if (!posterElement) {
        alert('Unable to generate poster. Please try again.')
        return
      }

      // Try to capture the actual preview first (simplified approach)
      let previewHTML = ''
      try {
        // Get the actual rendered content from the preview
        const posterContent = posterElement.cloneNode(true) as HTMLElement
        posterContent.style.margin = '0'
        posterContent.style.padding = '40px'
        previewHTML = posterContent.outerHTML
      } catch (error) {
        console.warn('Could not capture preview DOM, falling back to template')
      }

      // Create a comprehensive poster for download
      const posterData = {
        name: posterName || 'My Custom Poster',
        positions: selectedPositions,
        style: posterStyle,
        layout: posterLayout,
        template: posterTemplate,
        colors: posterColors,
        font: posterFont,
        background: posterBackground,
        createdAt: new Date().toISOString()
      }
      
      // Create HTML that matches the exact preview layout and styling
      const layoutClass = (() => {
        switch (posterData.layout) {
          case 'grid': return 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;'
          case 'list': return 'display: flex; flex-direction: column; gap: 0.75rem;'
          case 'artistic': return 'display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem;'
          default: return 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;'
        }
      })()
      
      const fontFamily = (() => {
        switch (posterData.font) {
          case 'serif': return 'serif'
          case 'sans': return 'sans-serif'
          case 'script': return 'cursive'
          case 'modern': return 'system-ui, sans-serif'
          default: return 'sans-serif'
        }
      })()
      
      const templateFontWeight = (() => {
        switch (posterData.template) {
          case 'classic': return 'normal'
          case 'minimal': return '300'
          case 'elegant': return '500'
          default: return 'normal'
        }
      })()

      // Use captured preview HTML if available, otherwise create template
      const posterHtml = previewHTML ? `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${posterData.name}</title>
    <style>
        body { 
            margin: 0; 
            background: ${getBackgroundStyle()};
            min-height: 100vh;
        }
        * {
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    ${previewHTML}
</body>
</html>` : `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${posterData.name}</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: ${fontFamily};
            font-weight: ${templateFontWeight};
            background: ${getBackgroundStyle()};
            color: white;
            min-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .poster { 
            max-width: 800px; 
            width: 100%; 
            text-align: center; 
            padding: 40px;
        }
        .title { 
            font-size: 3rem; 
            font-weight: bold; 
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle { 
            font-size: 1.2rem; 
            opacity: 0.9; 
            margin-bottom: 2rem; 
        }
        .positions-container { 
            ${layoutClass}
            margin: 2rem 0; 
        }
        .position-card { 
            background: rgba(255,255,255,0.2); 
            padding: 1rem; 
            border-radius: 8px; 
            backdrop-filter: blur(10px);
            ${posterData.layout === 'list' ? 'display: flex; justify-content: space-between; align-items: center; text-align: left;' : 'text-align: center;'}
            ${posterData.layout === 'artistic' ? 'transform: rotate(1deg); transition: transform 0.3s;' : ''}
        }
        .position-card:hover { 
            ${posterData.layout === 'artistic' ? 'transform: rotate(0deg);' : ''}
        }
        .position-name { 
            font-weight: bold; 
            margin-bottom: 0.5rem; 
        }
        .position-details { 
            font-size: 0.8rem; 
            opacity: 0.8; 
        }
        .position-index { 
            font-size: 0.75rem; 
            opacity: 0.75; 
        }
        .footer { 
            border-top: 1px solid rgba(255,255,255,0.2); 
            padding-top: 1rem; 
            margin-top: 2rem; 
            font-size: 0.9rem; 
            opacity: 0.8; 
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            text-align: center;
            margin-bottom: 1rem;
        }
        .stat-item {
            font-size: 0.85rem;
        }
        .stat-value {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="poster">
        <h1 class="title">${posterData.name}</h1>
        <p class="subtitle">Your Personal Collection of Intimate Positions</p>
        
        <div class="positions-container">
            ${posterData.positions.map((position, index) => `
                <div class="position-card">
                    <div ${posterData.layout === 'list' ? 'style="flex: 1;"' : ''}>
                        <div class="position-name">${position.name}</div>
                        <div class="position-details">${position.style} • ${position.difficulty}${position.featured ? ' • ⭐ Featured' : ''}</div>
                    </div>
                    ${posterData.layout === 'list' ? `<div class="position-index">#${index + 1}</div>` : ''}
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${posterData.positions.length}</div>
                    <div>Positions</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${posterData.style.charAt(0).toUpperCase() + posterData.style.slice(1)}</div>
                    <div>Style</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${posterData.template.charAt(0).toUpperCase() + posterData.template.slice(1)}</div>
                    <div>Template</div>
                </div>
            </div>
            <p>${posterData.template.charAt(0).toUpperCase() + posterData.template.slice(1)} Template • ${posterData.layout.charAt(0).toUpperCase() + posterData.layout.slice(1)} Layout</p>
            <p>Created ${new Date().toLocaleDateString()} • LovePositions.com</p>
        </div>
    </div>
</body>
</html>`

      // Create downloadable HTML file
      const htmlBlob = new Blob([posterHtml], { type: 'text/html' })
      const htmlUrl = URL.createObjectURL(htmlBlob)
      
      const htmlLink = document.createElement('a')
      htmlLink.href = htmlUrl
      htmlLink.download = `${posterData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`
      htmlLink.click()
      
      // Also download JSON data
      const dataStr = JSON.stringify(posterData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const dataUrl = URL.createObjectURL(dataBlob)
      
      const jsonLink = document.createElement('a')
      jsonLink.href = dataUrl
      jsonLink.download = `${posterData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
      
      // Small delay between downloads
      setTimeout(() => {
        jsonLink.click()
      }, 500)
      
      // Cleanup URLs
      setTimeout(() => {
        URL.revokeObjectURL(htmlUrl)
        URL.revokeObjectURL(dataUrl)
      }, 1000)
      
      alert('Poster downloaded! You now have both HTML (viewable in browser) and JSON (data) versions of your custom poster.')
      
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const sharePoster = () => {
    const shareData = {
      title: posterName || 'My Custom Poster',
      text: `Check out my custom poster with ${selectedPositions.length} intimate positions!`,
      url: window.location.href
    }
    
    if (navigator.share) {
      navigator.share(shareData)
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Poster link copied to clipboard!')
    }
  }

  const loadRandomPositions = () => {
    const availablePositions = getFilteredPositions()
    const randomPositions = availablePositions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(maxPositions, availablePositions.length))
    setSelectedPositions(randomPositions)
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const getBackgroundStyle = () => {
    const [primary, secondary, accent] = posterColors
    
    // Apply template-specific styling
    switch (posterTemplate) {
      case 'classic':
        return posterBackground === 'gradient' 
          ? `linear-gradient(45deg, #8B4513, #D2691E, #F4A460)`
          : `#8B4513`
      case 'minimal':
        return posterBackground === 'gradient'
          ? `linear-gradient(180deg, #2C3E50, #34495E)`
          : `#2C3E50`
      case 'elegant':
        return posterBackground === 'gradient'
          ? `linear-gradient(135deg, #6A1B9A, #8E24AA, #BA68C8)`
          : `#6A1B9A`
      default: // modern
        switch (posterBackground) {
          case 'gradient':
            return `linear-gradient(135deg, ${primary}, ${secondary}, ${accent})`
          case 'solid':
            return primary
          case 'pattern':
            return `${primary} url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          default:
            return `linear-gradient(135deg, ${primary}, ${secondary})`
        }
    }
  }

  const getFontFamily = () => {
    // Combine template and font styling
    const baseFont = (() => {
      switch (posterFont) {
        case 'serif': return 'font-serif'
        case 'sans': return 'font-sans'
        case 'script': return 'font-serif italic'
        case 'modern': return 'font-sans font-light'
        default: return 'font-sans'
      }
    })()
    
    const templateModifier = (() => {
      switch (posterTemplate) {
        case 'classic': return 'tracking-wide'
        case 'minimal': return 'font-light tracking-wider'
        case 'elegant': return 'font-medium'
        default: return ''
      }
    })()
    
    return `${baseFont} ${templateModifier}`.trim()
  }

  const filteredPositions = getFilteredPositions()

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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Create your personalized intimate positions poster with advanced customization options
            </p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {[
                { id: 'select', label: 'Select Positions', icon: Plus },
                { id: 'customize', label: 'Customize Design', icon: Palette },
                { id: 'preview', label: 'Preview & Download', icon: Eye }
              ].map((step, index) => {
                const isActive = currentStep === step.id
                const isCompleted = (step.id === 'select' && selectedPositions.length > 0) || 
                                 (step.id === 'customize' && posterName) ||
                                 (step.id === 'preview' && showPreview)
                
                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isActive ? 'bg-romantic text-romantic-foreground' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm ${isActive ? 'text-romantic font-medium' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                    {index < 2 && <span className="text-muted-foreground">→</span>}
                  </div>
                )
              })}
            </div>
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
                    <Input
                      type="text"
                      value={posterName}
                      onChange={(e) => {
                        setPosterName(e.target.value)
                        if (e.target.value.trim() && selectedPositions.length > 0) {
                          setCurrentStep('customize')
                        } else {
                          setCurrentStep('select')
                          setShowPreview(false) // Reset preview when name is cleared
                        }
                      }}
                      placeholder="My Custom Poster"
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

                  {/* Template Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Template</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'modern', label: 'Modern' },
                        { id: 'classic', label: 'Classic' },
                        { id: 'minimal', label: 'Minimal' },
                        { id: 'elegant', label: 'Elegant' }
                      ].map((template) => (
                        <Button
                          key={template.id}
                          variant={posterTemplate === template.id ? "romantic" : "outline"}
                          size="sm"
                          onClick={() => setPosterTemplate(template.id as typeof posterTemplate)}
                          data-testid={`button-template-${template.id}`}
                        >
                          {template.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Font Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'modern', label: 'Modern', icon: Type },
                        { id: 'serif', label: 'Serif', icon: Type },
                        { id: 'sans', label: 'Sans', icon: Type },
                        { id: 'script', label: 'Script', icon: Type }
                      ].map((font) => (
                        <Button
                          key={font.id}
                          variant={posterFont === font.id ? "romantic" : "outline"}
                          size="sm"
                          onClick={() => setPosterFont(font.id as typeof posterFont)}
                          data-testid={`button-font-${font.id}`}
                        >
                          <font.icon className="w-3 h-3 mr-1" />
                          {font.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Background Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Background</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'gradient', label: 'Gradient', icon: Palette },
                        { id: 'solid', label: 'Solid', icon: Palette },
                        { id: 'pattern', label: 'Pattern', icon: Grid3X3 },
                        { id: 'image', label: 'Image', icon: Image }
                      ].map((bg) => (
                        <Button
                          key={bg.id}
                          variant={posterBackground === bg.id ? "romantic" : "outline"}
                          size="sm"
                          onClick={() => setPosterBackground(bg.id as typeof posterBackground)}
                          data-testid={`button-background-${bg.id}`}
                        >
                          <bg.icon className="w-3 h-3 mr-1" />
                          {bg.label}
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
                      variant="sensual" 
                      className="w-full"
                      onClick={loadRandomPositions}
                      data-testid="button-random-positions"
                    >
                      <Wand2 className="w-4 h-4" />
                      Random Selection
                    </Button>
                    
                    <Button 
                      variant="romantic" 
                      className="w-full"
                      onClick={generatePoster}
                      disabled={selectedPositions.length === 0}
                      data-testid="button-generate-poster"
                    >
                      <Eye className="w-4 h-4" />
                      Generate Preview
                    </Button>
                    
                    {showPreview && (
                      <>
                        <Button 
                          variant="passionate" 
                          className="w-full"
                          onClick={downloadPoster}
                          data-testid="button-download-poster"
                        >
                          <Download className="w-4 h-4" />
                          Download Poster
                        </Button>
                        
                        <Button 
                          variant="warm" 
                          className="w-full"
                          onClick={sharePoster}
                          data-testid="button-share-poster"
                        >
                          <Share2 className="w-4 h-4" />
                          Share Poster
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Position Selection */}
            <div className="lg:col-span-2">
              <Card variant="elegant">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle>Choose Positions - {posterStyle.charAt(0).toUpperCase() + posterStyle.slice(1)} Style</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Select up to {maxPositions} positions for your custom poster
                      </p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {filteredPositions.length} available
                    </Badge>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search positions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        data-testid="input-search-positions"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                      <select
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value as DifficultyLevel | 'all')}
                        className="px-3 py-2 border rounded-md bg-background text-sm"
                        data-testid="select-difficulty-filter"
                      >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredPositions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No positions found matching your criteria.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4" 
                        onClick={() => {
                          setSearchTerm('')
                          setFilterDifficulty('all')
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredPositions.slice(0, 50).map((position) => {
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
                            
                            <div className="flex items-center justify-between text-xs gap-2">
                              <div className="flex gap-1">
                                <Badge className={getDifficultyColor(position.difficulty)} size="sm">
                                  {position.difficulty}
                                </Badge>
                                <Badge variant="outline" size="sm">
                                  {position.style}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-muted-foreground">{position.rating}</span>
                              </div>
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

          {/* Enhanced Preview Section */}
          {showPreview && (
            <Card variant="romantic" className="mt-8">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-romantic" />
                  <CardTitle className="text-2xl">
                    Poster Preview
                  </CardTitle>
                </div>
                <p className="text-muted-foreground">
                  {posterTemplate.charAt(0).toUpperCase() + posterTemplate.slice(1)} template • {posterLayout.charAt(0).toUpperCase() + posterLayout.slice(1)} layout • {selectedPositions.length} positions
                </p>
              </CardHeader>
              <CardContent>
                <div 
                  ref={posterRef}
                  className={`p-8 rounded-lg text-white text-center min-h-[500px] flex flex-col justify-center ${getFontFamily()}`}
                  style={{ background: getBackgroundStyle() }}
                  data-testid="poster-preview"
                >
                  <div className="space-y-6">
                    {/* Poster Header */}
                    <div className="mb-8">
                      <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                        {posterName || 'My Custom Poster'}
                      </h1>
                      <p className="text-lg opacity-90">
                        Your Personal Collection of Intimate Positions
                      </p>
                    </div>

                    {/* Positions Grid */}
                    <div className={`
                      ${posterLayout === 'grid' ? 'grid grid-cols-3 md:grid-cols-4 gap-4' : 
                        posterLayout === 'list' ? 'space-y-3' : 
                        'flex flex-wrap justify-center gap-3'}
                      mb-8
                    `}>
                      {selectedPositions.map((position, index) => (
                        <div 
                          key={position.id} 
                          className={`
                            bg-white/20 backdrop-blur-sm rounded-lg p-3 text-sm
                            ${posterLayout === 'list' ? 'flex items-center justify-between' : 'text-center'}
                            ${posterLayout === 'artistic' ? 'transform rotate-1 hover:rotate-0 transition-transform' : ''}
                          `}
                        >
                          <div className={posterLayout === 'list' ? 'text-left' : ''}>
                            <div className="font-medium">{position.name}</div>
                            <div className="text-xs opacity-80 mt-1">
                              {position.style} • {position.difficulty}
                            </div>
                            {position.featured && (
                              <div className="text-xs mt-1">
                                ⭐ Featured
                              </div>
                            )}
                          </div>
                          {posterLayout === 'list' && (
                            <div className="text-xs opacity-75">
                              #{index + 1}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Poster Footer */}
                    <div className="border-t border-white/20 pt-6">
                      <div className="grid grid-cols-3 gap-4 text-sm opacity-90">
                        <div>
                          <div className="font-medium">{selectedPositions.length}</div>
                          <div className="text-xs">Positions</div>
                        </div>
                        <div>
                          <div className="font-medium">{posterStyle.charAt(0).toUpperCase() + posterStyle.slice(1)}</div>
                          <div className="text-xs">Style</div>
                        </div>
                        <div>
                          <div className="font-medium">{posterTemplate.charAt(0).toUpperCase() + posterTemplate.slice(1)}</div>
                          <div className="text-xs">Template</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-xs opacity-75">
                        Created {new Date().toLocaleDateString()} • LovePositions.com
                      </div>
                    </div>
                  </div>
                </div>

                {/* Poster Actions */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="passionate" 
                    onClick={downloadPoster}
                    data-testid="button-download-poster-final"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  
                  <Button 
                    variant="warm" 
                    onClick={sharePoster}
                    data-testid="button-share-poster-final"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep('customize')}
                    data-testid="button-edit-poster"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Design
                  </Button>
                </div>

                {/* Poster Stats */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-lg font-bold text-romantic">
                      {selectedPositions.filter(p => p.difficulty === 'beginner').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Beginner</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-lg font-bold text-passionate">
                      {selectedPositions.filter(p => p.difficulty === 'intermediate').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Intermediate</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-lg font-bold text-sensual">
                      {selectedPositions.filter(p => p.difficulty === 'advanced').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Advanced</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-lg font-bold text-warm">
                      {selectedPositions.filter(p => p.featured).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Featured</div>
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