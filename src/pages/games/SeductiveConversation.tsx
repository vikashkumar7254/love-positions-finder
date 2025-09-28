import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Mic, Heart, Flame, Star, RefreshCw, MessageCircle, Sparkles, Eye } from "lucide-react"

interface ConversationStarter {
  id: string
  category: string
  level: 'mild' | 'spicy' | 'hot' | 'fire'
  question: string
  followUp?: string[]
}

const SeductiveConversation = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('intimate')
  const [selectedLevel, setSelectedLevel] = useState<string>('mild')
  const [currentQuestion, setCurrentQuestion] = useState<ConversationStarter | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const conversationStarters: ConversationStarter[] = [
    // Intimate Questions
    {
      id: 'intimate_1',
      category: 'intimate',
      level: 'mild',
      question: 'What\'s something about me that you find irresistibly attractive?',
      followUp: ['When did you first notice this about me?', 'How does it make you feel when you see it?']
    },
    {
      id: 'intimate_2',
      category: 'intimate',
      level: 'spicy',
      question: 'If we were alone right now, what would be the first thing you\'d want to do?',
      followUp: ['How would you go about it?', 'What would you whisper in my ear?']
    },
    {
      id: 'intimate_3',
      category: 'intimate',
      level: 'hot',
      question: 'What\'s your biggest turn-on that you\'ve never told me about?',
      followUp: ['When did you discover this about yourself?', 'How can I help make that fantasy come true?']
    },
    {
      id: 'intimate_4',
      category: 'intimate',
      level: 'fire',
      question: 'Describe in detail what you want me to do to you right now...',
      followUp: ['How would that make you feel?', 'What would you do to me in return?']
    },

    // Fantasy Questions
    {
      id: 'fantasy_1',
      category: 'fantasy',
      level: 'mild',
      question: 'If we could spend a romantic evening anywhere in the world, where would it be?',
      followUp: ['What would we do there?', 'How would the night end?']
    },
    {
      id: 'fantasy_2',
      category: 'fantasy',
      level: 'spicy',
      question: 'What\'s a fantasy you\'ve had about us that you\'ve been too shy to share?',
      followUp: ['What made you think of that scenario?', 'Would you want to try it sometime?']
    },
    {
      id: 'fantasy_3',
      category: 'fantasy',
      level: 'hot',
      question: 'If you could roleplay any scenario with me, what would it be?',
      followUp: ['What role would you want me to play?', 'How would we set the scene?']
    },
    {
      id: 'fantasy_4',
      category: 'fantasy',
      level: 'fire',
      question: 'Tell me about your wildest sexual fantasy involving me...',
      followUp: ['What excites you most about that fantasy?', 'Should we make it a reality?']
    },

    // Desire Questions
    {
      id: 'desire_1',
      category: 'desire',
      level: 'mild',
      question: 'What\'s something I do that always catches your attention?',
      followUp: ['How does it make you feel?', 'Do you want me to do it more often?']
    },
    {
      id: 'desire_2',
      category: 'desire',
      level: 'spicy',
      question: 'When do you feel most attracted to me during the day?',
      followUp: ['What goes through your mind in those moments?', 'What do you want to do about it?']
    },
    {
      id: 'desire_3',
      category: 'desire',
      level: 'hot',
      question: 'What part of my body do you think about most when we\'re apart?',
      followUp: ['What do you imagine doing with that part?', 'How does thinking about it affect you?']
    },
    {
      id: 'desire_4',
      category: 'desire',
      level: 'fire',
      question: 'Right now, tell me exactly what you want me to do to satisfy your desires...',
      followUp: ['How badly do you want it?', 'What would you do to get it?']
    },

    // Sensual Questions
    {
      id: 'sensual_1',
      category: 'sensual',
      level: 'mild',
      question: 'What\'s your favorite way for me to touch you?',
      followUp: ['Where do you like to be touched most?', 'How should I touch you there?']
    },
    {
      id: 'sensual_2',
      category: 'sensual',
      level: 'spicy',
      question: 'If I blindfolded you, what would you want me to do first?',
      followUp: ['How would you want me to tease you?', 'What would drive you wild?']
    },
    {
      id: 'sensual_3',
      category: 'sensual',
      level: 'hot',
      question: 'What\'s the most erotic thing I could whisper in your ear right now?',
      followUp: ['How would you react if I said that?', 'What would you whisper back?']
    },
    {
      id: 'sensual_4',
      category: 'sensual',
      level: 'fire',
      question: 'Describe how you want me to pleasure you tonight...',
      followUp: ['How long do you want it to last?', 'What would make it perfect for you?']
    }
  ]

  const categories = [
    { id: 'intimate', name: 'Intimate Secrets', icon: Heart, color: 'pink' },
    { id: 'fantasy', name: 'Sexual Fantasies', icon: Sparkles, color: 'purple' },
    { id: 'desire', name: 'Hidden Desires', icon: Flame, color: 'red' },
    { id: 'sensual', name: 'Sensual Touch', icon: Eye, color: 'orange' }
  ]

  const levels = [
    { id: 'mild', name: 'Mild', emoji: '💕', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'spicy', name: 'Spicy', emoji: '🔥', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
    { id: 'hot', name: 'Hot', emoji: '🌶️', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
    { id: 'fire', name: 'Fire', emoji: '💥', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
  ]

  const generateQuestion = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const filteredQuestions = conversationStarters.filter(q => 
        q.category === selectedCategory && q.level === selectedLevel
      )
      const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setIsGenerating(false)
    }, 1000)
  }

  const getCategoryColor = (categoryId: string) => {
    const colors = {
      intimate: 'from-pink-500 to-rose-500',
      fantasy: 'from-purple-500 to-indigo-500',
      desire: 'from-red-500 to-pink-500',
      sensual: 'from-orange-500 to-red-500'
    }
    return colors[categoryId as keyof typeof colors] || 'from-pink-500 to-purple-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <MessageCircle className="w-12 h-12 text-pink-300" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent">
                Sexy Conversation Starters
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ignite passion with the perfect words. Get conversation starters that lead to unforgettable intimate moments.
            </p>
          </div>

          {/* Categories */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-pink-300" />
                Sex Talk Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${getCategoryColor(category.id)} border-white/30 shadow-lg scale-105`
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <IconComponent className="w-6 h-6 text-white" />
                        <span className="font-bold text-white text-sm text-center">{category.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Heat Level Selector */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-300" />
                Choose Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-6 py-3 rounded-full font-bold border transition-all duration-300 ${
                      selectedLevel === level.id
                        ? level.color + ' scale-110'
                        : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-2">{level.emoji}</span>
                    {level.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="text-center">
            <button 
              onClick={generateQuestion}
              disabled={isGenerating}
              className="px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 min-w-[300px]"
            >
              <div className="flex items-center justify-center gap-3">
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span>Getting Question...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-8 h-8" />
                    <span>Get Question</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Generated Question */}
          {currentQuestion && !isGenerating && (
            <Card variant="elegant" className="bg-gradient-to-br from-black/60 to-black/80 border-pink-500/30 shadow-2xl rounded-3xl backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mb-6">
                  <div className={`inline-flex px-6 py-3 rounded-full text-lg font-bold border ${
                    levels.find(l => l.id === currentQuestion.level)?.color
                  }`}>
                    <span className="mr-2">{levels.find(l => l.id === currentQuestion.level)?.emoji}</span>
                    {levels.find(l => l.id === currentQuestion.level)?.name} Level
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl text-white leading-tight mb-4">
                  What's a compliment I could give you that would make you blush?
                </CardTitle>
                <div className="text-3xl md:text-4xl text-white leading-relaxed font-medium">
                  "{currentQuestion.question}"
                </div>
              </CardHeader>
              
              {currentQuestion.followUp && (
                <CardContent className="space-y-6">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-purple-300" />
                      Follow-up Questions
                    </h4>
                    <div className="space-y-3">
                      {currentQuestion.followUp.map((followUp, index) => (
                        <div key={index} className="flex items-start gap-3 text-white/80">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-sm font-bold flex items-center justify-center mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-lg italic">"{followUp}"</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-300" />
                      Conversation Guidelines
                    </h4>
                    <div className="space-y-2 text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
                        <span>Make eye contact and speak in a soft, intimate tone</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
                        <span>Listen actively to their response and ask follow-ups</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
                        <span>Create a comfortable, judgment-free environment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
                        <span>Share your own thoughts and feelings in return</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default SeductiveConversation
