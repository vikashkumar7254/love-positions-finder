import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, MapPin, Clock, Star, Shuffle, Play, ArrowRight, Settings, Users, Sparkles } from "lucide-react"
import Navigation from "@/components/Navigation"
import { getPositionsByStyle, getRandomPositions } from "@/data/positions"
import type { Position, StyleType } from "@/types"

const JourneyPlanner = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('romantic')
  const [positionCount, setPositionCount] = useState(5)
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'mixed' | 'advanced'>('mixed')
  const [duration, setDuration] = useState<'quick' | 'medium' | 'extended'>('medium')
  const [journey, setJourney] = useState<Position[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isJourneyActive, setIsJourneyActive] = useState(false)

  const styleOptions = [
    {
      id: 'romantic' as StyleType,
      name: 'Romantic',
      icon: '💕',
      description: 'Tender, loving, and emotionally connected',
      color: 'bg-romantic/10 text-romantic border-romantic/20'
    },
    {
      id: 'passionate' as StyleType,
      name: 'Passionate',
      icon: '🔥',
      description: 'Intense, fiery, and deeply sensual',
      color: 'bg-passionate/10 text-passionate border-passionate/20'
    },
    {
      id: 'adventurous' as StyleType,
      name: 'Adventurous',
      icon: '🌟',
      description: 'Exciting, playful, and exploratory',
      color: 'bg-sensual/10 text-sensual border-sensual/20'
    },
    {
      id: 'mixed' as StyleType,
      name: 'Mixed',
      icon: '🎭',
      description: 'A perfect blend of all styles',
      color: 'bg-warm/10 text-warm border-warm/20'
    }
  ]

  const countOptions = [3, 5, 7, 10, 12, 15]
  const durationEstimates = {
    quick: '15-30 min',
    medium: '45-60 min',
    extended: '90+ min'
  }

  const generateJourney = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      let availablePositions = getPositionsByStyle(selectedStyle)
      
      // Filter by difficulty if not mixed
      if (difficulty !== 'mixed') {
        availablePositions = availablePositions.filter(p => p.difficulty === difficulty)
      }
      
      // If not enough positions, fall back to random
      if (availablePositions.length < positionCount) {
        availablePositions = getRandomPositions(100)
      }
      
      // Shuffle and select positions
      const shuffled = [...availablePositions].sort(() => Math.random() - 0.5)
      const selectedPositions = shuffled.slice(0, positionCount)
      
      // Sort by difficulty for a progressive journey
      const sortedJourney = selectedPositions.sort((a, b) => {
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      })
      
      setJourney(sortedJourney)
      setIsGenerating(false)
    }, 1500)
  }

  const startJourney = () => {
    setIsJourneyActive(true)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < journey.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const resetJourney = () => {
    setIsJourneyActive(false)
    setCurrentStep(0)
    setJourney([])
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

  if (isJourneyActive && journey.length > 0) {
    const currentPosition = journey[currentStep]
    const progress = ((currentStep + 1) / journey.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            {/* Progress Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-romantic" />
                <h1 className="text-3xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                  Your Intimate Journey
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Step {currentStep + 1} of {journey.length} • {selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} Style
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-romantic h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Current Position */}
            <Card variant="romantic" className="mb-8">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">💫</div>
                <CardTitle className="text-3xl text-romantic">{currentPosition.name}</CardTitle>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className={`px-3 py-1 rounded ${getDifficultyColor(currentPosition.difficulty)}`}>
                    {currentPosition.difficulty}
                  </span>
                  <span className="text-muted-foreground">{currentPosition.category}</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    {currentPosition.rating}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-lg text-center text-muted-foreground">
                  {currentPosition.description}
                </p>
                
                {/* Instructions */}
                <div>
                  <h4 className="font-semibold mb-4 text-center">Step-by-Step Guide</h4>
                  <div className="space-y-3">
                    {currentPosition.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="w-8 h-8 bg-romantic/20 rounded-full flex items-center justify-center text-romantic font-medium text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-sm">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-3 text-center">Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentPosition.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-3 h-3 text-romantic" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Estimate */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Recommended duration: {currentPosition.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={resetJourney}
                data-testid="button-exit-journey"
              >
                Exit Journey
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Take your time • Communicate • Enjoy the moment
                </p>
              </div>
              
              {currentStep < journey.length - 1 ? (
                <Button 
                  variant="romantic" 
                  size="lg"
                  onClick={nextStep}
                  data-testid="button-next-step"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={resetJourney}
                  data-testid="button-complete-journey"
                >
                  Journey Complete
                  <Heart className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Intimate Journey Planner
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Create a personalized intimate experience tailored to your preferences. Our intelligent planner will guide you through a curated sequence of positions and activities designed to enhance your connection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Style Selection */}
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Journey Style
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {styleOptions.map((style) => (
                    <Card
                      key={style.id}
                      variant="elegant"
                      className={`cursor-pointer transition-all ${
                        selectedStyle === style.id 
                          ? `${style.color} border-2 scale-105` 
                          : 'hover:shadow-md hover:scale-102'
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{style.icon}</span>
                          <h4 className="font-semibold">{style.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{style.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Position Count */}
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Journey Length
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Number of Positions</label>
                      <div className="grid grid-cols-3 gap-2">
                        {countOptions.map((count) => (
                          <Button
                            key={count}
                            variant={positionCount === count ? "romantic" : "outline"}
                            size="sm"
                            onClick={() => setPositionCount(count)}
                            data-testid={`button-count-${count}`}
                          >
                            {count}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                      <div className="space-y-2">
                        {(['mixed', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                          <Button
                            key={level}
                            variant={difficulty === level ? "passionate" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setDifficulty(level)}
                            data-testid={`button-difficulty-${level}`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Estimated Duration</label>
                      <div className="space-y-2">
                        {(['quick', 'medium', 'extended'] as const).map((dur) => (
                          <Button
                            key={dur}
                            variant={duration === dur ? "passionate" : "outline"}
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => setDuration(dur)}
                            data-testid={`button-duration-${dur}`}
                          >
                            <span>{dur.charAt(0).toUpperCase() + dur.slice(1)}</span>
                            <span className="text-xs">{durationEstimates[dur]}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button 
                variant="hero" 
                size="xl" 
                className="w-full"
                onClick={generateJourney}
                disabled={isGenerating}
                data-testid="button-generate-journey"
              >
                {isGenerating ? (
                  <>
                    <Shuffle className="w-5 h-5 animate-spin" />
                    Creating Journey...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Create Journey
                  </>
                )}
              </Button>
            </div>

            {/* Journey Preview */}
            <div className="lg:col-span-2">
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle>Journey Preview</CardTitle>
                  {journey.length > 0 && (
                    <p className="text-muted-foreground">
                      {journey.length} positions • {selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} style • {durationEstimates[duration]}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {journey.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🗺️</div>
                      <h3 className="text-xl font-semibold mb-2">Ready to Begin?</h3>
                      <p className="text-muted-foreground mb-6">
                        Configure your preferences and click "Create Journey" to generate your personalized intimate experience.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Journey Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {journey.map((position, index) => (
                          <Card key={position.id} variant="elegant" className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Step {index + 1}</span>
                                <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(position.difficulty)}`}>
                                  {position.difficulty}
                                </span>
                              </div>
                              <h4 className="font-semibold text-sm mb-1">{position.name}</h4>
                              <p className="text-xs text-muted-foreground">{position.category}</p>
                              <div className="flex items-center gap-1 mt-2">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs">{position.rating}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Start Journey Button */}
                      <div className="text-center">
                        <Button 
                          variant="hero" 
                          size="xl"
                          onClick={startJourney}
                          data-testid="button-start-journey"
                        >
                          <Play className="w-5 h-5" />
                          Start Journey
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          Begin your guided intimate experience
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default JourneyPlanner