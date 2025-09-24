import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { MessageCircle, RefreshCw, Settings, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { truthOrDareQuestions, getRandomTruthOrDare } from "@/data/games"
import type { TruthOrDareQuestion } from "@/types"

const TruthOrDare = () => {
  const [currentQuestion, setCurrentQuestion] = useState<TruthOrDareQuestion | null>(null)
  const [gameType, setGameType] = useState<'truth' | 'dare' | 'random'>('random')
  const [spicyLevel, setSpicyLevel] = useState(3)
  const [isPlaying, setIsPlaying] = useState(false)

  const getNewQuestion = () => {
    const type = gameType === 'random' ? undefined : gameType
    const question = getRandomTruthOrDare(type, spicyLevel)
    setCurrentQuestion(question)
    setIsPlaying(true)
  }

  const resetGame = () => {
    setCurrentQuestion(null)
    setIsPlaying(false)
  }

  const getSpicyLevelText = (level: number) => {
    const levels = ['Innocent', 'Sweet', 'Warm', 'Spicy', 'Fire']
    return levels[level - 1] || 'Fire'
  }

  const getSpicyLevelColor = (level: number) => {
    const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-orange-100 text-orange-800', 'bg-red-100 text-red-800']
    return colors[level - 1] || 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Truth or Dare
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Spicy questions and exciting dares for couples to explore together
            </p>
          </div>

          {!isPlaying ? (
            <>
              {/* Game Settings */}
              <Card variant="elegant" className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Game Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Game Type Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Choose Your Style</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'truth', label: 'Truth Only', desc: 'Deep questions' },
                        { id: 'dare', label: 'Dare Only', desc: 'Action challenges' },
                        { id: 'random', label: 'Mixed', desc: 'Both types' }
                      ].map((type) => (
                        <Button
                          key={type.id}
                          variant={gameType === type.id ? "romantic" : "outline"}
                          onClick={() => setGameType(type.id as 'truth' | 'dare' | 'random')}
                          className="h-auto p-4 flex flex-col gap-1"
                          data-testid={`button-type-${type.id}`}
                        >
                          <span className="font-medium">{type.label}</span>
                          <span className="text-xs opacity-80">{type.desc}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Spicy Level Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Spicy Level</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Button
                          key={level}
                          variant={spicyLevel === level ? "passionate" : "outline"}
                          onClick={() => setSpicyLevel(level)}
                          className="flex-1 min-w-[80px]"
                          data-testid={`button-spicy-${level}`}
                        >
                          {getSpicyLevelText(level)}
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Level {spicyLevel}: {getSpicyLevelText(spicyLevel)} - Choose your comfort zone
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Start Game */}
              <div className="text-center">
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={getNewQuestion}
                  className="min-w-[250px]"
                  data-testid="button-start-game"
                >
                  <MessageCircle className="w-6 h-6" />
                  Start Playing
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Current Question/Dare */}
              <Card variant="romantic" className="mb-8">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Badge 
                      className={`${currentQuestion?.type === 'truth' ? 'bg-blue-500' : 'bg-orange-500'} text-white`}
                    >
                      {currentQuestion?.type?.toUpperCase()}
                    </Badge>
                    <Badge className={getSpicyLevelColor(currentQuestion?.spicyLevel || 1)}>
                      {getSpicyLevelText(currentQuestion?.spicyLevel || 1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl text-center leading-relaxed">
                    {currentQuestion?.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="text-sm text-muted-foreground">
                    Category: {currentQuestion?.category}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="passionate" 
                      onClick={getNewQuestion}
                      data-testid="button-new-question"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Next Question
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetGame}
                      data-testid="button-change-settings"
                    >
                      <Settings className="w-4 h-4" />
                      Change Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Game Stats */}
              <div className="text-center text-sm text-muted-foreground">
                <p>Total Questions Available: {truthOrDareQuestions.length}</p>
                <p>Current Settings: {gameType === 'random' ? 'Mixed' : gameType} | Level {spicyLevel}</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default TruthOrDare