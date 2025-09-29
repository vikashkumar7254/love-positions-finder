import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, MapPin, Clock, Star, Shuffle, Play, ArrowRight, Settings, Users, Sparkles } from "lucide-react"
import Navigation from "@/components/Navigation"
import { getPositionsByStyle, getRandomPositions } from "@/data/positions"
import type { Position, StyleType } from "@/types"
import ScratchCards from "@/components/ScratchCards"

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

  // Updated to 3-6 per your request
  const countOptions = [3, 4, 5, 6]
  const durationEstimates = {
    quick: '15-30 min',
    medium: '45-60 min',
    extended: '90+ min'
  }

  const generateJourney = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      // Merge base positions with user-added ones
      const getUserPositions = (): Position[] => {
        try {
          const raw = localStorage.getItem('userPositions')
          const arr = raw ? JSON.parse(raw) : []
          return Array.isArray(arr) ? arr : []
        } catch {
          return []
        }
      }

      let availablePositions: Position[] = [
        ...getPositionsByStyle(selectedStyle),
        ...getUserPositions().filter(p => p.style === selectedStyle)
      ]
      
      // Filter by difficulty if not mixed
      if (difficulty !== 'mixed') {
        availablePositions = availablePositions.filter(p => p.difficulty === difficulty)
      }
      
      // If not enough positions, fall back to random
      if (availablePositions.length < positionCount) {
        const mixedPool: Position[] = [
          ...getRandomPositions(100),
          ...getUserPositions()
        ]
        availablePositions = mixedPool
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
                <h1 className="text-3xl font-bold text-foreground">
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
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-romantic animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-romantic rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-romantic via-passionate to-romantic bg-clip-text text-transparent leading-tight">
                  Create Your Perfect
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-romantic via-passionate to-romantic bg-clip-text text-transparent leading-tight">
                  Love Journey
                </h1>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-4">
                Discover the most intimate positions for your next romantic moment together.
              </p>
              <p className="text-lg sm:text-xl text-muted-foreground/80">
                Select options and generate your personalized journey of passion and connection.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-romantic to-transparent"></div>
              <Heart className="w-6 h-6 text-romantic animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-romantic to-transparent"></div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-6 sm:gap-8 text-center">
              <div className="bg-romantic/10 rounded-full px-4 py-2 border border-romantic/20">
                <div className="text-2xl sm:text-3xl font-bold text-romantic">100+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Positions</div>
              </div>
              <div className="bg-passionate/10 rounded-full px-4 py-2 border border-passionate/20">
                <div className="text-2xl sm:text-3xl font-bold text-passionate">4</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Styles</div>
              </div>
              <div className="bg-romantic/10 rounded-full px-4 py-2 border border-romantic/20">
                <div className="text-2xl sm:text-3xl font-bold text-romantic">∞</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Combinations</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Style Selection */}
              <Card variant="elegant" className="bg-gradient-to-br from-romantic/5 to-passionate/5 border-romantic/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                    <div className="p-2 bg-romantic/20 rounded-lg">
                      <Settings className="w-5 h-5 text-romantic" />
                    </div>
                    Choose Your Journey Style
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {styleOptions.map((style) => (
                    <Card
                      key={style.id}
                      variant="elegant"
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedStyle === style.id
                          ? `${style.color} border-2 shadow-lg scale-105 backdrop-blur-sm`
                          : 'hover:shadow-lg hover:border-romantic/30 bg-white/50'
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-3xl sm:text-4xl">{style.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-base sm:text-lg">{style.name}</h4>
                            <p className="text-sm text-muted-foreground leading-tight">{style.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Position Count */}
              <Card variant="elegant" className="bg-gradient-to-br from-romantic/5 to-passionate/5 border-romantic/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                    <div className="p-2 bg-romantic/20 rounded-lg">
                      <Users className="w-5 h-5 text-romantic" />
                    </div>
                    Journey Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-romantic">Number of Positions</label>
                      <div className="grid grid-cols-3 gap-2">
                        {countOptions.map((count) => (
                          <Button
                            key={count}
                            variant={positionCount === count ? "romantic" : "outline"}
                            size="sm"
                            className={`font-semibold transition-all duration-300 ${
                              positionCount === count
                                ? 'scale-105 shadow-lg bg-romantic text-white border-romantic'
                                : 'hover:scale-105 hover:border-romantic/50'
                            }`}
                            onClick={() => setPositionCount(count)}
                            data-testid={`button-count-${count}`}
                          >
                            {count}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-3 block text-romantic">Difficulty Level</label>
                      <div className="space-y-2">
                        {(['mixed', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                          <Button
                            key={level}
                            variant={difficulty === level ? "passionate" : "outline"}
                            size="sm"
                            className={`w-full justify-start font-medium transition-all duration-300 ${
                              difficulty === level
                                ? 'scale-105 shadow-lg bg-passionate text-white border-passionate'
                                : 'hover:scale-102 hover:border-passionate/30'
                            }`}
                            onClick={() => setDifficulty(level)}
                            data-testid={`button-difficulty-${level}`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-3 block text-romantic">Estimated Duration</label>
                      <div className="space-y-2">
                        {(['quick', 'medium', 'extended'] as const).map((dur) => (
                          <Button
                            key={dur}
                            variant={duration === dur ? "passionate" : "outline"}
                            size="sm"
                            className={`w-full justify-between font-medium transition-all duration-300 ${
                              duration === dur
                                ? 'scale-105 shadow-lg bg-passionate text-white border-passionate'
                                : 'hover:scale-102 hover:border-passionate/30'
                            }`}
                            onClick={() => setDuration(dur)}
                            data-testid={`button-duration-${dur}`}
                          >
                            <span>{dur.charAt(0).toUpperCase() + dur.slice(1)}</span>
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{durationEstimates[dur]}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <div className="space-y-3">
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full h-auto py-4 bg-gradient-to-r from-romantic via-passionate to-romantic hover:from-romantic/90 hover:via-passionate/90 hover:to-romantic/90 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={generateJourney}
                  disabled={isGenerating}
                  data-testid="button-generate-journey"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3 py-2">
                      <Shuffle className="w-6 h-6 animate-spin" />
                      <span>Generating Love Journey...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <Sparkles className="w-6 h-6" />
                      <span>Generate Love Journey</span>
                    </div>
                  )}
                </Button>

                {journey.length > 0 && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-romantic/30 text-romantic hover:bg-romantic/10 hover:border-romantic"
                    onClick={startJourney}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Button>
                )}
              </div>
            </div>

            {/* Journey Preview */}
            <div className="lg:col-span-2">
              <Card variant="elegant" className="bg-gradient-to-br from-romantic/5 to-passionate/5 border-romantic/20 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl text-romantic flex items-center gap-3">
                    <div className="p-2 bg-romantic/20 rounded-lg">
                      <MapPin className="w-6 h-6 text-romantic" />
                    </div>
                    Journey Preview
                  </CardTitle>
                  {journey.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1 bg-romantic/20 text-romantic rounded-full text-sm font-medium">
                        {journey.length} positions
                      </span>
                      <span className="px-3 py-1 bg-passionate/20 text-passionate rounded-full text-sm font-medium">
                        {selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} style
                      </span>
                      <span className="px-3 py-1 bg-romantic/20 text-romantic rounded-full text-sm font-medium">
                        {durationEstimates[duration]}
                      </span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {journey.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-6">🗺️</div>
                      <h3 className="text-2xl font-bold mb-4 text-romantic">Ready to Begin Your Journey?</h3>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-md mx-auto">
                        Configure your preferences above and click "Generate Love Journey" to create your personalized intimate experience.
                      </p>
                      <div className="flex justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-romantic" />
                          <span>Romantic</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-passionate" />
                          <span>Passionate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-romantic" />
                          <span>Adventurous</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Scratch-to-Reveal Cards */}
                      <ScratchCards
                        items={journey.slice(0, positionCount).map((p, idx) => ({
                          id: p.id || idx,
                          title: p.name,
                          description: p.description,
                          mediaUrl: p.imageUrl || undefined,
                        }))}
                        heading="Unlock Your Love Adventure"
                        subheading={`Discover ${positionCount} exciting intimate position cards. Each card reveals a unique romantic experience.`}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Love Desires Guide */}
          <section className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-romantic via-passionate to-romantic bg-clip-text text-transparent">
                Love Desires Guide
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore your deepest desires and fantasies together in this intimate journey of pleasure and connection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {title: 'Sensual Romance', desc: 'Tender moments of deep connection', icon: '💕', color: 'from-romantic/20 to-romantic/10'},
                {title: 'Passionate Fire', desc: 'Intense and fiery intimate experiences', icon: '🔥', color: 'from-passionate/20 to-passionate/10'},
                {title: 'Fantasy Dreams', desc: 'Explore your deepest desires together', icon: '✨', color: 'from-romantic/20 to-passionate/10'},
                {title: 'Luxury Indulgence', desc: 'Premium intimate experiences', icon: '💎', color: 'from-romantic/20 to-romantic/10'},
                {title: 'Midnight Mysteries', desc: 'Enchanting nocturnal connections', icon: '🌙', color: 'from-passionate/20 to-romantic/10'},
                {title: 'Garden of Love', desc: 'Natural and organic intimacy', icon: '🌹', color: 'from-romantic/20 to-romantic/10'},
                {title: 'Magic Moments', desc: 'Spellbinding romantic adventures', icon: '🪄', color: 'from-romantic/20 to-passionate/10'},
                {title: 'Morning Bliss', desc: 'Start your day with tender love', icon: '☀️', color: 'from-romantic/20 to-romantic/10'},
                {title: 'Special Occasions', desc: 'Perfect for anniversaries and celebrations', icon: '🎉', color: 'from-romantic/20 to-romantic/10'},
                {title: 'Rhythmic Romance', desc: 'Move to the beat of your hearts', icon: '💓', color: 'from-passionate/20 to-romantic/10'},
              ].map((item, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border bg-gradient-to-br ${item.color} hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-romantic">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default JourneyPlanner