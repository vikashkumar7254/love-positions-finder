import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { MessageCircle, RefreshCw, Settings, Flame, Sparkles, Heart, Users, Zap, Eye, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { truthOrDareQuestions, getRandomTruthOrDare } from "@/data/games"
import type { TruthOrDareQuestion } from "@/types"

const TruthOrDare = () => {
  const [currentQuestion, setCurrentQuestion] = useState<TruthOrDareQuestion | null>(null)
  const [gameType, setGameType] = useState<'truth' | 'dare' | 'random'>('random')
  const [spicyLevel, setSpicyLevel] = useState(3)
  const [category, setCategory] = useState<'All' | 'Romance' | 'Sensual' | 'Fantasy' | 'Touch' | 'Intimacy'>('All')
  const [isPlaying, setIsPlaying] = useState(false)

  const getNewQuestion = () => {
    const type = gameType === 'random' ? undefined : gameType
    let pool = truthOrDareQuestions
    // Map UI categories to data categories
    const map: Record<string, string[]> = {
      All: [],
      Romance: ['Romance', 'Attraction'],
      Sensual: ['Sensual', 'Touch', 'Kissing'],
      Fantasy: ['Fantasy', 'Desire', 'Desires', 'Adventure'],
      Touch: ['Touch', 'Kissing', 'Performance'],
      Intimacy: ['Intimacy', 'Preferences']
    }
    if (category !== 'All') {
      const cats = map[category]
      pool = pool.filter(q => cats.includes(q.category))
    }
    if (type) pool = pool.filter(q => q.type === type)
    if (spicyLevel) pool = pool.filter(q => q.spicyLevel <= spicyLevel)
    // Fallback if filters empty
    if (pool.length === 0) pool = truthOrDareQuestions
    const question = pool[Math.floor(Math.random() * pool.length)]
    setCurrentQuestion(question)
    setIsPlaying(true)
  }

  const resetGame = () => {
    setCurrentQuestion(null)
    setIsPlaying(false)
  }

  const getSpicyLevelText = (level: number) => {
    // Map to user's wording: Mild • Steamy • Spicy
    const levels = ['Mild', 'Steamy', 'Warm', 'Spicy', 'Fire']
    return levels[level - 1] || 'Fire'
  }

  const getSpicyLevelColor = (level: number) => {
    const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-orange-100 text-orange-800', 'bg-red-100 text-red-800']
    return colors[level - 1] || 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      
      <main className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-pink-300" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent text-center leading-tight">
                Extreme Truth or Dare
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              Ignite passion with extreme truth or dare questions for adults. Perfect for couples seeking intense intimate adventures!
            </p>
          </div>

          {!isPlaying ? (
            <>
              {/* Game Categories section */}
              <Card variant="elegant" className="bg-black/20 border-purple-500/20 shadow-2xl rounded-2xl backdrop-blur-sm mb-6 sm:mb-8">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                    Extreme Game Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm sm:text-base lg:text-lg break-words">Extreme Truth Questions</div>
                          <div className="text-white/70 text-xs sm:text-sm break-words">Revealing and intimate questions for couples</div>
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2 text-white/60 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-300 flex-shrink-0"></span>
                          <span>Extreme confessions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-300 flex-shrink-0"></span>
                          <span>Intimate secrets</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0"></span>
                          <span>Wild experiences</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0"></span>
                          <span>Deep fantasies</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center">
                          <Flame className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm sm:text-base lg:text-lg break-words">Extreme Dares</div>
                          <div className="text-white/70 text-xs sm:text-sm break-words">Intense challenges for adventurous couples</div>
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2 text-white/60 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0"></span>
                          <span>Sensual challenges</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-300 flex-shrink-0"></span>
                          <span>Intense tasks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-300 flex-shrink-0"></span>
                          <span>Wild activities</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-300 flex-shrink-0"></span>
                          <span>Intimate dares</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Game Settings */}
              <Card variant="elegant" className="bg-black/30 border-white/10 shadow-2xl rounded-2xl backdrop-blur-sm mb-6 sm:mb-8">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                    Extreme Truth or Dare
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8">
                  {/* Game Type Selection */}
                  <div>
                    <h3 className="text-white font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                      Game Type
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { id: 'truth', label: 'Truth', desc: 'Deep questions', icon: Eye, color: 'from-pink-500 to-purple-500' },
                        { id: 'dare', label: 'Dare', desc: 'Action challenges', icon: Flame, color: 'from-red-500 to-orange-500' },
                        { id: 'random', label: 'Mixed', desc: 'Both types', icon: Sparkles, color: 'from-purple-500 to-pink-500' }
                      ].map((type) => {
                        const IconComponent = type.icon
                        return (
                          <button
                            key={type.id}
                            onClick={() => setGameType(type.id as 'truth' | 'dare' | 'random')}
                            className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                              gameType === type.id 
                                ? `bg-gradient-to-br ${type.color} border-white/30 shadow-lg` 
                                : 'bg-black/20 border-white/20 hover:border-white/40'
                            }`}
                            data-testid={`button-type-${type.id}`}
                          >
                            <div className="flex flex-col items-center gap-1 sm:gap-2">
                              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                              <span className="font-bold text-white text-xs sm:text-sm lg:text-base">{type.label}</span>
                              <span className="text-xs text-white/70">{type.desc}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <h3 className="text-white font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-red-300" />
                      Category
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 lg:gap-3">
                      {[
                        { id: 'All', label: 'All', color: 'bg-white/30 text-white border-white/50' },
                        { id: 'Romance', label: 'Romance', color: 'bg-pink-500/30 text-pink-200 border-pink-500/50' },
                        { id: 'Sensual', label: 'Sensual', color: 'bg-purple-500/30 text-purple-200 border-purple-500/50' },
                        { id: 'Fantasy', label: 'Fantasy', color: 'bg-red-500/30 text-red-200 border-red-500/50' },
                        { id: 'Touch', label: 'Touch', color: 'bg-orange-500/30 text-orange-200 border-orange-500/50' },
                        { id: 'Intimacy', label: 'Intimacy', color: 'bg-rose-500/30 text-rose-200 border-rose-500/50' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setCategory(cat.id as 'All' | 'Romance' | 'Sensual' | 'Fantasy' | 'Touch' | 'Intimacy')}
                          className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 rounded-lg border-2 transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 ${
                            category === cat.id
                              ? `${cat.color} shadow-lg scale-105` 
                              : 'bg-black/20 border-white/20 text-white/70 hover:border-white/40'
                          }`}
                          data-testid={`button-category-${cat.id.toLowerCase()}`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Intensity Level */}
                  <div>
                    <h3 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Intensity Level: {getSpicyLevelText(spicyLevel)}</h3>
                    <div className="flex gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSpicyLevel(level)}
                          className={`flex-1 py-1.5 sm:py-2 lg:py-3 rounded-lg border transition-all duration-300 text-xs sm:text-sm font-medium ${
                            spicyLevel >= level
                              ? 'bg-gradient-to-r from-pink-500 to-red-500 border-red-400 text-white shadow-lg' 
                              : 'bg-black/20 border-white/20 text-white/70 hover:border-white/40'
                          }`}
                          data-testid={`button-spicy-${level}`}
                        >
                          {getSpicyLevelText(level)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-white/60 mt-2 sm:mt-3 text-center">
                      Level {spicyLevel}: {getSpicyLevelText(spicyLevel)} - Choose your comfort zone
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Start Game */}
              <div className="text-center">
                <button 
                  onClick={getNewQuestion}
                  className="px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-white font-bold text-base sm:text-lg lg:text-2xl rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 w-full max-w-xs sm:max-w-sm lg:min-w-[300px]"
                  data-testid="button-start-game"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    <span>Start Extreme Game</span>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Current Question/Dare */}
              <Card variant="elegant" className="bg-gradient-to-br from-black/60 to-black/80 border-pink-500/30 shadow-2xl rounded-3xl backdrop-blur-sm mb-8">
                <CardHeader className="text-center pb-6">
                  <div className="mb-6">
                    <div className={`inline-flex px-6 py-3 rounded-full text-lg font-bold ${
                      currentQuestion?.type === 'truth' 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    }`}>
                      {currentQuestion?.type === 'truth' ? (
                        <div className="flex items-center gap-2">
                          <Eye className="w-5 h-5" />
                          <span>TRUTH</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Flame className="w-5 h-5" />
                          <span>DARE</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-4xl text-white leading-tight px-2 sm:px-4 break-words hyphens-auto">
                    {currentQuestion?.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6 sm:space-y-8">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/80">
                    <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                      <Target className="w-4 h-4 text-purple-300" />
                      <span className="font-medium capitalize text-sm sm:text-base">{currentQuestion?.category}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                      <Zap className="w-4 h-4 text-yellow-300" />
                      <span className="font-medium text-sm sm:text-base">Level {currentQuestion?.spicyLevel}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={getNewQuestion}
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
                      data-testid="button-new-question"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5" />
                        <span>Next Question</span>
                      </div>
                    </button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      <button 
                        onClick={()=>{setGameType('truth'); setIsPlaying(false);}}
                        className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-300 ${
                          gameType==='truth' 
                            ? 'bg-gradient-to-br from-pink-500 to-purple-500 border-white/30 text-white shadow-lg' 
                            : 'bg-black/20 border-white/20 text-white/70 hover:border-pink-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium text-sm sm:text-base">Truth</span>
                        </div>
                      </button>
                      <button 
                        onClick={()=>{setGameType('dare'); setIsPlaying(false);}}
                        className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-300 ${
                          gameType==='dare' 
                            ? 'bg-gradient-to-br from-red-500 to-orange-500 border-white/30 text-white shadow-lg' 
                            : 'bg-black/20 border-white/20 text-white/70 hover:border-red-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Flame className="w-4 h-4" />
                          <span className="font-medium text-sm sm:text-base">Dare</span>
                        </div>
                      </button>
                      <button 
                        onClick={()=>{setGameType('random'); setIsPlaying(false);}}
                        className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-300 ${
                          gameType==='random' 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-white/30 text-white shadow-lg' 
                            : 'bg-black/20 border-white/20 text-white/70 hover:border-purple-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-medium text-sm sm:text-base">Mixed</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Game Stats - Hidden on mobile */}
              <div className="hidden sm:block text-center text-white/60 mb-8">
                <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-lg font-medium text-white/80">{truthOrDareQuestions.length} Questions Available</p>
                  <p className="text-sm">Current Settings: {gameType === 'random' ? 'Mixed' : gameType} • {category} • Level {spicyLevel}</p>
                </div>
              </div>
              
              {/* Compact Tips Section - Hidden on mobile */}
              <Card variant="elegant" className="hidden sm:block bg-black/20 border-purple-500/20 shadow-2xl rounded-2xl backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="font-bold text-white mb-2 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4 text-pink-300" />
                        Truth Questions
                      </div>
                      <p className="text-white/70 text-sm">Learn intimate details and build emotional intimacy through revealing questions.</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white mb-2 flex items-center justify-center gap-2">
                        <Flame className="w-4 h-4 text-red-300" />
                        Spicy Dares
                      </div>
                      <p className="text-white/70 text-sm">Create physical intimacy and excitement with playful challenges.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adult Game Guidelines - Compact */}
              <Card variant="elegant" className="bg-black/20 border-red-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-300" />
                    Game Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-white/70">
                    <div className="text-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center mx-auto mb-2">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="font-bold text-white mb-1 text-sm sm:text-base">Consent is Key</div>
                      <div className="text-xs sm:text-sm">Always ensure both partners are comfortable</div>
                    </div>
                    <div className="text-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-2">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="font-bold text-white mb-1 text-sm sm:text-base">Respect Boundaries</div>
                      <div className="text-xs sm:text-sm">Skip uncomfortable questions or dares</div>
                    </div>
                    <div className="text-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center mx-auto mb-2">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="font-bold text-white mb-1 text-sm sm:text-base">Privacy Matters</div>
                      <div className="text-xs sm:text-sm">Keep shared secrets private</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default TruthOrDare