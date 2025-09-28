import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { MapPin, Heart, Video, MessageCircle, ArrowLeft, Clock, Star, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { longDistanceActivities, getRandomLongDistanceActivity } from "@/data/games"
import type { LongDistanceActivity } from "@/types"

const LongDistance = () => {
  const [selectedActivity, setSelectedActivity] = useState<LongDistanceActivity | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState<string>("Most Popular")

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

  const topicPills = [
    "Most Popular","Romance","Intimacy","Connection","Video Ideas","Messaging","Surprise","Planning"
  ]

  const getContentForTopic = (topic: string) => {
    switch (topic) {
      case "Most Popular":
        return {
          section1: {
            title: "Virtual Date Night Ideas",
            icon: Video,
            columns: [
              {
                title: "Romantic Virtual Dates",
                items: ["Watch movies together online", "Virtual cooking date night", "Online game night", "Virtual tasting sessions"]
              },
              {
                title: "Intimate Activities", 
                items: ["Private video chat dates", "Virtual massage guidance", "Online couples yoga", "Intimate story sharing"]
              },
              {
                title: "Creative Connection",
                items: ["Digital art creation together", "Virtual museum tours", "Online dance lessons", "Music sharing sessions"]
              }
            ]
          },
          section2: {
            title: "Long Distance Intimacy Guide",
            icon: Heart,
            columns: [
              {
                title: "Virtual Intimacy Tips",
                items: ["Use secure video platforms", "Share caring voice notes", "Exchange photos safely and respectfully", "Talk about boundaries and comfort levels"]
              },
              {
                title: "Phone Romance Ideas",
                items: ["Late-night heartfelt conversations", "Describe cozy plans you'd love to do together", "Share fantasies at a comfortable level", "Read romantic stories to each other"]
              }
            ]
          }
        }
      case "Romance":
        return {
          section1: {
            title: "Romantic Connection Ideas",
            icon: Heart,
            columns: [
              {
                title: "Sweet Gestures",
                items: ["Send surprise love letters", "Create digital photo albums", "Plan virtual surprise dates", "Record romantic voice messages"]
              },
              {
                title: "Romantic Activities",
                items: ["Virtual candlelit dinners", "Share sunset/sunrise photos", "Read poetry to each other", "Create couple playlists"]
              },
              {
                title: "Love Languages",
                items: ["Send thoughtful texts daily", "Virtual gift giving", "Plan future trips together", "Share daily highlights"]
              }
            ]
          },
          section2: {
            title: "Building Romance Remotely",
            icon: Star,
            columns: [
              {
                title: "Daily Romance",
                items: ["Good morning/night messages", "Share what reminds you of them", "Send random compliments", "Plan weekly date nights"]
              },
              {
                title: "Special Occasions",
                items: ["Celebrate anniversaries virtually", "Send surprise deliveries", "Create digital scrapbooks", "Plan reunion surprises"]
              }
            ]
          }
        }
      case "Intimacy":
        return {
          section1: {
            title: "Building Intimate Connection",
            icon: Heart,
            columns: [
              {
                title: "Emotional Intimacy",
                items: ["Share deepest thoughts", "Discuss future dreams", "Be vulnerable together", "Practice active listening"]
              },
              {
                title: "Physical Connection",
                items: ["Virtual massage sessions", "Synchronized breathing exercises", "Share physical sensations", "Practice mindful touching"]
              },
              {
                title: "Mental Connection",
                items: ["Read books together", "Discuss personal growth", "Share learning experiences", "Practice meditation together"]
              }
            ]
          },
          section2: {
            title: "Intimate Communication",
            icon: MessageCircle,
            columns: [
              {
                title: "Deep Conversations",
                items: ["Share childhood memories", "Discuss fears and hopes", "Talk about desires", "Express gratitude daily"]
              },
              {
                title: "Safe Intimacy",
                items: ["Establish boundaries clearly", "Practice consent always", "Respect comfort levels", "Communicate needs openly"]
              }
            ]
          }
        }
      case "Connection":
        return {
          section1: {
            title: "Staying Connected Daily",
            icon: Heart,
            columns: [
              {
                title: "Daily Rituals",
                items: ["Morning check-ins", "Bedtime stories", "Meal sharing via video", "End-of-day summaries"]
              },
              {
                title: "Shared Experiences",
                items: ["Watch shows together", "Play online games", "Take virtual tours", "Learn new skills together"]
              },
              {
                title: "Communication Tools",
                items: ["Use couple apps", "Send voice notes", "Share location updates", "Create shared calendars"]
              }
            ]
          },
          section2: {
            title: "Maintaining Strong Bonds",
            icon: Star,
            columns: [
              {
                title: "Trust Building",
                items: ["Be consistently reliable", "Share daily activities", "Introduce to friends/family", "Be transparent always"]
              },
              {
                title: "Future Planning",
                items: ["Discuss reunion plans", "Set relationship goals", "Plan visits together", "Talk about long-term future"]
              }
            ]
          }
        }
      case "Video Ideas":
        return {
          section1: {
            title: "Creative Video Date Ideas",
            icon: Video,
            columns: [
              {
                title: "Entertainment Together",
                items: ["Netflix party sessions", "YouTube video reactions", "Virtual karaoke nights", "Online gaming streams"]
              },
              {
                title: "Learning Together",
                items: ["Online course watching", "Tutorial following", "Documentary discussions", "TED talk sharing"]
              },
              {
                title: "Creative Projects",
                items: ["Digital art creation", "Video editing together", "Photo slideshow making", "Virtual room tours"]
              }
            ]
          },
          section2: {
            title: "Video Call Activities",
            icon: Star,
            columns: [
              {
                title: "Interactive Fun",
                items: ["Virtual escape rooms", "Online trivia games", "Charades via video", "Show and tell sessions"]
              },
              {
                title: "Intimate Moments",
                items: ["Candlelit video dinners", "Bedtime story reading", "Morning coffee dates", "Sunset watching together"]
              }
            ]
          }
        }
      case "Messaging":
        return {
          section1: {
            title: "Messaging & Communication",
            icon: MessageCircle,
            columns: [
              {
                title: "Daily Messaging",
                items: ["Good morning texts", "Random love notes", "Photo sharing", "Voice message exchanges"]
              },
              {
                title: "Creative Messages",
                items: ["Send song lyrics", "Write digital poems", "Share memes together", "Create inside jokes"]
              },
              {
                title: "Meaningful Conversations",
                items: ["Deep question exchanges", "Dream sharing", "Goal discussions", "Memory lane talks"]
              }
            ]
          },
          section2: {
            title: "Communication Tips",
            icon: Heart,
            columns: [
              {
                title: "Effective Messaging",
                items: ["Be clear and honest", "Use emojis expressively", "Send timely responses", "Share daily highlights"]
              },
              {
                title: "Avoiding Miscommunication",
                items: ["Clarify unclear messages", "Use video for serious talks", "Be patient with responses", "Express emotions clearly"]
              }
            ]
          }
        }
      case "Surprise":
        return {
          section1: {
            title: "Surprise Ideas for Long Distance",
            icon: Star,
            columns: [
              {
                title: "Digital Surprises",
                items: ["Surprise video calls", "Unexpected deliveries", "Digital gift cards", "Custom playlist creation"]
              },
              {
                title: "Creative Surprises",
                items: ["Handwritten letter scans", "Surprise photo albums", "Custom video messages", "Virtual surprise parties"]
              },
              {
                title: "Thoughtful Gestures",
                items: ["Order their favorite food", "Send care packages", "Surprise social media posts", "Plan surprise visits"]
              }
            ]
          },
          section2: {
            title: "Planning Perfect Surprises",
            icon: Heart,
            columns: [
              {
                title: "Surprise Planning",
                items: ["Know their schedule", "Coordinate with friends", "Plan timing carefully", "Keep it personal"]
              },
              {
                title: "Execution Tips",
                items: ["Build anticipation", "Document reactions", "Make it memorable", "Follow up with love"]
              }
            ]
          }
        }
      case "Planning":
        return {
          section1: {
            title: "Relationship Planning & Goals",
            icon: MapPin,
            columns: [
              {
                title: "Visit Planning",
                items: ["Schedule regular visits", "Plan activities together", "Budget for travel", "Coordinate time zones"]
              },
              {
                title: "Future Planning",
                items: ["Discuss closing distance", "Set relationship milestones", "Plan career moves", "Discuss living arrangements"]
              },
              {
                title: "Daily Planning",
                items: ["Sync calendars", "Plan virtual dates", "Set communication schedules", "Plan shared activities"]
              }
            ]
          },
          section2: {
            title: "Long-term Relationship Success",
            icon: Heart,
            columns: [
              {
                title: "Goal Setting",
                items: ["Set reunion timelines", "Plan relationship growth", "Discuss expectations", "Create action plans"]
              },
              {
                title: "Staying Motivated",
                items: ["Celebrate small wins", "Track progress together", "Support each other's goals", "Maintain optimism"]
              }
            ]
          }
        }
      default:
        return getContentForTopic("Most Popular")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300" />
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent text-center">
                Long Distance Relationship Guide
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              Special activities designed for couples in long-distance relationships to stay connected and intimate
            </p>

            {/* Topics bar */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2">
              {topicPills.map(p => (
                <button 
                  key={p} 
                  onClick={() => setSelectedTopic(p)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border transition-all duration-300 ${
                    selectedTopic === p 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-white/30 shadow-lg scale-105' 
                      : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border-white/20 hover:border-white/40 hover:scale-105'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {(() => {
            const content = getContentForTopic(selectedTopic)
            const Section1Icon = content.section1.icon
            const Section2Icon = content.section2.icon
            
            return (
              <>
                {/* First Section */}
                <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                      <Section1Icon className="w-5 h-5 text-pink-300" />
                      {content.section1.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`grid grid-cols-1 ${content.section1.columns.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} gap-4 sm:gap-6`}>
                      {content.section1.columns.map((column, index) => (
                        <div key={index} className="space-y-3">
                          <h4 className="font-semibold text-white mb-2 text-sm sm:text-base break-words">{column.title}</h4>
                          <div className="space-y-2 text-white/70 text-xs sm:text-sm">
                            {column.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                  itemIndex % 4 === 0 ? 'bg-pink-300' :
                                  itemIndex % 4 === 1 ? 'bg-purple-300' :
                                  itemIndex % 4 === 2 ? 'bg-red-300' : 'bg-pink-400'
                                }`}></span>
                                <span className="leading-relaxed break-words hyphens-auto">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Second Section */}
                <Card variant="elegant" className="bg-black/20 border-purple-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                      <Section2Icon className="w-5 h-5 text-purple-300" />
                      {content.section2.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      {content.section2.columns.map((column, index) => (
                        <div key={index}>
                          <div className="font-bold text-white mb-3 flex items-center gap-2 text-sm sm:text-base break-words">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${index === 0 ? 'bg-pink-400' : 'bg-purple-400'}`}></span>
                            <span className="break-words">{column.title}</span>
                          </div>
                          <div className="space-y-2 text-white/70 text-xs sm:text-sm">
                            {column.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                  itemIndex % 4 === 0 ? 'bg-pink-300' :
                                  itemIndex % 4 === 1 ? 'bg-purple-300' :
                                  itemIndex % 4 === 2 ? 'bg-red-300' : 'bg-pink-400'
                                }`}></span>
                                <span className="leading-relaxed break-words hyphens-auto">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )
          })()}

          {!selectedActivity ? (
            <>
              {/* Activity Selection - Hidden on mobile */}
              <div className="text-center mb-8 hidden sm:block">
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

              {/* All Activities - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-6">
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