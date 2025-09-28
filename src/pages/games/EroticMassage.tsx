import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Play, Pause, Volume2, VolumeX, Heart, Sparkles, Clock, Users, Music, Flame, Timer, Star, CheckCircle } from "lucide-react"
import Navigation from "@/components/Navigation"
import { freeAmbientTracks, getTracksByCategory, type MusicTrack } from "@/utils/musicApi"

interface MassageStep {
  id: string
  title: string
  duration: string
  description: string
  instructions: string[]
  tips: string[]
}

const EroticMassage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string>('sensual')
  const audioRef = useRef<HTMLAudioElement>(null)

  // Get music tracks from the API utility
  const musicTracks = freeAmbientTracks

  const massageSteps: MassageStep[] = [
    {
      id: 'preparation',
      title: 'Create Intimate Moments',
      duration: '5-10 minutes',
      description: 'Set the perfect atmosphere for your sensual massage journey',
      instructions: [
        'Dim the lights and light some candles',
        'Warm the massage oil in your hands',
        'Ensure the room temperature is comfortable',
        'Put on relaxing, sensual music'
      ],
      tips: [
        'Use high-quality massage oils',
        'Remove all distractions (phones, etc.)',
        'Communicate with your partner about preferences'
      ]
    },
    {
      id: 'shoulders',
      title: 'Shoulder & Neck Release',
      duration: '8-12 minutes',
      description: 'Begin with gentle, relaxing touches to release tension',
      instructions: [
        'Start with light, feathery touches',
        'Use circular motions on the shoulders',
        'Apply gentle pressure to neck muscles',
        'Work slowly and sensually'
      ],
      tips: [
        'Pay attention to your partner\'s responses',
        'Use varying pressure levels',
        'Focus on areas of tension'
      ]
    },
    {
      id: 'back',
      title: 'Full Back Exploration',
      duration: '15-20 minutes',
      description: 'Explore every inch with passionate, loving touches',
      instructions: [
        'Use long, flowing strokes down the back',
        'Apply warm oil generously',
        'Focus on the spine and lower back',
        'Include teasing, light touches'
      ],
      tips: [
        'Vary your touch from light to firm',
        'Use your whole hands, not just fingertips',
        'Build anticipation with your movements'
      ]
    },
    {
      id: 'legs',
      title: 'Leg & Thigh Massage',
      duration: '10-15 minutes',
      description: 'Sensual leg massage building intimate connection',
      instructions: [
        'Start from the feet and work upward',
        'Use firm pressure on calf muscles',
        'Be gentle and teasing on inner thighs',
        'Focus on creating pleasure and relaxation'
      ],
      tips: [
        'Take your time with each area',
        'Watch for your partner\'s reactions',
        'Build intimacy through eye contact'
      ]
    },
    {
      id: 'intimate',
      title: 'Intimate Connection',
      duration: '20+ minutes',
      description: 'Deepen your connection through passionate touch',
      instructions: [
        'Focus on your partner\'s most sensitive areas',
        'Use a combination of massage and caresses',
        'Communicate desires and boundaries',
        'Let passion guide your movements'
      ],
      tips: [
        'Consent and communication are essential',
        'Focus on giving pleasure to your partner'
      ]
    }
  ]

  // Generate demo audio using Web Audio API
  const generateDemoAudio = (frequency: number, duration: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
    
    return audioContext
  }

  const playTrack = async (track: MusicTrack) => {
    if (audioRef.current) {
      try {
        // For demo purposes, generate a simple tone instead of loading external audio
        const frequencies = {
          'sensual': 220,    // A3 - calm, low frequency
          'romantic': 330,   // E4 - warm, middle frequency  
          'passionate': 440  // A4 - energetic, higher frequency
        }
        
        const frequency = frequencies[track.category as keyof typeof frequencies] || 330
        
        // Generate demo audio
        const audioContext = generateDemoAudio(frequency, 3) // 3 second demo tone
        
        setCurrentTrack(track)
        setIsPlaying(true)
        
        // Auto stop after 3 seconds for demo
        setTimeout(() => {
          setIsPlaying(false)
          audioContext.close()
        }, 3000)
        
        // Show demo message
        alert(`Playing demo tone for "${track.title}"\n\nIn a real app, this would play actual ambient music from:\n• Spotify API\n• YouTube Music\n• Local audio files\n• Streaming services`)
        
      } catch (error) {
        console.error('Error playing audio:', error)
        alert(`Demo audio generation failed. Your browser might not support Web Audio API.`)
      }
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <audio ref={audioRef} />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="w-12 h-12 text-pink-300" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent">
                Sensual Massage Journey
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Master the art of sensual touch. Learn tantalizing techniques to find secret pleasure spots and build waves of sensation.
            </p>
          </div>

          {/* Create Intimate Moments */}
          <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-300" />
                Create Intimate Moments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🕯️', text: 'Candlelight' },
                  { icon: '🎵', text: 'Soft Music' },
                  { icon: '🌹', text: 'Rose Petals' },
                  { icon: '💆', text: 'Massage Oil' },
                  { icon: '🍷', text: 'Wine' },
                  { icon: '🛁', text: 'Warm Bath' },
                  { icon: '🌙', text: 'Dim Lights' },
                  { icon: '💝', text: 'Surprises' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white/80 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Music Player */}
          <Card variant="elegant" className="bg-black/30 border-purple-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-300" />
                Intimate Massage Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Selection */}
              <div>
                <h3 className="text-white font-bold mb-4">Mood</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'sensual', label: 'Sensual', color: 'from-pink-500 to-purple-500', icon: Heart },
                    { id: 'romantic', label: 'Romantic', color: 'from-purple-500 to-pink-500', icon: Sparkles },
                    { id: 'passionate', label: 'Passionate', color: 'from-red-500 to-orange-500', icon: Flame }
                  ].map((mood) => {
                    const IconComponent = mood.icon
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedMood === mood.id 
                            ? `bg-gradient-to-br ${mood.color} border-white/30 shadow-lg` 
                            : 'bg-black/20 border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <IconComponent className="w-6 h-6 text-white" />
                          <span className="font-bold text-white text-sm">{mood.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Demo Notice */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-yellow-300">
                  <Music className="w-4 h-4" />
                  <span className="font-medium text-sm">Demo Mode</span>
                </div>
                <p className="text-yellow-200/80 text-xs mt-1">
                  This is a demo with placeholder audio. In production, you would integrate with Spotify, YouTube Music, or upload your own ambient tracks.
                </p>
              </div>

              {/* Music Tracks */}
              <div className="space-y-3">
                {getTracksByCategory(selectedMood).map((track) => (
                  <div key={track.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => playTrack(track)}
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center hover:scale-105 transition-all duration-300"
                        title="Click to play demo audio"
                      >
                        <Play className="w-5 h-5 text-white ml-1" />
                      </button>
                      <div>
                        <div className="text-white font-medium">{track.title}</div>
                        <div className="text-white/60 text-sm">{track.artist}</div>
                        <div className="text-white/40 text-xs">{track.description}</div>
                      </div>
                    </div>
                    <div className="text-white/60 text-sm">{track.duration}</div>
                  </div>
                ))}
              </div>

              {/* Music Controls */}
              {currentTrack && (
                <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-white font-medium">{currentTrack.title}</div>
                      <div className="text-white/60 text-sm">{currentTrack.artist}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
                      </button>
                      <button onClick={toggleMute} className="text-white/70 hover:text-white">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-white/60" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-white/20 rounded-lg appearance-none slider"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Massage Steps */}
          <div className="space-y-6">
            {massageSteps.map((step, index) => (
              <Card key={step.id} variant="elegant" className="bg-black/20 border-white/10 shadow-2xl rounded-2xl backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {step.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{step.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-white/80 text-lg">{step.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        Instructions
                      </h4>
                      <ul className="space-y-2">
                        {step.instructions.map((instruction, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-300 mt-2 flex-shrink-0"></span>
                            <span className="text-sm">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-300" />
                        Pro Tips
                      </h4>
                      <ul className="space-y-2">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-2 flex-shrink-0"></span>
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="elegant" className="bg-black/20 border-pink-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-300" />
                  Benefits of Sensual Massage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Deepens emotional connection',
                  'Reduces stress and tension',
                  'Increases intimacy and trust',
                  'Enhances physical pleasure',
                  'Improves communication',
                  'Creates lasting memories'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card variant="elegant" className="bg-black/20 border-purple-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  Essential Massage Techniques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Effleurage', desc: 'Long, flowing strokes' },
                  { name: 'Petrissage', desc: 'Kneading and squeezing' },
                  { name: 'Friction', desc: 'Deep circular movements' },
                  { name: 'Feathering', desc: 'Light, teasing touches' },
                  { name: 'Pressure Points', desc: 'Targeted relief areas' },
                  { name: 'Sensual Caressing', desc: 'Intimate, loving touches' }
                ].map((technique, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-300"></span>
                      <span className="text-white font-medium">{technique.name}</span>
                    </div>
                    <p className="text-white/60 text-sm ml-4">{technique.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Tips for Perfect Experience */}
          <Card variant="elegant" className="bg-black/20 border-red-500/20 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Timer className="w-5 h-5 text-red-300" />
                Tips for a Perfect Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-4">Set the Mood</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2"></span>
                      <span className="text-sm">Create a warm, comfortable environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-300 mt-2"></span>
                      <span className="text-sm">Use soft lighting and candles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mt-2"></span>
                      <span className="text-sm">Play relaxing, sensual music</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-2"></span>
                      <span className="text-sm">Remove all distractions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Communication</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300 mt-2"></span>
                      <span className="text-sm">Ask about pressure preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2"></span>
                      <span className="text-sm">Check in regularly during massage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-2"></span>
                      <span className="text-sm">Respect boundaries and comfort levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-300 mt-2"></span>
                      <span className="text-sm">Express what feels good</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default EroticMassage
