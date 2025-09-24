import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { MapPin, Heart, Video, MessageCircle, ArrowLeft, Clock, Star, RefreshCw } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { longDistanceActivities, getRandomLongDistanceActivity } from "@/data/games"
import type { LongDistanceActivity } from "@/types"

const LongDistance = () => {
  const [selectedActivity, setSelectedActivity] = useState<LongDistanceActivity | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const getRandomActivity = () => {
    const activity = getRandomLongDistanceActivity()
    setSelectedActivity(activity)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (selectedActivity && currentStep < selectedActivity.instructions.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video_call': return Video
      case 'messaging': return MessageCircle
      case 'surprise': return Star
      case 'planning': return MapPin
      default: return Heart
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video_call': return 'bg-blue-100 text-blue-800'
      case 'messaging': return 'bg-green-100 text-green-800'
      case 'surprise': return 'bg-purple-100 text-purple-800'
      case 'planning': return 'bg-orange-100 text-orange-800'
      default: return 'bg-pink-100 text-pink-800'
    }
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
              <MapPin className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Long Distance Love
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Special activities designed for couples in long-distance relationships to stay connected and intimate
            </p>
          </div>

          {!selectedActivity ? (
            <>
              {/* Activity Selection */}
              <div className="text-center mb-8">
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={getRandomActivity}
                  className="min-w-[250px]"
                  data-testid="button-get-activity"
                >
                  <Heart className="w-6 h-6" />
                  Get Random Activity
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Or choose from the activities below
                </p>
              </div>

              {/* All Activities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {longDistanceActivities.map((activity) => {
                  const IconComponent = getTypeIcon(activity.type)
                  
                  return (
                    <Card 
                      key={activity.id} 
                      variant="elegant" 
                      className="hover-romantic group cursor-pointer"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-romantic/20 rounded-lg flex items-center justify-center group-hover:bg-romantic/30 transition-colors">
                            <IconComponent className="w-5 h-5 text-romantic" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-romantic">{activity.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded text-xs ${getTypeColor(activity.type)}`}>
                                {activity.type.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {activity.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-3">{activity.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Requirements:</span> {activity.requirements.join(', ')}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              {/* Selected Activity */}
              <Card variant="romantic" className="mb-6">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {React.createElement(getTypeIcon(selectedActivity.type), { 
                      className: "w-8 h-8 text-romantic" 
                    })}
                    <div>
                      <CardTitle className="text-2xl">{selectedActivity.title}</CardTitle>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className={`px-3 py-1 rounded ${getTypeColor(selectedActivity.type)}`}>
                          {selectedActivity.type.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedActivity.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{selectedActivity.description}</p>
                </CardHeader>
              </Card>

              {/* Requirements */}
              <Card variant="elegant" className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">What You'll Need</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedActivity.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Step-by-Step Instructions */}
              <Card variant="elegant" className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Step {currentStep + 1} of {selectedActivity.instructions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-lg font-medium mb-4">
                      {selectedActivity.instructions[currentStep]}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-romantic h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / selectedActivity.instructions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      data-testid="button-prev-step"
                    >
                      Previous
                    </Button>
                    
                    {currentStep < selectedActivity.instructions.length - 1 ? (
                      <Button 
                        variant="romantic" 
                        onClick={nextStep}
                        data-testid="button-next-step"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        variant="passionate" 
                        onClick={() => setSelectedActivity(null)}
                        data-testid="button-complete"
                      >
                        Complete!
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="text-center space-y-3">
                <div className="flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedActivity(null)}
                    data-testid="button-choose-different"
                  >
                    Choose Different Activity
                  </Button>
                  <Button 
                    variant="tender" 
                    onClick={getRandomActivity}
                    data-testid="button-random-activity"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Random Activity
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Difficulty: {selectedActivity.difficulty} • Type: {selectedActivity.type.replace('_', ' ')}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default LongDistance