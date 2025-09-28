import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Map, Heart, Zap, Star, Eye, Hand, MessageCircle, Flame, Sparkles, Target, Info, Play, Clock } from "lucide-react"

interface ErogenousZone {
  id: string
  name: string
  sensitivity: 1 | 2 | 3 | 4 | 5
  techniques: string[]
  tips: string[]
  duration: string
  description: string
  category: 'primary' | 'secondary' | 'hidden'
}

interface BodyRegion {
  id: string
  name: string
  zones: ErogenousZone[]
  icon: any
  color: string
}

const PleasureMap = () => {
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female')
  const [selectedZone, setSelectedZone] = useState<ErogenousZone | null>(null)
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const femaleZones: BodyRegion[] = [
    {
      id: 'head_neck',
      name: 'Head & Neck',
      icon: MessageCircle,
      color: 'from-pink-500 to-rose-500',
      zones: [
        {
          id: 'lips',
          name: 'Lips',
          sensitivity: 5,
          category: 'primary',
          description: 'Extremely sensitive with thousands of nerve endings',
          techniques: [
            'Gentle kissing with varying pressure',
            'Light nibbling on lower lip',
            'Tracing lips with fingertip',
            'Soft breath against lips'
          ],
          tips: [
            'Start with gentle pressure and build intensity',
            'Pay attention to both upper and lower lips',
            'Use your tongue sparingly at first',
            'Mirror their kissing style and rhythm'
          ],
          duration: '5-15 minutes'
        },
        {
          id: 'neck',
          name: 'Neck',
          sensitivity: 4,
          category: 'primary',
          description: 'Highly sensitive area that responds to gentle touch',
          techniques: [
            'Soft kisses along the neckline',
            'Gentle breathing on the neck',
            'Light fingertip caresses',
            'Tender nibbling on earlobes'
          ],
          tips: [
            'Start with the sides of the neck',
            'Avoid too much pressure on the throat',
            'Pay special attention to the nape',
            'Combine with gentle hair touching'
          ],
          duration: '3-10 minutes'
        },
        {
          id: 'ears',
          name: 'Ears',
          sensitivity: 3,
          category: 'secondary',
          description: 'Sensitive to breath, whispers, and gentle touch',
          techniques: [
            'Whisper softly into the ear',
            'Gentle breathing on the earlobe',
            'Light kissing around the ear',
            'Soft nibbling on earlobes'
          ],
          tips: [
            'Be very gentle - ears are delicate',
            'Combine with soft whispers',
            'Avoid being too wet or loud',
            'Focus on the earlobes and outer edge'
          ],
          duration: '2-5 minutes'
        }
      ]
    },
    {
      id: 'torso',
      name: 'Torso',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      zones: [
        {
          id: 'breasts',
          name: 'Breasts',
          sensitivity: 5,
          category: 'primary',
          description: 'Highly erogenous zone with varying sensitivity',
          techniques: [
            'Gentle circular motions around areola',
            'Light teasing without direct contact',
            'Varying pressure and rhythm',
            'Combining hands and mouth'
          ],
          tips: [
            'Start with gentle touches around the area',
            'Build anticipation before direct contact',
            'Every person has different preferences',
            'Communicate and ask what feels good'
          ],
          duration: '10-20 minutes'
        },
        {
          id: 'stomach',
          name: 'Stomach',
          sensitivity: 2,
          category: 'secondary',
          description: 'Sensitive to light touches and kisses',
          techniques: [
            'Feather-light fingertip traces',
            'Soft kisses across the abdomen',
            'Gentle circular motions',
            'Light breathing on the skin'
          ],
          tips: [
            'Use very light pressure',
            'Avoid tickling - keep touches sensual',
            'Focus on the lower abdomen',
            'Build anticipation for lower areas'
          ],
          duration: '3-8 minutes'
        }
      ]
    },
    {
      id: 'intimate',
      name: 'Intimate Areas',
      icon: Flame,
      color: 'from-purple-500 to-red-500',
      zones: [
        {
          id: 'clitoris',
          name: 'Clitoris',
          sensitivity: 5,
          category: 'primary',
          description: 'Most sensitive area with over 8,000 nerve endings',
          techniques: [
            'Start with indirect stimulation',
            'Use circular motions with varying pressure',
            'Alternate between direct and indirect touch',
            'Maintain consistent rhythm when something works'
          ],
          tips: [
            'Always start gently and build up',
            'Use plenty of lubrication',
            'Pay attention to their responses',
            'Don\'t rush - take your time'
          ],
          duration: '15-30 minutes'
        },
        {
          id: 'inner_thighs',
          name: 'Inner Thighs',
          sensitivity: 4,
          category: 'secondary',
          description: 'Highly sensitive area close to intimate zones',
          techniques: [
            'Soft kisses moving inward',
            'Light fingertip caresses',
            'Gentle massage motions',
            'Teasing touches that build anticipation'
          ],
          tips: [
            'Use this area to build anticipation',
            'Alternate between both thighs',
            'Gradually move closer to intimate areas',
            'Combine with other erogenous zones'
          ],
          duration: '5-15 minutes'
        }
      ]
    },
    {
      id: 'hidden',
      name: 'Hidden Gems',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      zones: [
        {
          id: 'wrists',
          name: 'Wrists',
          sensitivity: 2,
          category: 'hidden',
          description: 'Surprisingly sensitive pulse points',
          techniques: [
            'Light kisses on the pulse point',
            'Gentle circular motions with fingertips',
            'Soft breathing on the wrists',
            'Light nibbling along the wrist'
          ],
          tips: [
            'Focus on the pulse point',
            'Use very light pressure',
            'Combine with hand holding',
            'Great for building intimacy'
          ],
          duration: '2-5 minutes'
        },
        {
          id: 'feet',
          name: 'Feet',
          sensitivity: 3,
          category: 'hidden',
          description: 'Often overlooked but can be very sensitive',
          techniques: [
            'Gentle foot massage',
            'Light kisses on the arch',
            'Soft touches between toes',
            'Pressure point stimulation'
          ],
          tips: [
            'Make sure feet are clean',
            'Start with gentle massage',
            'Focus on the arch and toes',
            'Not everyone enjoys foot play - ask first'
          ],
          duration: '5-10 minutes'
        }
      ]
    }
  ]

  const maleZones: BodyRegion[] = [
    {
      id: 'head_neck',
      name: 'Head & Neck',
      icon: MessageCircle,
      color: 'from-blue-500 to-indigo-500',
      zones: [
        {
          id: 'lips',
          name: 'Lips',
          sensitivity: 5,
          category: 'primary',
          description: 'Highly sensitive with many nerve endings',
          techniques: [
            'Passionate kissing with varying intensity',
            'Light biting of lower lip',
            'Tongue exploration',
            'Soft pecks alternating with deeper kisses'
          ],
          tips: [
            'Match their energy and intensity',
            'Don\'t forget to breathe',
            'Use your hands while kissing',
            'Pay attention to their response'
          ],
          duration: '5-15 minutes'
        },
        {
          id: 'neck',
          name: 'Neck',
          sensitivity: 4,
          category: 'primary',
          description: 'Responds well to firm but gentle touch',
          techniques: [
            'Firm kisses along the neck',
            'Light scratching with fingernails',
            'Gentle biting at the base of neck',
            'Warm breath against the skin'
          ],
          tips: [
            'Men often prefer slightly firmer touch',
            'Focus on the sides and back of neck',
            'Combine with running fingers through hair',
            'Don\'t be afraid to be a bit more assertive'
          ],
          duration: '3-10 minutes'
        }
      ]
    },
    {
      id: 'torso',
      name: 'Torso',
      icon: Heart,
      color: 'from-green-500 to-blue-500',
      zones: [
        {
          id: 'chest',
          name: 'Chest',
          sensitivity: 3,
          category: 'secondary',
          description: 'Responds to firm touch and attention',
          techniques: [
            'Firm caresses across the chest',
            'Light scratching with fingernails',
            'Kissing and licking the chest',
            'Gentle pinching of nipples'
          ],
          tips: [
            'Men\'s nipples can be sensitive too',
            'Use firm, confident touches',
            'Pay attention to the entire chest area',
            'Combine with other areas for best effect'
          ],
          duration: '5-15 minutes'
        },
        {
          id: 'stomach',
          name: 'Lower Abdomen',
          sensitivity: 3,
          category: 'secondary',
          description: 'Sensitive area leading to intimate zones',
          techniques: [
            'Firm kisses moving downward',
            'Light scratching with fingernails',
            'Teasing touches near the waistline',
            'Building anticipation with slow movements'
          ],
          tips: [
            'Use this area to build anticipation',
            'Don\'t rush through this area',
            'Combine with eye contact',
            'Let anticipation build naturally'
          ],
          duration: '3-8 minutes'
        }
      ]
    },
    {
      id: 'intimate',
      name: 'Intimate Areas',
      icon: Flame,
      color: 'from-red-500 to-purple-500',
      zones: [
        {
          id: 'penis',
          name: 'Penis',
          sensitivity: 5,
          category: 'primary',
          description: 'Most sensitive area requiring varied techniques',
          techniques: [
            'Varying pressure and speed',
            'Focus on the head and frenulum',
            'Use both hands for different sensations',
            'Combine with other erogenous zones'
          ],
          tips: [
            'Communication is key',
            'Vary your technique regularly',
            'Don\'t forget about the entire area',
            'Use lubrication when needed'
          ],
          duration: '15-30 minutes'
        },
        {
          id: 'testicles',
          name: 'Testicles',
          sensitivity: 4,
          category: 'secondary',
          description: 'Very sensitive and requires gentle handling',
          techniques: [
            'Extremely gentle caressing',
            'Light cupping motions',
            'Soft kisses and licks',
            'Gentle massage with fingertips'
          ],
          tips: [
            'Be very gentle - this area is delicate',
            'Use warm hands',
            'Start with very light touches',
            'Pay attention to their comfort level'
          ],
          duration: '5-10 minutes'
        }
      ]
    },
    {
      id: 'hidden',
      name: 'Hidden Gems',
      icon: Star,
      color: 'from-orange-500 to-red-500',
      zones: [
        {
          id: 'inner_thighs',
          name: 'Inner Thighs',
          sensitivity: 3,
          category: 'hidden',
          description: 'Often overlooked but highly responsive',
          techniques: [
            'Firm kisses moving upward',
            'Light scratching with fingernails',
            'Gentle biting and nibbling',
            'Teasing touches building anticipation'
          ],
          tips: [
            'Great for building anticipation',
            'Use firmer pressure than with women',
            'Alternate between both thighs',
            'Combine with other techniques'
          ],
          duration: '5-15 minutes'
        },
        {
          id: 'back',
          name: 'Lower Back',
          sensitivity: 2,
          category: 'hidden',
          description: 'Responds well to firm massage and touch',
          techniques: [
            'Firm massage with palms',
            'Light scratching down the spine',
            'Kisses along the lower back',
            'Pressure point stimulation'
          ],
          tips: [
            'Use firm, confident touches',
            'Focus on the lower back area',
            'Great for relaxation and arousal',
            'Combine with full body contact'
          ],
          duration: '5-10 minutes'
        }
      ]
    }
  ]

  const currentZones = selectedGender === 'female' ? femaleZones : maleZones

  const getSensitivityColor = (level: number) => {
    const colors = {
      1: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      2: 'bg-green-500/20 text-green-300 border-green-500/30',
      3: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      4: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      5: 'bg-red-500/20 text-red-300 border-red-500/30'
    }
    return colors[level as keyof typeof colors]
  }

  const getSensitivityLabel = (level: number) => {
    const labels = {
      1: 'Mild',
      2: 'Moderate', 
      3: 'Good',
      4: 'High',
      5: 'Extreme'
    }
    return labels[level as keyof typeof labels]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Target className="w-12 h-12 text-pink-300" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent">
                Female Erogenous Zones Guide
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Discover the art of pleasure with our comprehensive interactive guide. Learn techniques, timing, and tips for ultimate intimacy.
            </p>
          </div>

          {/* Gender Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/20 p-2 rounded-2xl border border-white/10">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGender('female')}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                    selectedGender === 'female'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Female Guide
                </button>
                <button
                  onClick={() => setSelectedGender('male')}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                    selectedGender === 'male'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Male Guide
                </button>
              </div>
            </div>
          </div>

          {/* Body Regions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentZones.map((region) => {
              const IconComponent = region.icon
              return (
                <Card
                  key={region.id}
                  variant="elegant"
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    activeRegion === region.id
                      ? 'bg-gradient-to-br from-white/20 to-white/10 border-white/30 shadow-2xl'
                      : 'bg-black/20 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${region.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{region.name}</CardTitle>
                    <p className="text-white/60 text-sm">{region.zones.length} zones</p>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Zone Details */}
          {activeRegion && (
            <div className="space-y-6">
              {currentZones
                .find(region => region.id === activeRegion)
                ?.zones.map((zone) => (
                  <Card
                    key={zone.id}
                    variant="elegant"
                    className="bg-gradient-to-br from-black/60 to-black/80 border-pink-500/30 shadow-2xl rounded-3xl backdrop-blur-sm cursor-pointer hover:scale-[1.02] transition-all duration-300"
                    onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-white">{zone.name}</CardTitle>
                            <p className="text-white/70">{zone.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`px-4 py-2 rounded-full border font-bold ${getSensitivityColor(zone.sensitivity)}`}>
                            {getSensitivityLabel(zone.sensitivity)}
                          </div>
                          <div className="flex items-center gap-1 text-white/60">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{zone.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    {selectedZone?.id === zone.id && (
                      <CardContent className="space-y-8">
                        {/* Techniques */}
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Hand className="w-5 h-5 text-purple-300" />
                            Techniques
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {zone.techniques.map((technique, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-sm font-bold flex items-center justify-center mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </span>
                                <span className="text-white/80 text-sm">{technique}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6">
                          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-pink-300" />
                            Expert Tips
                          </h4>
                          <div className="space-y-3">
                            {zone.tips.map((tip, index) => (
                              <div key={index} className="flex items-start gap-3 text-white/80">
                                <Sparkles className="w-4 h-4 text-pink-300 mt-1 flex-shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sensitivity Meter */}
                        <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-xl p-6">
                          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-yellow-300" />
                            Sensitivity Level
                          </h4>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 bg-black/20 rounded-full h-4 overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${
                                  zone.sensitivity <= 2 ? 'from-blue-500 to-green-500' :
                                  zone.sensitivity <= 3 ? 'from-green-500 to-yellow-500' :
                                  zone.sensitivity <= 4 ? 'from-yellow-500 to-orange-500' :
                                  'from-orange-500 to-red-500'
                                } transition-all duration-1000`}
                                style={{ width: `${(zone.sensitivity / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-white font-bold">{zone.sensitivity}/5</span>
                          </div>
                          <div className="flex justify-between text-xs text-white/60 mt-2">
                            <span>Mild</span>
                            <span>Moderate</span>
                            <span>Good</span>
                            <span>High</span>
                            <span>Extreme</span>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
            </div>
          )}

          {/* Getting Started Guide */}
          {!activeRegion && (
            <Card variant="elegant" className="bg-gradient-to-br from-black/40 to-black/60 border-pink-500/20 shadow-2xl rounded-3xl backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white mb-4">
                  How to Use This Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold mb-2">1. Explore</h3>
                    <p className="text-white/70 text-sm">Click on body regions to discover erogenous zones and their sensitivity levels.</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                      <Hand className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold mb-2">2. Learn</h3>
                    <p className="text-white/70 text-sm">Study techniques, tips, and timing for each zone to maximize pleasure.</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold mb-2">3. Practice</h3>
                    <p className="text-white/70 text-sm">Apply what you've learned with your partner for unforgettable intimate experiences.</p>
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

export default PleasureMap
