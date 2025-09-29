import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { Dice1, RefreshCw, Heart, Flame, Users, Play, X } from "lucide-react";

interface DiceResult {
  action: string;
  bodyPart: string;
}

const DiceToSpice = () => {
  const [currentResult, setCurrentResult] = useState<DiceResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [difficulty, setDifficulty] = useState<'Cute' | 'Spicy' | 'Custom'>('Spicy');
  const [playerTurn, setPlayerTurn] = useState<'Player 1' | 'Player 2'>('Player 1');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const actionRef = useRef<HTMLDivElement>(null);
  const bodyPartRef = useRef<HTMLDivElement>(null);

  const actions = {
    Cute: ['Kiss', 'Caress', 'Massage', 'Tickle', 'Hug', 'Cuddle', 'Whisper to', 'Hold', 'Stroke', 'Touch'],
    Spicy: ['Nibble', 'Squeeze', 'Lick', 'Suck', 'Bite', 'Tease', 'Stroke', 'Kiss', 'Grab', 'Pinch'],
    Custom: ['Touch', 'Explore', 'Massage', 'Kiss', 'Caress', 'Whisper to', 'Hold', 'Tickle', 'Rub', 'Trace']
  };

  const bodyParts = [
    'Lips', 'Neck', 'Shoulder', 'Chest', 'Nipples', 'Back', 'Arms', 'Hands', 'Thigh', 
    'Finger', 'Feet', 'Leg', 'Ear', 'Cheek', 'Forehead', 'Wrist', 'Ankle',
    'Hip', 'Waist', 'Knee', 'Elbow'
  ];

  const numRepeats = 5;

  const getRepeatedList = (list: string[]) => Array.from({ length: numRepeats }).flatMap(() => list);

  const rollDice = () => {
    setIsRolling(true);
    setCurrentResult(null);
    setShowActionButtons(false);

    let spinSpeed = 50; // Initial speed
    let actionInterval: NodeJS.Timeout | null = null;
    let bodyPartInterval: NodeJS.Timeout | null = null;

    const itemHeight = window.innerWidth < 768 ? 24 : 24; // Match minHeight of items

    actionInterval = setInterval(() => {
      if (actionRef.current) {
        actionRef.current.scrollTop += spinSpeed;
        if (actionRef.current.scrollTop >= actionRef.current.scrollHeight - actionRef.current.clientHeight) {
          actionRef.current.scrollTop -= (actionRef.current.scrollHeight - actionRef.current.clientHeight);
        }
        spinSpeed = Math.max(5, spinSpeed * 0.98); // Decelerate
      }
    }, 16); // ~60fps

    bodyPartInterval = setInterval(() => {
      if (bodyPartRef.current) {
        bodyPartRef.current.scrollTop += spinSpeed;
        if (bodyPartRef.current.scrollTop >= bodyPartRef.current.scrollHeight - actionRef.current.clientHeight) {
          bodyPartRef.current.scrollTop -= (bodyPartRef.current.scrollHeight - bodyPartRef.current.clientHeight);
        }
        spinSpeed = Math.max(5, spinSpeed * 0.98);
      }
    }, 16);

    setTimeout(() => {
      if (actionInterval) clearInterval(actionInterval);
      if (bodyPartInterval) clearInterval(bodyPartInterval);

      const finalActionIndex = Math.floor(Math.random() * actions[difficulty].length);
      const finalBodyPartIndex = Math.floor(Math.random() * bodyParts.length);
      const finalAction = actions[difficulty][finalActionIndex];
      const finalBodyPart = bodyParts[finalBodyPartIndex];

      setCurrentResult({
        action: finalAction,
        bodyPart: finalBodyPart,
      });

      const startRepeat = 0; // Start from the beginning of the repeated list

      setTimeout(() => {
        if (actionRef.current) {
          const actionPosition = (startRepeat * actions[difficulty].length + finalActionIndex) * itemHeight;
          actionRef.current.scrollTo({ top: actionPosition, behavior: 'smooth' });
        }
        if (bodyPartRef.current) {
          const bodyPartPosition = (startRepeat * bodyParts.length + finalBodyPartIndex) * itemHeight;
          bodyPartRef.current.scrollTo({ top: bodyPartPosition, behavior: 'smooth' });
        }
      }, 100);

      setIsRolling(false);
      setShowActionButtons(true);
    }, 3000); // Animation duration
  };

  const handleCompleted = () => {
    if (playerTurn === 'Player 1') {
      setPlayer1Score(prev => prev + 1);
    } else {
      setPlayer2Score(prev => prev + 1);
    }
    setPlayerTurn(prev => (prev === 'Player 1' ? 'Player 2' : 'Player 1'));
    setCurrentResult(null);
    setShowActionButtons(false);
  };

  const handleSkip = () => {
    setPlayerTurn(prev => (prev === 'Player 1' ? 'Player 2' : 'Player 1'));
    setCurrentResult(null);
    setShowActionButtons(false);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Cute': return 'bg-blue-500/30 text-white border-blue-500/50';
      case 'Spicy': return 'bg-white/90 text-gray-800 border-white';
      case 'Custom': return 'bg-purple-500/30 text-white border-purple-500/50';
      default: return 'bg-gray-500/30 text-white border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <main className="pt-14 pb-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 space-y-3">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <Dice1 className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent">
                Dice to Spice
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-2">
              Roll the dice and discover exciting combinations of actions and body parts to spice up your intimate moments.
            </p>
          </div>

          {/* Score Bar - Mobile Optimized */}
          <Card variant="elegant" className="bg-black/20 border-purple-500/20 mb-3">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 rounded-full p-3 sm:p-4 relative">
                {/* Player 1 */}
                <div className="flex items-center gap-2 sm:gap-3 text-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-base sm:text-lg">♂</span>
                  </div>
                  <div>
                    <div className="text-sm sm:text-lg font-semibold">Player 1</div>
                    <div className="text-xs sm:text-sm opacity-80">{player1Score} points</div>
                  </div>
                </div>

                {/* VS in center */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg font-bold">VS</span>
                </div>

                {/* Player 2 */}
                <div className="flex items-center gap-2 sm:gap-3 text-white">
                  <div>
                    <div className="text-sm sm:text-lg font-semibold">Player 2</div>
                    <div className="text-xs sm:text-sm opacity-80">{player2Score} points</div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-base sm:text-lg">♀</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Actions Column */}
            <Card variant="elegant" className="bg-black/20 border-purple-500/20">
              <CardHeader className="pb-1 px-2 pt-2">
                <CardTitle className="text-white text-center text-sm">
                  <Heart className="w-3 h-3 inline mr-1" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-1 pb-1">
                <div className="relative h-28 sm:h-32 overflow-hidden rounded-lg" style={{ perspective: '800px' }}>
                  <div
                    ref={actionRef}
                    className="h-full overflow-y-auto no-scrollbar"
                    style={{ scrollBehavior: isRolling ? 'auto' : 'smooth', transformStyle: 'preserve-3d' }}
                  >
                    <div className="space-y-0.5 p-1">
                      {getRepeatedList(actions[difficulty]).map((action, index) => (
                        <div
                          key={index}
                          id={`action-${action}-${index}`}
                          className={`p-1 rounded text-center font-medium text-xs transition-all duration-300 ${
                            currentResult?.action === action && (index % actions[difficulty].length === actions[difficulty].indexOf(currentResult.action))
                              ? 'bg-white text-black border-2 border-purple-500 shadow-lg scale-105 animate-pulse'
                              : 'bg-gray-700/80 text-white hover:bg-gray-600/80'
                          }`}
                          style={{ minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotateX(10deg)', opacity: 0.8 }}
                        >
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Fade overlays for cylinder effect */}
                  <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-purple-900 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-purple-900 to-transparent pointer-events-none"></div>
                </div>
              </CardContent>
            </Card>

            {/* Body Parts Column */}
            <Card variant="elegant" className="bg-black/20 border-purple-500/20">
              <CardHeader className="pb-1 px-2 pt-2">
                <CardTitle className="text-white text-center text-sm">
                  <Users className="w-3 h-3 inline mr-1" />
                  Body Parts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-1 pb-1">
                <div className="relative h-28 sm:h-32 overflow-hidden rounded-lg" style={{ perspective: '800px' }}>
                  <div
                    ref={bodyPartRef}
                    className="h-full overflow-y-auto no-scrollbar"
                    style={{ scrollBehavior: isRolling ? 'auto' : 'smooth', transformStyle: 'preserve-3d' }}
                  >
                    <div className="space-y-0.5 p-1">
                      {getRepeatedList(bodyParts).map((part, index) => (
                        <div
                          key={index}
                          id={`body-part-${part}-${index}`}
                          className={`p-1 rounded text-center font-medium text-xs transition-all duration-300 ${
                            currentResult?.bodyPart === part && (index % bodyParts.length === bodyParts.indexOf(currentResult.bodyPart))
                              ? 'bg-white text-black border-2 border-purple-500 shadow-lg scale-105 animate-pulse'
                              : 'bg-gray-700/80 text-white hover:bg-gray-600/80'
                          }`}
                          style={{ minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotateX(10deg)', opacity: 0.8 }}
                        >
                          {part}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Fade overlays for cylinder effect */}
                  <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-purple-900 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-purple-900 to-transparent pointer-events-none"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Player Turn & Controls */}
          <Card variant="elegant" className="bg-black/20 border-purple-500/20">
            <CardContent className="p-3 sm:p-4">
              {/* Result Display */}
              {currentResult && (
                <div className="mb-3 p-2 sm:p-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-lg border-2 border-yellow-400 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-white mb-1">
                      🎲 {currentResult.action} + {currentResult.bodyPart} 🎲
                    </div>
                    <div className="text-yellow-200 text-xs sm:text-sm">
                      Complete this action on your partner's {currentResult.bodyPart.toLowerCase()}!
                    </div>
                  </div>
                </div>
              )}

              {/* Player Turn */}
              <div className="text-center mb-3">
                <div className="text-lg sm:text-xl font-bold text-white mb-1">
                  {playerTurn}'s Turn
                </div>
                <div className="text-purple-200 text-xs sm:text-sm">Choose a difficulty</div>
              </div>

              {/* Difficulty Selection */}
              <div className="flex justify-center gap-1 sm:gap-2 mb-3">
                {(['Cute', 'Spicy', 'Custom'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 text-xs font-medium transition-all flex flex-col items-center justify-center ${
                      difficulty === level
                        ? getDifficultyColor(level)
                        : 'bg-purple-600/50 border-purple-400/50 text-white/70 hover:bg-purple-600/70'
                    }`}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 flex items-center justify-center">
                      {level === 'Cute' && <span className="text-sm sm:text-base">😘</span>}
                      {level === 'Spicy' && <span className="text-sm sm:text-base">🌶️</span>}
                      {level === 'Custom' && <span className="text-sm sm:text-base">✨</span>}
                    </div>
                    <span className="text-xs leading-tight">{level}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              {showActionButtons ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSkip}
                    className="flex-1 bg-white/90 text-red-500 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-1 shadow-lg hover:bg-white"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    Skip
                  </button>
                  <button
                    onClick={handleCompleted}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-1 shadow-lg hover:from-blue-700 hover:to-blue-600"
                  >
                    <span className="text-sm sm:text-base">✓</span>
                    Completed
                  </button>
                </div>
              ) : (
                <button
                  onClick={rollDice}
                  disabled={isRolling}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 hover:from-blue-700 hover:to-blue-600"
                >
                  <Dice1 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  {isRolling ? 'Rolling...' : 'Roll the Dice'}
                </button>
              )}
            </CardContent>
          </Card>

          {/* Game Tips */}
          <Card variant="elegant" className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300" />
                Game Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/70">
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">Take turns rolling the dice to get random action and body part combinations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">Choose difficulty levels: Cute (gentle), Spicy (intense), or Custom (balanced)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">Complete the action or skip if you're not comfortable</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">First to complete all actions wins!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DiceToSpice;