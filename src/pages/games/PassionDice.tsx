import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Dice1, RefreshCw, Timer, Heart as HeartIconLucide, Flame as FlameIcon, Sparkles, Users, MapPin } from "lucide-react"
import { diceActions, getRandomDiceAction } from "@/data/games"
import type { DiceAction } from "@/types"

const PassionDice = () => {
  const [currentAction, setCurrentAction] = useState<DiceAction | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [previous, setPrevious] = useState<DiceAction[]>([])
  const [mode, setMode] = useState<'romantic'|'spicy'>('romantic')
  const [intensity, setIntensity] = useState<'Mild'|'Medium'|'Spicy'>('Mild')
  const [location, setLocation] = useState<'Bedroom'|'Shower'|'Kitchen'|'Living Room'|'Outdoors'>('Bedroom')
  const [perspective, setPerspective] = useState<'His'|'Hers'|'Random'>('Random')

  const getMaxSpicyLevel = () => {
    switch (intensity) {
      case 'Mild': return 2
      case 'Medium': return 3
      case 'Spicy': return 5
      default: return 3
    }
  }

  const roll = () => {
    setIsRolling(true)
    setTimeout(() => {
      const maxLevel = getMaxSpicyLevel()
      const action = getRandomDiceAction(maxLevel, mode)
      setCurrentAction(action)
      setPrevious((p) => [action, ...p].slice(0, 5))
      setIsRolling(false)
    }, 1200)
  }

  const levelText = (lvl: number) => ['Gentle','Sweet','Warm','Spicy','Fire'][lvl-1] || 'Gentle'
  const levelChip = (lvl: number) => ({
    1: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    2: 'bg-green-500/20 text-green-300 border border-green-500/30',
    3: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    4: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    5: 'bg-red-500/20 text-red-300 border border-red-500/30'
  } as const)[lvl as 1|2|3|4|5] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30'

  const getIntensityColor = (level: string) => {
    switch(level) {
      case 'Mild': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' 
      case 'Spicy': return 'bg-red-500/20 text-red-300 border-red-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <main className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-4">
              <Dice1 className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300" />
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent text-center">Sexy Dice Game for Couples</h1>
            </div>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              Roll the dice of passion! Discover exciting combinations of actions, body parts, and locations for intimate moments together.
            </p>
          </div>

          {/* Interactive Foreplay Dice - checklist */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-300" />
                Interactive Foreplay Dice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"/>
                <span>Digital sexy dice for exciting foreplay</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-red-400"/>
                <span>Perfect for couples seeking adventure</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-pink-400"/>
                <span>Romantic actions and intimate suggestions</span>
              </div>
            </CardContent>
          </Card>

          {/* Choose Mode */}
          <Card variant="elegant" className="bg-black/20 border-purple-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl">Choose Your Dice Game Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={()=>setMode('romantic')} 
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    mode==='romantic' 
                      ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-400 shadow-lg shadow-pink-500/25' 
                      : 'bg-black/20 border-white/20 hover:border-pink-400/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                      <HeartIconLucide className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg mb-1">Romantic Play</div>
                      <div className="text-white/70 text-sm">Gentle, romantic foreplay suggestions for intimate moments</div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={()=>setMode('spicy')} 
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    mode==='spicy' 
                      ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400 shadow-lg shadow-red-500/25' 
                      : 'bg-black/20 border-white/20 hover:border-red-400/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center">
                      <FlameIcon className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg mb-1">Spicy Adventure</div>
                      <div className="text-white/70 text-sm">Exciting and passionate dice combinations for adventurous couples</div>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Spicy Dice Challenge (controls) */}
          <Card variant="elegant" className="bg-black/30 border-white/10 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Dice1 className="w-5 h-5 text-purple-300" />
                Spicy Dice Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    Intensity
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Mild','Medium','Spicy'] as const).map(lv=> (
                      <button 
                        key={lv} 
                        onClick={()=>setIntensity(lv)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
                          intensity===lv 
                            ? `${getIntensityColor(lv)} shadow-lg` 
                            : 'bg-black/20 border-white/20 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {lv}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-300" />
                    Location
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Bedroom','Shower','Kitchen','Living Room','Outdoors'] as const).map(loc=> (
                      <button 
                        key={loc} 
                        onClick={()=>setLocation(loc)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-300 text-xs font-medium ${
                          location===loc 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30 shadow-lg' 
                            : 'bg-black/20 border-white/20 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-300" />
                    Perspective
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['His','Hers','Random'] as const).map(p=> (
                      <button 
                        key={p} 
                        onClick={()=>setPerspective(p)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
                          perspective===p 
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-lg' 
                            : 'bg-black/20 border-white/20 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dice + Roll */}
          <div className="text-center mb-12">
            <div className="relative">
              <div
                className={`w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pink-500 via-purple-500 to-red-500 rounded-3xl flex items-center justify-center ring-4 ring-white/30 ${isRolling? 'animate-spin':''} shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95`}
                onClick={() => !isRolling && roll()}
                role="button"
                aria-label="Roll dice"
              >
                <Dice1 className="w-16 h-16 text-white drop-shadow-lg" />
                {isRolling && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-400 to-red-400 animate-pulse" />
                )}
              </div>
              <button 
                onClick={roll} 
                disabled={isRolling}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRolling ? (
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-6 h-6 animate-spin"/> 
                    <span>Rolling...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Dice1 className="w-6 h-6"/> 
                    <span>Roll Dice</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Current Action */}
          {currentAction && !isRolling && (
            <Card variant="elegant" className="bg-gradient-to-br from-black/40 to-black/60 border-pink-500/30 shadow-2xl rounded-3xl backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mb-4">
                  <div className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${levelChip(currentAction.spicyLevel)}`}>
                    {levelText(currentAction.spicyLevel)} Level
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-4xl text-white leading-tight break-words hyphens-auto">
                  {currentAction.action}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/80">
                  <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-pink-300" />
                    <span className="font-medium text-sm sm:text-base break-words">{currentAction.bodyPart}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                    <Timer className="w-4 h-4 text-purple-300" />
                    <span className="font-medium text-sm sm:text-base break-words">{currentAction.duration}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-white/60 bg-black/20 p-3 sm:p-4 rounded-xl">
                  <div className="text-center">
                    <div className="font-semibold text-white/80 break-words">Mode</div>
                    <div className="capitalize break-words">{mode}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white/80 break-words">Intensity</div>
                    <div className="break-words">{intensity}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white/80 break-words">Location</div>
                    <div className="break-words">{location}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white/80 break-words">Perspective</div>
                    <div className="break-words">{perspective}</div>
                  </div>
                </div>
                <div className="text-xs text-white/40">
                  {diceActions.length} total actions available • Customized for your preferences
                </div>
              </CardContent>
            </Card>
          )}

          {/* Previous Rolls - Hidden on mobile */}
          {previous.length>0 && (
            <Card variant="elegant" className="hidden sm:block bg-black/30 border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Previous Rolls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {previous.map((action, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-romantic"/>
                        <span className="text-white text-sm font-medium">{action.action}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-xs">{action.bodyPart}</span>
                        <div className={`px-2 py-1 rounded-full text-xs ${levelChip(action.spicyLevel)}`}>
                          {levelText(action.spicyLevel)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Guides - Hidden on mobile */}
          <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="elegant" className="bg-black/20 border-purple-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-300" />
                  How to Play Our Sexy Dice Game
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                      Game Rules
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                        <span>Set the mood before playing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mt-2 flex-shrink-0"></span>
                        <span>Choose your preferred intensity level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 flex-shrink-0"></span>
                        <span>Roll the dice and follow the action</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      Tips for Couples
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                        <span>Communicate your boundaries openly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mt-2 flex-shrink-0"></span>
                        <span>Take turns with each roll</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 flex-shrink-0"></span>
                        <span>Enjoy the moment together</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <HeartIconLucide className="w-5 h-5 text-pink-300" />
                  Why Play Foreplay Dice?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Spice Things Up</div>
                      <div className="text-white/70 text-sm">Add excitement and spontaneity to your intimate moments with creative suggestions.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-red-400 flex items-center justify-center flex-shrink-0">
                      <HeartIconLucide className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Build Intimacy</div>
                      <div className="text-white/70 text-sm">Strengthen your emotional and physical connection through playful exploration.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                      <FlameIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Try New Things</div>
                      <div className="text-white/70 text-sm">Discover new ideas and break routine with our diverse collection of actions.</div>
                    </div>
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

export default PassionDice
