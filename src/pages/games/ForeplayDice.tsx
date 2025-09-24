import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Dice1, RefreshCw, ArrowLeft, Timer } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Link } from "react-router-dom"
import { diceActions, getRandomDiceAction } from "@/data/games"
import type { DiceAction } from "@/types"

const ForeplayDice = () => {
  const [currentAction, setCurrentAction] = useState<DiceAction | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [rollCount, setRollCount] = useState(0)

  const rollDice = () => {
    setIsRolling(true)
    setRollCount(prev => prev + 1)
    
    // Simulate dice rolling animation
    setTimeout(() => {
      const action = getRandomDiceAction()
      setCurrentAction(action)
      setIsRolling(false)
    }, 1000)
  }

  const getSpicyLevelColor = (level: number) => {
    const colors = {
      1: 'bg-blue-100 text-blue-800',
      2: 'bg-green-100 text-green-800', 
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getSpicyLevelText = (level: number) => {
    const levels = ['Gentle', 'Sweet', 'Warm', 'Spicy', 'Fire']
    return levels[level - 1] || 'Unknown'
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
              <Dice1 className="w-10 h-10 text-romantic" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                Foreplay Dice
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Roll the dice for random intimate actions and discover new ways to pleasure each other
            </p>
          </div>

          {/* Dice Display */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-6 bg-romantic rounded-xl flex items-center justify-center ${isRolling ? 'animate-spin' : ''} shadow-lg`}>
              <Dice1 className="w-12 h-12 text-white" />
            </div>
            
            {rollCount === 0 ? (
              <p className="text-muted-foreground mb-6">Click the button below to roll your first dice!</p>
            ) : (
              <p className="text-sm text-muted-foreground mb-6">
                Roll #{rollCount} • {diceActions.length} possible actions
              </p>
            )}
            
            <Button 
              variant="hero" 
              size="xl" 
              onClick={rollDice}
              disabled={isRolling}
              className="min-w-[200px]"
              data-testid="button-roll-dice"
            >
              {isRolling ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Rolling...
                </>
              ) : (
                <>
                  <Dice1 className="w-5 h-5" />
                  Roll Dice
                </>
              )}
            </Button>
          </div>

          {/* Current Action */}
          {currentAction && !isRolling && (
            <Card variant="romantic" className="mb-8 animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
                  <span>{currentAction.action}</span>
                  <span className="text-passionate">•</span>
                  <span>{currentAction.bodyPart}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-lg font-medium">{currentAction.duration}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSpicyLevelColor(currentAction.spicyLevel)}`}>
                    {getSpicyLevelText(currentAction.spicyLevel)}
                  </div>
                </div>
                
                <div className="text-muted-foreground">
                  Take your time and enjoy this intimate moment together
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card variant="elegant" className="mb-8">
            <CardHeader>
              <CardTitle>How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">🎲 Roll the Dice</h4>
                  <p className="text-muted-foreground">Click the roll button to get a random intimate action</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💕 Follow the Action</h4>
                  <p className="text-muted-foreground">Perform the action on the specified body part for the given duration</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⏰ Take Your Time</h4>
                  <p className="text-muted-foreground">Focus on your partner's pleasure and enjoy the moment</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔄 Keep Rolling</h4>
                  <p className="text-muted-foreground">Roll again for the next action when you're ready</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          {rollCount > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Total rolls this session: {rollCount}</p>
              <p>Available actions: {diceActions.length}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ForeplayDice