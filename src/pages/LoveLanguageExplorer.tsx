import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Clock, Users, Star, ChevronRight, BookOpen, Target, Gift } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { loveLanguageDescriptions, getActivitiesByLoveLanguage, loveLanguageActivities } from "@/data/loveLanguages"
import type { LoveLanguageType, LoveLanguageActivity } from "@/types"

const LoveLanguageExplorer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LoveLanguageType | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<LoveLanguageActivity | null>(null)

  const loveLanguageTypes: LoveLanguageType[] = [
    'words_of_affirmation',
    'physical_touch', 
    'acts_of_service',
    'quality_time',
    'receiving_gifts'
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const getLanguageStats = (type: LoveLanguageType) => {
    const activities = getActivitiesByLoveLanguage(type)
    const beginnerCount = activities.filter(a => a.difficulty === 'beginner').length
    const intermediateCount = activities.filter(a => a.difficulty === 'intermediate').length
    const advancedCount = activities.filter(a => a.difficulty === 'advanced').length
    
    return {
      total: activities.length,
      beginner: beginnerCount,
      intermediate: intermediateCount,
      advanced: advancedCount
    }
  }

  if (selectedActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <button 
                onClick={() => setSelectedActivity(null)}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4"
                data-testid="button-back-to-explorer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Explorer
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{loveLanguageDescriptions[selectedActivity.type].icon}</span>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-activity-title">
                    {selectedActivity.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {loveLanguageDescriptions[selectedActivity.type].title}
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Details */}
            <Card variant="elegant" className="mb-8">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={getDifficultyColor(selectedActivity.difficulty)} data-testid={`badge-difficulty-${selectedActivity.difficulty}`}>
                    {selectedActivity.difficulty}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1" data-testid="badge-duration">
                    <Clock className="w-3 h-3" />
                    {selectedActivity.duration}
                  </Badge>
                </div>
                <CardTitle className="text-xl" data-testid="text-activity-description">
                  {selectedActivity.description}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Instructions
                  </h3>
                  <ol className="space-y-2">
                    {selectedActivity.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3" data-testid={`instruction-${index}`}>
                        <span className="bg-romantic text-romantic-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Materials */}
                {selectedActivity.materials && selectedActivity.materials.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Materials Needed
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedActivity.materials.map((material, index) => (
                        <li key={index} className="flex items-center gap-2" data-testid={`material-${index}`}>
                          <div className="w-2 h-2 bg-romantic rounded-full"></div>
                          <span className="text-muted-foreground">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Try Activity Button */}
                <div className="pt-4 border-t">
                  <Button variant="romantic" size="lg" className="w-full" data-testid="button-try-activity">
                    <Heart className="w-5 h-5 mr-2" />
                    Try This Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (selectedLanguage) {
    const languageData = loveLanguageDescriptions[selectedLanguage]
    const activities = getActivitiesByLoveLanguage(selectedLanguage)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <button 
                onClick={() => setSelectedLanguage(null)}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4"
                data-testid="button-back-to-languages"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Love Languages
              </button>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-6xl">{languageData.icon}</span>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent" data-testid="text-language-title">
                      {languageData.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2 max-w-2xl">
                      {languageData.description}
                    </p>
                  </div>
                </div>
                
                <blockquote className="text-lg italic text-muted-foreground border-l-4 border-romantic pl-4 max-w-md mx-auto" data-testid="text-language-quote">
                  "{languageData.quote}"
                </blockquote>
              </div>
            </div>

            {/* Activities Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-center">Activities for {languageData.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <Card 
                    key={activity.id} 
                    variant="elegant" 
                    className="hover-romantic group cursor-pointer"
                    onClick={() => setSelectedActivity(activity)}
                    data-testid={`card-activity-${activity.id}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(activity.difficulty)} data-testid={`badge-${activity.id}-difficulty`}>
                          {activity.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1" data-testid={`badge-${activity.id}-duration`}>
                          <Clock className="w-3 h-3" />
                          {activity.duration}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-lg group-hover:text-romantic transition-colors" data-testid={`text-${activity.id}-title`}>
                        {activity.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4" data-testid={`text-${activity.id}-description`}>
                        {activity.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {activity.instructions.length} steps
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-romantic transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Stats */}
            <div className="mt-12 text-center">
              <Card variant="elegant" className="inline-block">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-romantic" data-testid="text-total-activities">
                        {activities.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Activities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">
                        {activities.filter(a => a.difficulty === 'beginner').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Beginner</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">
                        {activities.filter(a => a.difficulty === 'intermediate').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Intermediate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">
                        {activities.filter(a => a.difficulty === 'advanced').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Advanced</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-12 h-12 text-romantic" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Love Languages
              </h1>
              <BookOpen className="w-12 h-12 text-passionate" />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the five love languages and learn how to express and receive love in ways that truly resonate with you and your partner
            </p>
            
            <Link to="/games/love-quiz">
              <Button variant="romantic" size="lg" className="mr-4" data-testid="button-take-quiz">
                <Target className="w-5 h-5 mr-2" />
                Take the Love Language Quiz
              </Button>
            </Link>
          </div>
        </section>

        {/* Love Languages Grid */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Explore the 5 Love Languages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loveLanguageTypes.map((languageType) => {
                const languageData = loveLanguageDescriptions[languageType]
                const stats = getLanguageStats(languageType)
                
                return (
                  <Card 
                    key={languageType} 
                    variant="elegant" 
                    className="hover-romantic group cursor-pointer"
                    onClick={() => setSelectedLanguage(languageType)}
                    data-testid={`card-language-${languageType}`}
                  >
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-romantic/10 rounded-full flex items-center justify-center group-hover:bg-romantic/20 transition-colors">
                        <span className="text-4xl">{languageData.icon}</span>
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-romantic transition-colors" data-testid={`text-${languageType}-title`}>
                        {languageData.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-4" data-testid={`text-${languageType}-description`}>
                        {languageData.description}
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <Badge variant="outline" className="flex items-center gap-1" data-testid={`badge-${languageType}-activities`}>
                          <BookOpen className="w-3 h-3" />
                          {stats.total} Activities
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{stats.beginner} Beginner</span>
                        <span>{stats.intermediate} Intermediate</span>
                        <span>{stats.advanced} Advanced</span>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-center text-romantic">
                        <span className="text-sm font-medium">Explore Activities</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Overview Stats */}
        <section className="py-12 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Complete Love Language Library</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-romantic mb-2" data-testid="text-total-love-activities">
                  {loveLanguageActivities.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Activities</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-passionate mb-2">
                  5
                </div>
                <div className="text-sm text-muted-foreground">Love Languages</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-sensual mb-2">
                  {loveLanguageActivities.filter(a => a.difficulty === 'beginner').length}
                </div>
                <div className="text-sm text-muted-foreground">Beginner Friendly</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-warm mb-2">
                  {new Set(loveLanguageActivities.map(a => a.duration)).size}
                </div>
                <div className="text-sm text-muted-foreground">Duration Options</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LoveLanguageExplorer