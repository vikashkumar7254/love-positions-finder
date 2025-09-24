import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Shield, Heart, X } from "lucide-react"

interface AgeVerificationProps {
  onVerified: () => void
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem("lovePositionsVerified")
    if (!verified) {
      setIsVisible(true)
    } else {
      onVerified()
    }
  }, [onVerified])

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("lovePositionsVerified", "true")
      setIsVisible(false)
      onVerified()
    } else {
      window.location.href = "https://www.google.com"
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card variant="elegant" className="max-w-md w-full animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-romantic/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-romantic" />
            </div>
          </div>
          <CardTitle className="text-2xl text-romantic">Age Verification</CardTitle>
          <p className="text-muted-foreground mt-2">
            You must be 18 years or older to access this content.
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="font-medium">Please confirm your age</p>
          
          <div className="space-y-3">
            <Button 
              variant="romantic" 
              size="lg" 
              className="w-full"
              onClick={() => handleVerify(true)}
            >
              <Heart className="w-5 h-5" />
              I'm 18 or older
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => handleVerify(false)}
            >
              <X className="w-5 h-5" />
              I'm under 18
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            This site contains adult content and is intended for mature audiences only.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgeVerification