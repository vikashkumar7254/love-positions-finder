import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Shield, Heart, X, Lock, Users, AlertTriangle } from "lucide-react"

interface AgeVerificationProps {
  onVerified: () => void
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
    const raw = localStorage.getItem("lovePositionsVerified")
    let shouldShow = true

    if (raw) {
      try {
        if (raw === "true") {
          // migrate legacy flag to timestamp now
          const payload = { verifiedAt: Date.now() }
          localStorage.setItem("lovePositionsVerified", JSON.stringify(payload))
          shouldShow = false
        } else {
          const data = JSON.parse(raw) as { verifiedAt?: number }
          if (data?.verifiedAt && Date.now() - data.verifiedAt < TTL_MS) {
            shouldShow = false
          }
        }
      } catch {
        // corrupt value -> force show and reset
        shouldShow = true
      }
    }

    if (shouldShow) {
      setIsVisible(true)
      // Add entrance animation delay
      setTimeout(() => setIsAnimating(true), 100)
    } else {
      onVerified()
    }
  }, [onVerified])

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      const payload = { verifiedAt: Date.now() }
      localStorage.setItem("lovePositionsVerified", JSON.stringify(payload))
      setIsAnimating(false)
      // Smooth exit animation
      setTimeout(() => {
        setIsVisible(false)
        onVerified()
      }, 300)
    } else {
      // Redirect to a family-friendly alternative
      window.location.href = "https://www.google.com"
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 py-10 md:py-14">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-romantic/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-passionate/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card 
        variant="elegant" 
        className={`max-w-lg w-full relative transform transition-all duration-500 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } shadow-2xl border-romantic/20 rounded-3xl overflow-hidden`}
      >
        {/* Cute top ribbon */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-romantic via-passionate to-sensual" />
        {/* Floating hearts background accents */}
        <div className="pointer-events-none absolute -top-8 right-6 text-romantic/20 animate-bounce-slow">
          <Heart className="w-6 h-6" />
        </div>
        <div className="pointer-events-none absolute -bottom-8 left-6 text-passionate/20 animate-bounce-slower">
          <Heart className="w-7 h-7" />
        </div>
        {/* Top-right close that redirects minors */}
        <button
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center"
          onClick={() => handleVerify(false)}
        >
          <X className="w-4 h-4" />
        </button>

        <CardHeader className="text-center pb-4 pt-6">
          {/* Enhanced icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-romantic rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-passionate rounded-full flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <CardTitle className="text-3xl text-foreground mb-1">
            Age Verification
          </CardTitle>
          <p className="text-muted-foreground">
            You must be 18 years or older to access this content.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Content warning */}
          <div className="bg-warm/10 border border-warm/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warm flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-warm mb-1">Content Notice</p>
                <p className="text-muted-foreground">
                  Our platform provides educational content about intimacy and relationships for adults 18+.
                </p>
              </div>
            </div>
          </div>

          {/* Age verification question */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Please confirm your age</h3>
            <p className="text-sm text-muted-foreground mb-6">
              You must be 18+ to continue.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleVerify(false)}
                data-testid="button-verify-minor"
              >
                I'm under 18
              </Button>

              <Button 
                variant="hero" 
                size="xl" 
                className="w-full group rounded-2xl"
                onClick={() => handleVerify(true)}
                data-testid="button-verify-adult"
              >
                I'm 18 or older
              </Button>
            </div>
          </div>

          {/* Features preview */}
          <div className="border-t pt-6">
            <h4 className="text-sm font-semibold text-center mb-4">What you'll discover:</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4 text-romantic" />
                <span>Relationship guides</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="w-4 h-4 text-passionate" />
                <span>Intimate positions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 text-sensual" />
                <span>Safe & educational</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="w-4 h-4 text-warm" />
                <span>Private & secure</span>
              </div>
            </div>
          </div>

          {/* Legal disclaimer */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground leading-relaxed">
              This verification helps us comply with legal requirements. Your choice is stored locally and never transmitted. 
              By proceeding, you agree that you are of legal age and consent to viewing educational adult content.
            </p>
          </div>
        </CardContent>

        {/* Cute bottom ribbon */}
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-sensual via-romantic to-passionate" />
      </Card>
    </div>
  )
}

export default AgeVerification