import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Sparkles, RefreshCw, Heart, Users, MapPin, Clock, Flame, Star, Wand2 } from "lucide-react"

interface RoleplayScenario {
  id: string
  title: string
  description: string
  characters: string[]
  setting: string
  props: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  spicyLevel: 1 | 2 | 3 | 4 | 5
  setupInstructions: string[]
  characterGuides: {
    character: string
    personality: string
    dialogue: string[]
    actions: string[]
  }[]
  scenarioFlow: {
    phase: string
    description: string
    duration: string
    actions: string[]
  }[]
}

interface RoleplayCategory {
  name: string
  scenarios: RoleplayScenario[]
}

const FantasyRoleplay = () => {
  const [currentScenario, setCurrentScenario] = useState<RoleplayScenario | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('classic')
  const [isGenerating, setIsGenerating] = useState(false)

  const roleplayCategories: Record<string, RoleplayCategory> = {
    classic: {
      name: 'Classic Fantasies',
      scenarios: [
        {
          id: 'teacher_student',
          title: 'Naughty Professor',
          description: 'A private tutoring session that becomes very educational',
          characters: ['Strict Professor', 'Eager Student'],
          setting: 'Private Study Room',
          props: ['Books', 'Desk', 'Reading Glasses'],
          difficulty: 'Beginner' as const,
          duration: '30-45 minutes',
          spicyLevel: 3 as const,
          setupInstructions: [
            'Set up a desk with books and papers scattered around',
            'Professor should wear professional attire with glasses',
            'Student should dress in casual/school-appropriate clothing',
            'Dim the lights to create intimate study atmosphere'
          ],
          characterGuides: [
            {
              character: 'Strict Professor',
              personality: 'Authoritative, intelligent, secretly desires the student',
              dialogue: [
                '"You\'ve been struggling with this subject, haven\'t you?"',
                '"I think you need some... special attention"',
                '"Let me show you a more hands-on approach"'
              ],
              actions: [
                'Lean over student\'s shoulder while explaining',
                'Gently touch student\'s hand while guiding',
                'Remove glasses slowly and seductively'
              ]
            },
            {
              character: 'Eager Student',
              personality: 'Curious, slightly nervous, attracted to authority',
              dialogue: [
                '"I really want to improve my grades, Professor"',
                '"Could you teach me... everything?"',
                '"I\'ll do anything to pass this class"'
              ],
              actions: [
                'Bite lip nervously while listening',
                'Lean closer to professor during explanation',
                'Drop pencil and bend to pick it up seductively'
              ]
            }
          ],
          scenarioFlow: [
            {
              phase: 'Setup & Introduction',
              description: 'Professor calls student for private tutoring session',
              duration: '5-10 minutes',
              actions: [
                'Professor explains the student\'s poor performance',
                'Student shows eagerness to improve',
                'Tension builds as they sit close together'
              ]
            },
            {
              phase: 'Building Tension',
              description: 'Study session becomes increasingly intimate',
              duration: '10-15 minutes',
              actions: [
                'Professor leans closer to help with problems',
                'Accidental touches become more frequent',
                'Student compliments professor\'s teaching methods'
              ]
            },
            {
              phase: 'The Lesson Intensifies',
              description: 'Academic lesson turns into intimate education',
              duration: '15-20 minutes',
              actions: [
                'Professor suggests "hands-on" learning',
                'Student eagerly agrees to extra credit',
                'Both give in to their desires'
              ]
            }
          ]
        },
        {
          id: 'boss_secretary',
          title: 'After Hours Meeting',
          description: 'Working late leads to overtime activities',
          characters: ['Demanding Boss', 'Dedicated Assistant'],
          setting: 'Corporate Office',
          props: ['Desk', 'Office Chair', 'Documents'],
          difficulty: 'Intermediate' as const,
          duration: '45-60 minutes',
          spicyLevel: 4 as const,
          setupInstructions: [
            'Set up office environment with desk and chair',
            'Boss should wear business attire (suit/blazer)',
            'Assistant should dress professionally but attractively',
            'Scatter some documents and files around',
            'Dim office lights for after-hours atmosphere'
          ],
          characterGuides: [
            {
              character: 'Demanding Boss',
              personality: 'Authoritative, stressed, secretly attracted to assistant',
              dialogue: [
                '"We need to finish this project tonight"',
                '"You\'ve been working so hard lately..."',
                '"I think you deserve a special bonus"'
              ],
              actions: [
                'Stand close while reviewing documents',
                'Place hand on assistant\'s shoulder',
                'Loosen tie and unbutton shirt slowly'
              ]
            },
            {
              character: 'Dedicated Assistant',
              personality: 'Professional, eager to please, harbors secret crush',
              dialogue: [
                '"I\'ll do whatever it takes to get this done"',
                '"Is there anything else you need from me?"',
                '"I\'ve always admired your... leadership style"'
              ],
              actions: [
                'Lean over desk while pointing at documents',
                'Accidentally brush against boss while reaching',
                'Remove blazer due to "heat" in the office'
              ]
            }
          ],
          scenarioFlow: [
            {
              phase: 'Late Night Work Session',
              description: 'Boss asks assistant to stay late for urgent project',
              duration: '10-15 minutes',
              actions: [
                'Boss explains the urgent deadline',
                'Assistant agrees to stay and help',
                'Both work closely together on documents'
              ]
            },
            {
              phase: 'Growing Tension',
              description: 'Professional boundaries start to blur',
              duration: '15-20 minutes',
              actions: [
                'Accidental touches become more frequent',
                'Boss compliments assistant\'s dedication',
                'Assistant reveals admiration for boss'
              ]
            },
            {
              phase: 'After Hours Intimacy',
              description: 'Work session becomes intimate encounter',
              duration: '20-25 minutes',
              actions: [
                'Boss suggests "alternative compensation"',
                'Assistant eagerly accepts the proposal',
                'Office desk becomes the center of attention'
              ]
            }
          ]
        }
      ]
    },
    adventure: {
      name: 'Adventure & Fantasy',
      scenarios: [
        {
          id: 'pirate_captive',
          title: 'Pirate\'s Treasure',
          description: 'A captured treasure hunter meets a seductive pirate captain',
          characters: ['Pirate Captain', 'Treasure Hunter'],
          setting: 'Pirate Ship Cabin',
          props: ['Rope', 'Treasure Map', 'Pirate Hat'],
          difficulty: 'Advanced' as const,
          duration: '60+ minutes',
          spicyLevel: 5 as const,
          setupInstructions: [
            'Create pirate ship atmosphere with dim lighting',
            'Captain should wear pirate costume with hat',
            'Hunter should look disheveled from capture',
            'Place treasure map and rope prominently',
            'Add nautical props if available'
          ],
          characterGuides: [
            {
              character: 'Pirate Captain',
              personality: 'Commanding, dangerous, seductively ruthless',
              dialogue: [
                '"Well, well... what treasure have we caught?"',
                '"You can earn your freedom... if you please me"',
                '"I always get what I want, one way or another"'
              ],
              actions: [
                'Circle around the captive slowly',
                'Use rope to gently restrain',
                'Lean in close while speaking'
              ]
            },
            {
              character: 'Treasure Hunter',
              personality: 'Defiant but secretly attracted, adventurous spirit',
              dialogue: [
                '"I\'ll never tell you where the treasure is!"',
                '"What do you want from me, Captain?"',
                '"Maybe we can... negotiate"'
              ],
              actions: [
                'Struggle against restraints initially',
                'Show gradual submission to captain\'s charm',
                'Reveal hidden attraction through body language'
              ]
            }
          ],
          scenarioFlow: [
            {
              phase: 'The Capture',
              description: 'Treasure hunter is brought before the captain',
              duration: '15-20 minutes',
              actions: [
                'Captain interrogates the prisoner',
                'Hunter refuses to cooperate initially',
                'Sexual tension builds through power play'
              ]
            },
            {
              phase: 'Negotiation',
              description: 'Captain offers alternative to punishment',
              duration: '20-25 minutes',
              actions: [
                'Captain suggests "other ways" to pay',
                'Hunter realizes the captain\'s true intentions',
                'Both begin to give in to attraction'
              ]
            },
            {
              phase: 'Claiming the Prize',
              description: 'Captain claims their real treasure',
              duration: '25-30 minutes',
              actions: [
                'Restraints become part of the play',
                'Hunter surrenders to the captain\'s desires',
                'Both discover the real treasure was each other'
              ]
            }
          ]
        }
      ]
    },
    modern: {
      name: 'Modern Scenarios',
      scenarios: [
        {
          id: 'delivery_surprise',
          title: 'Special Delivery',
          description: 'A delivery person brings more than just a package',
          characters: ['Delivery Person', 'Lonely Recipient'],
          setting: 'Apartment Doorway',
          props: ['Package', 'Uniform', 'Clipboard'],
          difficulty: 'Beginner' as const,
          duration: '20-30 minutes',
          spicyLevel: 2 as const,
          setupInstructions: [
            'Set up apartment entrance/doorway scene',
            'Delivery person should wear uniform (or casual work clothes)',
            'Recipient should dress casually but attractively',
            'Have package and clipboard ready as props',
            'Create cozy apartment atmosphere visible from doorway'
          ],
          characterGuides: [
            {
              character: 'Delivery Person',
              personality: 'Friendly, professional, but notices attractive recipient',
              dialogue: [
                '"I have a special delivery for you"',
                '"You\'ll need to sign for this package"',
                '"Is there anything else I can... deliver today?"'
              ],
              actions: [
                'Smile warmly when door opens',
                'Lean closer while explaining package details',
                'Linger at doorway longer than necessary'
              ]
            },
            {
              character: 'Lonely Recipient',
              personality: 'Surprised, attracted to delivery person, inviting',
              dialogue: [
                '"I wasn\'t expecting a delivery today"',
                '"Would you like to come in for a drink?"',
                '"I\'ve been so lonely lately..."'
              ],
              actions: [
                'Act surprised but pleased at doorway',
                'Invite delivery person inside',
                'Show obvious interest and attraction'
              ]
            }
          ],
          scenarioFlow: [
            {
              phase: 'The Delivery',
              description: 'Delivery person arrives with unexpected package',
              duration: '5-8 minutes',
              actions: [
                'Doorbell rings, recipient answers',
                'Delivery person explains the package',
                'Immediate attraction between both parties'
              ]
            },
            {
              phase: 'The Invitation',
              description: 'Recipient invites delivery person inside',
              duration: '8-12 minutes',
              actions: [
                'Recipient offers drink or tip',
                'Delivery person accepts invitation inside',
                'Conversation becomes flirtatious'
              ]
            },
            {
              phase: 'Special Delivery',
              description: 'The real package gets delivered',
              duration: '10-15 minutes',
              actions: [
                'Both admit mutual attraction',
                'Delivery person offers "extra service"',
                'Package forgotten as passion takes over'
              ]
            }
          ]
        }
      ]
    }
  }

  const generateScenario = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const categories = Object.values(roleplayCategories)
      const allScenarios = categories.flatMap((cat: RoleplayCategory) => cat.scenarios) as RoleplayScenario[]
      const randomScenario = allScenarios[Math.floor(Math.random() * allScenarios.length)]
      setCurrentScenario(randomScenario)
      setIsGenerating(false)
    }, 1500)
  }

  const getLevelColor = (level: number) => {
    const colors = {
      1: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      2: 'bg-green-500/20 text-green-300 border-green-500/30',
      3: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      4: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      5: 'bg-red-500/20 text-red-300 border-red-500/30'
    }
    return colors[level as keyof typeof colors]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <Wand2 className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300" />
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent text-center">
                Sex Roleplay Generator
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              Get into character! Create unforgettable intimate experiences with our fantasy roleplay scenarios and character guides.
            </p>
          </div>

          {/* Adult Roleplay Categories */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-pink-300" />
                Adult Roleplay Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(roleplayCategories).map(([key, category]) => (
                  <div key={key} className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">{category.name}</div>
                        <div className="text-white/70 text-sm">{category.scenarios.length} scenarios</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-white/60 text-sm">
                      {category.scenarios.map((scenario) => (
                        <div key={scenario.id} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
                          <span>{scenario.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="text-center">
            <button 
              onClick={generateScenario}
              disabled={isGenerating}
              className="px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 min-w-[300px]"
            >
              <div className="flex items-center justify-center gap-3">
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span>Creating Fantasy...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-8 h-8" />
                    <span>Generate Roleplay</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Generated Scenario */}
          {currentScenario && !isGenerating && (
            <Card variant="elegant" className="bg-gradient-to-br from-black/60 to-black/80 border-pink-500/30 shadow-2xl rounded-3xl backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mb-6">
                  <div className={`inline-flex px-6 py-3 rounded-full text-lg font-bold border ${getLevelColor(currentScenario.spicyLevel)}`}>
                    🔥 Level {currentScenario.spicyLevel} - {['Gentle', 'Sweet', 'Warm', 'Spicy', 'Fire'][currentScenario.spicyLevel - 1]}
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl text-white leading-tight break-words hyphens-auto">
                  {currentScenario.title}
                </CardTitle>
                <p className="text-white/80 text-base sm:text-lg mt-4 break-words hyphens-auto">{currentScenario.description}</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Setup Instructions */}
                {currentScenario.setupInstructions && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-300" />
                      Setup Instructions
                    </h4>
                    <div className="space-y-2">
                      {currentScenario.setupInstructions.map((instruction, index) => (
                        <div key={index} className="flex items-start gap-3 text-white/80">
                          <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold flex items-center justify-center mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm break-words hyphens-auto">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Character Guides */}
                {currentScenario.characterGuides && (
                  <div className="space-y-6">
                    <h4 className="text-white font-bold text-xl flex items-center gap-2">
                      <Users className="w-6 h-6 text-purple-300" />
                      Character Guides
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentScenario.characterGuides.map((guide, index) => (
                        <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="text-white font-bold text-lg">{guide.character}</div>
                              <div className="text-purple-300 text-sm">{guide.personality}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="text-pink-300 font-medium mb-2">Sample Dialogue:</div>
                              <div className="space-y-1">
                                {guide.dialogue.map((line, i) => (
                                  <div key={i} className="text-white/80 text-sm italic bg-black/20 p-2 rounded">
                                    {line}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-yellow-300 font-medium mb-2">Actions to Take:</div>
                              <div className="space-y-1">
                                {guide.actions.map((action, i) => (
                                  <div key={i} className="flex items-start gap-2 text-white/80 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-2 flex-shrink-0"></span>
                                    <span>{action}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scenario Flow */}
                {currentScenario.scenarioFlow && (
                  <div className="space-y-6">
                    <h4 className="text-white font-bold text-xl flex items-center gap-2">
                      <Clock className="w-6 h-6 text-green-300" />
                      Scenario Flow
                    </h4>
                    <div className="space-y-4">
                      {currentScenario.scenarioFlow.map((phase, index) => (
                        <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <div className="text-white font-bold">{phase.phase}</div>
                                <div className="text-green-300 text-sm">{phase.description}</div>
                              </div>
                            </div>
                            <div className="text-green-300 text-sm font-medium">{phase.duration}</div>
                          </div>
                          
                          <div>
                            <div className="text-blue-300 font-medium mb-2">What Happens:</div>
                            <div className="space-y-1">
                              {phase.actions.map((action, i) => (
                                <div key={i} className="flex items-start gap-2 text-white/80 text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2 flex-shrink-0"></span>
                                  <span>{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-300" />
                      Characters
                    </h4>
                    <div className="space-y-3">
                      {currentScenario.characters.map((character, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <span className="text-white font-medium">{character}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-300" />
                      Setting & Props
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-green-300 font-medium mb-1">Location</div>
                        <div className="text-white">{currentScenario.setting}</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-purple-300 font-medium mb-2">Props Needed</div>
                        <div className="flex flex-wrap gap-2">
                          {currentScenario.props.map((prop, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                              {prop}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 text-white/80 bg-black/20 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-300" />
                    <span className="font-medium">{currentScenario.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-300" />
                    <span className="font-medium">{currentScenario.difficulty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default FantasyRoleplay
