import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, Download, Plus, X, Star, Shuffle, Save, Share2, Grid, List, Palette, Image as ImageIcon, Calendar, Clock, Lock, CheckCircle, RefreshCw } from "lucide-react"
import { posterPositions, getAllPosterPositions } from "@/data/posterPositions"

interface Position {
  id: string
  name: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  image: string
  description: string
}

interface PosterSlot {
  id: string
  position?: Position
  day: number
  isRevealed: boolean
  revealedDate?: string
}

interface JourneyProgress {
  currentDay: number
  completedDays: number[]
  startDate: string
  lastRevealDate: string
}

const CustomPoster = () => {
  const [journeyProgress, setJourneyProgress] = useState<JourneyProgress>(() => {
    const saved = localStorage.getItem('intimateJourneyProgress')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      currentDay: 1,
      completedDays: [],
      startDate: new Date().toISOString().split('T')[0],
      lastRevealDate: ''
    }
  })

  const [posterSlots, setPosterSlots] = useState<PosterSlot[]>(() => {
    const saved = localStorage.getItem('intimateJourneySlots')
    if (saved) {
      return JSON.parse(saved)
    }
    return Array.from({ length: 7 }, (_, i) => ({
      id: `slot-${i}`,
      day: i + 1,
      isRevealed: false
    }))
  })

  const [posterTitle, setPosterTitle] = useState("Intimate Journey")
  const [posterSubtitle, setPosterSubtitle] = useState("Your 7-day journey of intimate discoveries")
  const [selectedTheme, setSelectedTheme] = useState<'purple' | 'pink' | 'red' | 'blue'>('purple')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [allPositions, setAllPositions] = useState<Position[]>([])
  const posterRef = useRef<HTMLDivElement>(null)

  // Load positions from data file and localStorage
  useEffect(() => {
    const positions = getAllPosterPositions()
    setAllPositions(positions)
  }, [])

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'poster_positions_custom') {
        const positions = getAllPosterPositions()
        setAllPositions(positions)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', () => {
      const positions = getAllPosterPositions()
      setAllPositions(positions)
    })

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('intimateJourneyProgress', JSON.stringify(journeyProgress))
  }, [journeyProgress])

  useEffect(() => {
    localStorage.setItem('intimateJourneySlots', JSON.stringify(posterSlots))
  }, [posterSlots])

  const refreshPositions = () => {
    const positions = getAllPosterPositions()
    setAllPositions(positions)
  }

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('intimateJourneyProgress', JSON.stringify(journeyProgress))
  }, [journeyProgress])

  useEffect(() => {
    localStorage.setItem('intimateJourneySlots', JSON.stringify(posterSlots))
  }, [posterSlots])

  const themes = {
    purple: 'from-purple-900 via-pink-900 to-red-900',
    pink: 'from-pink-900 via-rose-900 to-purple-900',
    red: 'from-red-900 via-pink-900 to-purple-900',
    blue: 'from-blue-900 via-purple-900 to-pink-900'
  }

  // Check if user can reveal today's position
  const canRevealToday = () => {
    const today = new Date().toISOString().split('T')[0]
    return journeyProgress.lastRevealDate !== today && journeyProgress.currentDay <= 7
  }

  // Reveal today's position
  const revealTodaysPosition = () => {
    if (!canRevealToday()) return

    const today = new Date().toISOString().split('T')[0]
    const currentDay = journeyProgress.currentDay
    const randomPosition = allPositions[Math.floor(Math.random() * allPositions.length)]

    // Update the slot for current day
    setPosterSlots(prev => prev.map(slot => 
      slot.day === currentDay 
        ? { ...slot, position: randomPosition, isRevealed: true, revealedDate: today }
        : slot
    ))

    // Update progress
    setJourneyProgress(prev => ({
      ...prev,
      currentDay: Math.min(currentDay + 1, 8),
      completedDays: [...prev.completedDays, currentDay],
      lastRevealDate: today
    }))
  }

  // Reset journey (for testing or restart)
  const resetJourney = () => {
    const newProgress = {
      currentDay: 1,
      completedDays: [],
      startDate: new Date().toISOString().split('T')[0],
      lastRevealDate: ''
    }
    const newSlots = Array.from({ length: 7 }, (_, i) => ({ 
      id: `slot-${i}`, 
      day: i + 1,
      isRevealed: false
    }))
    
    setJourneyProgress(newProgress)
    setPosterSlots(newSlots)
  }

  // Get days since journey started
  const getDaysSinceStart = () => {
    const start = new Date(journeyProgress.startDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const revealedSlots = posterSlots.filter(slot => slot.isRevealed).length
  const completionPercentage = Math.round((revealedSlots / posterSlots.length) * 100)
  const daysSinceStart = getDaysSinceStart()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[selectedTheme]}`}>
      <main className="pt-16 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <Palette className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-pink-300" />
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent text-center">
                Custom Poster
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-3 sm:px-2">
              Design your own collection of favorite positions. Create a beautiful, personalized poster for your intimate journey.
            </p>

            {/* Theme Selector */}
            <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-3">
              {Object.entries(themes).map(([theme, gradient]) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme as any)}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${gradient} border-2 transition-all ${
                    selectedTheme === theme ? 'border-white scale-110' : 'border-white/30 hover:border-white/60'
                  }`}
                  title={`${theme} theme`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Poster Preview */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card variant="elegant" className="bg-black/20 border-white/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-2">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl text-white">Your Journey</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {canRevealToday() ? (
                        <Button
                          variant="romantic"
                          size="sm"
                          onClick={revealTodaysPosition}
                          className="animate-pulse text-xs sm:text-sm"
                        >
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Reveal Day {journeyProgress.currentDay}</span>
                          <span className="sm:hidden">Day {journeyProgress.currentDay}</span>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="text-yellow-300 border-yellow-500/30 bg-yellow-500/10 text-xs sm:text-sm"
                        >
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Come Back Tomorrow</span>
                          <span className="sm:hidden">Tomorrow</span>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetJourney}
                        className="text-red-300 border-red-500/30 hover:bg-red-500/20 hover:text-red-200 text-xs sm:text-sm"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Reset</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 text-sm">Journey Progress</span>
                      <span className="text-pink-300 font-bold text-sm">{revealedSlots}/7 days</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/50 mt-1">
                      <span>Day {daysSinceStart} of journey</span>
                      <span>{completionPercentage}% Complete</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Poster Design */}
                  <div ref={posterRef} className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg sm:rounded-xl p-3 sm:p-6 border border-white/10">
                    {/* Poster Header */}
                    <div className="text-center mb-4 sm:mb-6">
                      <input
                        type="text"
                        value={posterTitle}
                        onChange={(e) => setPosterTitle(e.target.value)}
                        className="text-lg sm:text-2xl lg:text-3xl font-bold text-white bg-transparent border-none outline-none text-center w-full"
                        placeholder="Poster Title"
                      />
                      <input
                        type="text"
                        value={posterSubtitle}
                        onChange={(e) => setPosterSubtitle(e.target.value)}
                        className="text-xs sm:text-sm text-white/70 bg-transparent border-none outline-none text-center w-full mt-1"
                        placeholder="Subtitle"
                      />
                      <div className="text-xs text-white/50 mt-2">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>

                    {/* Journey Progress Visual */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                        <span>Journey Progress</span>
                        <span>{completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-pink-400 to-purple-400 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 text-center">
                      <div>
                        <div className="text-sm sm:text-lg font-bold text-white">{journeyProgress.currentDay > 7 ? 7 : journeyProgress.currentDay}</div>
                        <div className="text-xs text-white/60">Current Day</div>
                      </div>
                      <div>
                        <div className="text-sm sm:text-lg font-bold text-pink-300">{revealedSlots}</div>
                        <div className="text-xs text-white/60">Revealed</div>
                      </div>
                      <div>
                        <div className="text-sm sm:text-lg font-bold text-purple-300">{completionPercentage}%</div>
                        <div className="text-xs text-white/60">Completion</div>
                      </div>
                      <div>
                        <div className="text-sm sm:text-lg font-bold text-red-300">{daysSinceStart}</div>
                        <div className="text-xs text-white/60">Days Since Start</div>
                      </div>
                    </div>

                    {/* Position Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {posterSlots.map((slot) => (
                        <div key={slot.id} className="aspect-square">
                          {slot.isRevealed && slot.position ? (
                            <Card 
                              variant="elegant" 
                              className="h-full bg-gradient-to-br from-green-500/20 to-purple-500/20 border-green-500/30 relative"
                            >
                              <CardContent className="p-3 h-full flex flex-col">
                                <div className="absolute top-1 right-1">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                </div>
                                <div className="flex-1 flex items-center justify-center overflow-hidden rounded">
                                  {slot.position.image ? (
                                    <img 
                                      src={slot.position.image} 
                                      alt={slot.position.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <ImageIcon className="w-8 h-8 text-white/60" />
                                  )}
                                </div>
                                <div className="text-center">
                                  <div className="text-xs font-semibold text-white break-words">
                                    {slot.position.name}
                                  </div>
                                  <div className="text-xs text-green-300 mt-1">
                                    Day {slot.day} ✓
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : slot.day === journeyProgress.currentDay && canRevealToday() ? (
                            <Card 
                              variant="elegant" 
                              className="h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-500/30 border-dashed animate-pulse cursor-pointer group"
                              onClick={revealTodaysPosition}
                            >
                              <CardContent className="p-3 h-full flex flex-col items-center justify-center">
                                <Calendar className="w-6 h-6 text-pink-300 group-hover:scale-110 transition-transform" />
                                <div className="text-xs text-pink-300 mt-2 font-semibold">
                                  Reveal Day {slot.day}
                                </div>
                              </CardContent>
                            </Card>
                          ) : slot.day < journeyProgress.currentDay ? (
                            <Card 
                              variant="elegant" 
                              className="h-full bg-black/20 border-white/10 opacity-50"
                            >
                              <CardContent className="p-3 h-full flex flex-col items-center justify-center">
                                <X className="w-6 h-6 text-white/30" />
                                <div className="text-xs text-white/30 mt-2">
                                  Day {slot.day}
                                </div>
                                <div className="text-xs text-white/20 mt-1">
                                  Missed
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card 
                              variant="elegant" 
                              className="h-full bg-black/20 border-white/10 opacity-60"
                            >
                              <CardContent className="p-3 h-full flex flex-col items-center justify-center">
                                <Lock className="w-6 h-6 text-white/40" />
                                <div className="text-xs text-white/40 mt-2">
                                  Day {slot.day}
                                </div>
                                <div className="text-xs text-white/30 mt-1">
                                  Locked
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      {['Passionate', 'Intimate', 'Adventurous', 'Romantic', 'Playful', 'Sensual'].map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/10 text-white/70 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center">
                    <Button variant="romantic" className="flex items-center gap-2 text-sm sm:text-base">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Download Poster</span>
                      <span className="sm:hidden">Download</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-200 text-sm sm:text-base">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Save Design</span>
                      <span className="sm:hidden">Save</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 text-green-300 border-green-500/30 hover:bg-green-500/20 hover:text-green-200 text-sm sm:text-base">
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Journey Status */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <Card variant="elegant" className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
                    Journey Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Current Status */}
                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/20">
                      {canRevealToday() ? (
                        <>
                          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-pink-300 mx-auto mb-2 animate-pulse" />
                          <div className="text-white font-semibold mb-1 text-sm sm:text-base">Day {journeyProgress.currentDay} Ready!</div>
                          <div className="text-white/70 text-xs sm:text-sm mb-3">Click the pulsing card above to reveal today's position</div>
                          <Button
                            variant="romantic"
                            onClick={revealTodaysPosition}
                            className="w-full animate-pulse text-sm sm:text-base"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            Reveal Now
                          </Button>
                        </>
                      ) : journeyProgress.currentDay > 7 ? (
                        <>
                          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-300 mx-auto mb-2" />
                          <div className="text-white font-semibold mb-1 text-sm sm:text-base">Journey Complete!</div>
                          <div className="text-white/70 text-xs sm:text-sm">You've revealed all 7 positions. Congratulations!</div>
                        </>
                      ) : (
                        <>
                          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-2" />
                          <div className="text-yellow-300 font-semibold mb-1 text-sm sm:text-base">Come Back Tomorrow</div>
                          <div className="text-yellow-200/80 text-xs sm:text-sm">You've already revealed today's position</div>
                        </>
                      )}
                    </div>

                    {/* Journey Stats */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
                      <div className="p-2 sm:p-3 bg-black/20 rounded-lg">
                        <div className="text-sm sm:text-lg font-bold text-pink-300">{revealedSlots}</div>
                        <div className="text-xs text-white/60">Positions Revealed</div>
                      </div>
                      <div className="p-2 sm:p-3 bg-black/20 rounded-lg">
                        <div className="text-sm sm:text-lg font-bold text-purple-300">{daysSinceStart}</div>
                        <div className="text-xs text-white/60">Days Since Start</div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="text-xs sm:text-sm text-white/70 space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-pink-300 flex-shrink-0"></span>
                        <span>One position revealed per day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-pink-300 flex-shrink-0"></span>
                        <span>Positions stay revealed forever</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-pink-300 flex-shrink-0"></span>
                        <span>Come back daily for new discoveries</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Journey Tips */}
              <Card variant="elegant" className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                    Journey Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                      <span>Visit daily to unlock new positions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                      <span>Each revealed position stays forever</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                      <span>Customize your poster title and theme</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                      <span>Download your completed journey poster</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CustomPoster
