import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, ArrowLeft, ArrowRight, RotateCcw, Star } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { loveLanguageDescriptions, getActivitiesByLoveLanguage } from "@/data/loveLanguages"
import type { LoveLanguageType } from "@/types"

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState<LoveLanguageType[]>([])

  const questions = [
    {
      id: 'quality_time',
      question: "How important is it that your partner gives you their undivided attention?",
      description: "Consider activities like having meaningful conversations, doing things together without distractions"
    },
    {
      id: 'physical_touch',
      question: "How much do you value physical affection in your relationship?",
      description: "Think about hugs, holding hands, cuddling, and other forms of appropriate physical contact"
    },
    {
      id: 'words_of_affirmation',
      question: "How important are verbal expressions of love and appreciation to you?",
      description: "Consider compliments, words of encouragement, and verbal expressions of love"
    },
    {
      id: 'acts_of_service',
      question: "How much do you appreciate when your partner does helpful things for you?",
      description: "Think about tasks like cooking, cleaning, running errands, or other helpful actions"
    },
    {
      id: 'receiving_gifts',
      question: "How important are thoughtful gifts and surprises in showing love?",
      description: "Consider both expensive gifts and small, meaningful tokens of affection"
    }
  ]

  const handleAnswer = (score: number) => {
    const questionId = questions[currentQuestion].id
    const newAnswers = { ...answers, [questionId]: score }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults(newAnswers)
    }
  }

  const calculateResults = (finalAnswers: Record<string, number>) => {
    const scores = Object.entries(finalAnswers)
      .map(([loveLanguage, score]) => ({ loveLanguage: loveLanguage as LoveLanguageType, score }))
      .sort((a, b) => b.score - a.score)
    
    setResults(scores.map(item => item.loveLanguage))
    setIsComplete(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setIsComplete(false)
    setResults([])
  }

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getScoreText = (score: number) => {
    switch (score) {
      case 1: return "Not Important"
      case 2: return "Somewhat Important" 
      case 3: return "Important"
      case 4: return "Very Important"
      case 5: return "Extremely Important"
      default: return ""
    }
  }

  if (isComplete) {
    const primaryLoveLanguage = results[0]
    const secondaryLoveLanguage = results[1]

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Games
              </Link>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-10 h-10 text-romantic" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                  Your Love Language Results
                </h1>
              </div>
            </div>

            {/* Primary Love Language */}
            <Card variant="romantic" className="mb-8">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{loveLanguageDescriptions[primaryLoveLanguage].icon}</div>
                <CardTitle className="text-2xl text-romantic mb-2">
                  Your Primary Love Language
                </CardTitle>
                <h2 className="text-3xl font-bold">{loveLanguageDescriptions[primaryLoveLanguage].title}</h2>
                <p className="text-lg text-muted-foreground mt-2">
                  {loveLanguageDescriptions[primaryLoveLanguage].description}
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <blockquote className="text-lg italic text-romantic mb-6">
                  "{loveLanguageDescriptions[primaryLoveLanguage].quote}"
                </blockquote>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <h4 className="font-semibold mb-2">What this means:</h4>
                    <p className="text-sm text-muted-foreground">
                      You feel most loved when your partner expresses love through {primaryLoveLanguage.replace('_', ' ').toLowerCase()}.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Activities for you:</h4>
                    <div className="text-sm text-muted-foreground">
                      {getActivitiesByLoveLanguage(primaryLoveLanguage).slice(0, 2).map((activity, index) => (
                        <div key={index}>• {activity.title}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Love Language */}
            <Card variant="elegant" className="mb-8">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{loveLanguageDescriptions[secondaryLoveLanguage].icon}</div>
                <CardTitle className="text-xl">Your Secondary Love Language</CardTitle>
                <h3 className="text-2xl font-bold">{loveLanguageDescriptions[secondaryLoveLanguage].title}</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {loveLanguageDescriptions[secondaryLoveLanguage].description}
                </p>
              </CardContent>
            </Card>

            {/* All Results */}
            <Card variant="elegant" className="mb-8">
              <CardHeader>
                <CardTitle>Your Complete Love Language Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.map((loveLanguage, index) => {
                    const score = answers[loveLanguage]
                    const percentage = (score / 5) * 100
                    
                    return (
                      <div key={loveLanguage} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{loveLanguageDescriptions[loveLanguage].icon}</span>
                          <div>
                            <div className="font-medium">{loveLanguageDescriptions[loveLanguage].title}</div>
                            <div className="text-sm text-muted-foreground">Score: {score}/5</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {index === 0 && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-romantic h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="romantic" onClick={resetQuiz} data-testid="button-retake-quiz">
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </Button>
                <Link to="/games">
                  <Button variant="outline" data-testid="button-back-to-games">
                    Back to Games
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Share these results with your partner to better understand each other's love languages
              </p>
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
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Love Language Quiz
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover your love language and learn how you prefer to give and receive love in your relationship
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-romantic h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <Card variant="elegant" className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                {questions[currentQuestion].question}
              </CardTitle>
              <p className="text-muted-foreground text-center">
                {questions[currentQuestion].description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((score) => (
                  <Button
                    key={score}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-4"
                    onClick={() => handleAnswer(score)}
                    data-testid={`button-answer-${score}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-romantic/20 rounded-full flex items-center justify-center text-romantic font-bold">
                        {score}
                      </div>
                      <span>{getScoreText(score)}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
              data-testid="button-previous"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground self-center">
              {Object.keys(answers).length}/{questions.length} answered
            </div>
            
            <div className="w-[100px]"> {/* Spacer for balance */} </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoveQuiz