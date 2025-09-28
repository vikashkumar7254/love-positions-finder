import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Dice1, Dice2, RefreshCw, Heart, Flame, Users, Play, X } from "lucide-react"

interface DiceResult {
  action: string
  bodyPart: string
}

const DiceToSpice = () => {
  const [currentResult, setCurrentResult] = useState<DiceResult | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [difficulty, setDifficulty] = useState<'Cute' | 'Spicy' | 'Custom'>('Spicy')
  const [playerTurn, setPlayerTurn] = useState<'hhh' | 'hh'>('hhh')
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [showActionButtons, setShowActionButtons] = useState(false)
  const actionRef = useRef<HTMLDivElement>(null)
  const bodyPartRef = useRef<HTMLDivElement>(null)

  const actions = {
    Cute: ['Kiss', 'Caress', 'Massage', 'Tickle', 'Hug', 'Cuddle', 'Whisper to', 'Hold', 'Stroke', 'Touch'],
    Spicy: ['Nibble', 'Squeeze', 'Lick', 'Suck', 'Bite', 'Tease', 'Stroke', 'Kiss', 'Grab', 'Pinch'],
    Custom: ['Touch', 'Explore', 'Massage', 'Kiss', 'Caress', 'Whisper to', 'Hold', 'Tickle', 'Rub', 'Trace']
  }

  const bodyParts = [
    'Lips', 'Neck', 'Shoulder', 'Chest', 'Nipples', 'Back', 'Arms', 'Hands', 'Thigh', 
    'Finger', 'Feet', 'Leg', 'Ear', 'Cheek', 'Forehead', 'Wrist', 'Ankle',
    'Hip', 'Waist', 'Knee', 'Elbow'
  ]

  useEffect(() => {
    // Smoothly scroll to the final result after rolling animation
    if (currentResult && !isRolling) {
      const actionElement = document.getElementById(`action-${currentResult.action}`);
      const bodyPartElement = document.getElementById(`body-part-${currentResult.bodyPart}`);

      actionElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      bodyPartElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentResult, isRolling]);

  const rollDice = () => {
    setIsRolling(true);
    setCurrentResult(null);
    setShowActionButtons(false);

    // Fast scrolling animation for actions
    const actionInterval = setInterval(() => {
      if (actionRef.current) {
        const randomIndex = Math.floor(Math.random() * actions[difficulty].length);
        const itemHeight = 68; // Height of each item including gap (56px + 12px gap)
        actionRef.current.scrollTop = randomIndex * itemHeight;
      }
    }, 80); // Fast rotation

    // Fast scrolling animation for body parts
    const bodyPartInterval = setInterval(() => {
      if (bodyPartRef.current) {
        const randomIndex = Math.floor(Math.random() * bodyParts.length);
        const itemHeight = 68; // Height of each item including gap (56px + 12px gap)
        bodyPartRef.current.scrollTop = randomIndex * itemHeight;
      }
    }, 80); // Fast rotation

    // Stop the animation and set the final result
    setTimeout(() => {
      clearInterval(actionInterval);
      clearInterval(bodyPartInterval);

      const finalAction = actions[difficulty][Math.floor(Math.random() * actions[difficulty].length)];
      const finalBodyPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];

      setCurrentResult({
        action: finalAction,
        bodyPart: finalBodyPart,
      });

      setIsRolling(false);
      setShowActionButtons(true);
    }, 2500); // Longer animation duration
  };

  const handleCompleted = () => {
    // Update score for the current player
    if (playerTurn === 'hhh') {
      setPlayer1Score(prev => prev + 1);
    } else {
      setPlayer2Score(prev => prev + 1);
    }
    
    // Switch turns and reset for next round
    setPlayerTurn(prev => (prev === 'hhh' ? 'hh' : 'hhh'));
    setCurrentResult(null);
    setShowActionButtons(false);
  };

  const handleSkip = () => {
    // Switch turns without updating score
    setPlayerTurn(prev => (prev === 'hhh' ? 'hh' : 'hhh'));
    setCurrentResult(null);
    setShowActionButtons(false);
  };

  const getDifficultyColor = (level: string) => {
    switch(level) {
      case 'Cute': return 'bg-blue-500/30 text-white border-blue-500/50'
      case 'Spicy': return 'bg-white/90 text-gray-800 border-white'
      case 'Custom': return 'bg-purple-500/30 text-white border-purple-500/50'
      default: return 'bg-gray-500/30 text-white border-gray-500/50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 relative">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between p-4 pt-8">
        <div></div>
        <h1 className="text-2xl font-bold text-white">Dice to spice</h1>
        <button className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Score Bar */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 rounded-full p-2 relative">
          {/* Player 1 */}
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm">♂</span>
            </div>
            <div>
              <div className="text-sm font-semibold">hhh</div>
              <div className="text-xs">{player1Score}</div>
            </div>
          </div>

          {/* VS in center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">VS</span>
          </div>

          {/* Player 2 */}
          <div className="flex items-center gap-2 text-white">
            <div>
              <div className="text-sm font-semibold">hh</div>
              <div className="text-xs">{player2Score}</div>
            </div>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm">♀</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dice Columns */}
      <div className="flex gap-4 px-4 mb-6">
        {/* Actions Column */}
        <div className="flex-1">
          <div 
            ref={actionRef} 
            className="space-y-3 max-h-80 overflow-y-auto no-scrollbar"
            style={{ scrollBehavior: isRolling ? 'auto' : 'smooth' }}
          >
            {actions[difficulty].map((action, index) => (
              <div 
                key={index}
                id={`action-${action}`}
                className={`p-4 rounded-lg text-center font-medium transition-all duration-300 ${
                  currentResult?.action === action 
                    ? 'bg-purple-500/80 text-white border-2 border-purple-300' 
                    : 'bg-gray-600/80 text-white'
                }`}
                style={{ minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {action}
              </div>
            ))}
          </div>
        </div>

        {/* Body Parts Column */}
        <div className="flex-1">
          <div 
            ref={bodyPartRef} 
            className="space-y-3 max-h-80 overflow-y-auto no-scrollbar"
            style={{ scrollBehavior: isRolling ? 'auto' : 'smooth' }}
          >
            {bodyParts.map((part, index) => (
              <div 
                key={index}
                id={`body-part-${part}`}
                className={`p-4 rounded-lg text-center font-medium transition-all duration-300 ${
                  currentResult?.bodyPart === part 
                    ? 'bg-purple-500/80 text-white border-2 border-purple-300' 
                    : 'bg-gray-600/80 text-white'
                }`}
                style={{ minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {part}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-purple-800 to-purple-700 p-6 rounded-t-3xl">
        {/* Player Turn */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-white mb-1">{playerTurn}'s Turn</div>
          <div className="text-purple-200 text-sm">Choose a difficulty</div>
        </div>

        {/* Difficulty Selection */}
        <div className="flex justify-center gap-4 mb-6">
          {(['Cute', 'Spicy', 'Custom'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`w-16 h-16 rounded-full border-2 text-sm font-medium transition-all flex flex-col items-center justify-center ${
                difficulty === level
                  ? getDifficultyColor(level)
                  : 'bg-purple-600/50 border-purple-400/50 text-white/70'
              }`}
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                {level === 'Cute' && <span className="text-xl">😘</span>}
                {level === 'Spicy' && <span className="text-xl">🌶️</span>}
                {level === 'Custom' && <span className="text-xl">✨</span>}
              </div>
              <span className="text-xs">{level}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        {showActionButtons ? (
          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              className="flex-1 bg-white/90 text-red-500 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              <X className="w-5 h-5" />
              Skip
            </button>
            <button
              onClick={handleCompleted}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="text-xl">✓</span>
              Completed
            </button>
          </div>
        ) : (
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
          >
            <Dice1 className="w-6 h-6" />
            {isRolling ? 'Rolling...' : 'Play Now'}
          </button>
        )}
      </div>

      {/* Spacer for fixed bottom section */}
      <div className="h-64"></div>
    </div>
  )
}

export default DiceToSpice
