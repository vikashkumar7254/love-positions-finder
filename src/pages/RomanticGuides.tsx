import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Clock, Star, BookOpen, ChevronRight, CheckCircle, Users, Lightbulb } from "lucide-react"
import Navigation from "@/components/Navigation"
import { romanticGuides, guideCategories, getGuidesByCategory, getFeaturedGuides, getGuideById, type RomanticGuideCategory, type RomanticGuide } from "@/data/romanticGuides"

const RomanticGuides = () => {
  const [selectedCategory, setSelectedCategory] = useState<RomanticGuideCategory | null>(null)
  const [selectedGuide, setSelectedGuide] = useState<RomanticGuide | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  // Individual Guide View
  if (selectedGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <button 
                onClick={() => setSelectedGuide(null)}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4"
                data-testid="button-back-to-guides"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Guides
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedGuide.icon}</span>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-guide-title">
                    {selectedGuide.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {selectedGuide.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={getDifficultyColor(selectedGuide.difficulty)} data-testid={`badge-difficulty-${selectedGuide.difficulty}`}>
                  {selectedGuide.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1" data-testid="badge-duration">
                  <Clock className="w-3 h-3" />
                  {selectedGuide.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {guideCategories[selectedGuide.category].title}
                </Badge>
              </div>
            </div>

            {/* Materials if present */}
            {selectedGuide.materials && selectedGuide.materials.length > 0 && (
              <Card variant="elegant" className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-romantic" />
                    Materials Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedGuide.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2" data-testid={`material-${index}`}>
                        <div className="w-2 h-2 bg-romantic rounded-full"></div>
                        <span className="text-muted-foreground">{material}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guide Sections */}
            <div className="space-y-6">
              {selectedGuide.sections.map((section, index) => (
                <Card key={section.id} variant="elegant" className="overflow-hidden">
                  <CardHeader className="cursor-pointer" onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}>
                    <CardTitle className="text-xl flex items-center justify-between group" data-testid={`section-${section.id}-title`}>
                      <span className="flex items-center gap-3">
                        <span className="bg-romantic text-romantic-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        {section.title}
                      </span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`} />
                    </CardTitle>
                  </CardHeader>
                  
                  {activeSection === section.id && (
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed" data-testid={`section-${section.id}-content`}>
                        {section.content}
                      </p>
                      
                      {/* Steps */}
                      {section.steps && section.steps.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 text-foreground">Steps to Follow:</h4>
                          <ol className="space-y-2">
                            {section.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-3" data-testid={`step-${stepIndex}`}>
                                <span className="bg-sensual text-sensual-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                                  {stepIndex + 1}
                                </span>
                                <span className="text-muted-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      
                      {/* Examples */}
                      {section.examples && section.examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 text-foreground">Examples & Ideas:</h4>
                          <ul className="space-y-2">
                            {section.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex} className="flex items-start gap-3" data-testid={`example-${exampleIndex}`}>
                                <Star className="w-4 h-4 text-passionate mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Tips Section */}
            {selectedGuide.tips && selectedGuide.tips.length > 0 && (
              <Card variant="elegant" className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warm" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedGuide.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3" data-testid={`tip-${index}`}>
                        <div className="w-2 h-2 bg-warm rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Action Button */}
            <div className="mt-8 text-center">
              <Button variant="romantic" size="lg" data-testid="button-start-guide">
                <Heart className="w-5 h-5 mr-2" />
                Start This Guide
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Category View
  if (selectedCategory) {
    const categoryData = guideCategories[selectedCategory]
    const categoryGuides = getGuidesByCategory(selectedCategory)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic mb-4"
                data-testid="button-back-to-categories"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Categories
              </button>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-6xl">{categoryData.icon}</span>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-category-title">
                      {categoryData.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2">
                      {categoryData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guides Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-center">Available Guides</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGuides.map((guide) => (
                  <Card 
                    key={guide.id} 
                    variant="elegant" 
                    className="hover-romantic group cursor-pointer"
                    onClick={() => setSelectedGuide(guide)}
                    data-testid={`card-guide-${guide.id}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(guide.difficulty)} data-testid={`badge-${guide.id}-difficulty`}>
                          {guide.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1" data-testid={`badge-${guide.id}-duration`}>
                          <Clock className="w-3 h-3" />
                          {guide.duration}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{guide.icon}</span>
                        <CardTitle className="text-lg group-hover:text-romantic transition-colors" data-testid={`text-${guide.id}-title`}>
                          {guide.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4" data-testid={`text-${guide.id}-description`}>
                        {guide.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {guide.sections.length} sections
                        </span>
                        {guide.featured && (
                          <Badge variant="outline" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  }

  // Main Overview
  const featuredGuides = getFeaturedGuides()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-12 h-12 text-romantic" />
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Romantic Guides
              </h1>
              <BookOpen className="w-12 h-12 text-passionate" />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive guides to deepen your connection, enhance intimacy, and create lasting romance in your relationship
            </p>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Guides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {featuredGuides.map((guide) => (
                <Card 
                  key={guide.id} 
                  variant="elegant" 
                  className="hover-romantic group cursor-pointer"
                  onClick={() => setSelectedGuide(guide)}
                  data-testid={`card-featured-${guide.id}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(guide.difficulty)}>
                        {guide.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{guide.icon}</span>
                      <CardTitle className="text-lg group-hover:text-romantic transition-colors">
                        {guide.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {guide.duration}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {guide.sections.length} sections
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guide Categories */}
        <section className="py-12 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Explore by Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(guideCategories).map(([categoryKey, categoryData]) => {
                const categoryGuides = getGuidesByCategory(categoryKey as RomanticGuideCategory)
                
                return (
                  <Card 
                    key={categoryKey} 
                    variant="elegant" 
                    className="hover-romantic group cursor-pointer"
                    onClick={() => setSelectedCategory(categoryKey as RomanticGuideCategory)}
                    data-testid={`card-category-${categoryKey}`}
                  >
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-romantic/10 rounded-full flex items-center justify-center group-hover:bg-romantic/20 transition-colors">
                        <span className="text-4xl">{categoryData.icon}</span>
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-romantic transition-colors" data-testid={`text-${categoryKey}-title`}>
                        {categoryData.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-4" data-testid={`text-${categoryKey}-description`}>
                        {categoryData.description}
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <Badge variant="outline" className="flex items-center gap-1" data-testid={`badge-${categoryKey}-guides`}>
                          <BookOpen className="w-3 h-3" />
                          {categoryGuides.length} Guides
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-center text-romantic">
                        <span className="text-sm font-medium">Explore Category</span>
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
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Complete Romance Library</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-romantic mb-2" data-testid="text-total-guides">
                  {romanticGuides.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Guides</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-passionate mb-2">
                  {Object.keys(guideCategories).length}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-sensual mb-2">
                  {featuredGuides.length}
                </div>
                <div className="text-sm text-muted-foreground">Featured Guides</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-warm mb-2">
                  {romanticGuides.reduce((acc, guide) => acc + guide.sections.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Sections</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RomanticGuides