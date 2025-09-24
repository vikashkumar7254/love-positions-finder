import { Button } from "@/components/ui/enhanced-button"
import { Heart, Stars, Sparkles } from "lucide-react"
import heroBg from "@/assets/hero-bg.jpg"

const LoveHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/40" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 w-8 h-8 text-romantic/30 animate-float" style={{ animationDelay: '0s' }} />
        <Sparkles className="absolute top-40 right-20 w-6 h-6 text-passionate/40 animate-float" style={{ animationDelay: '1s' }} />
        <Stars className="absolute bottom-40 left-20 w-10 h-10 text-sensual/30 animate-float" style={{ animationDelay: '2s' }} />
        <Heart className="absolute bottom-20 right-10 w-6 h-6 text-romantic/40 animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-8 h-8 text-romantic animate-heart-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              LovePositions
            </h1>
            <Heart className="w-8 h-8 text-romantic animate-heart-pulse" />
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover intimate connections through 500+ romantic positions designed to deepen your bond and ignite passion
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="xl" className="min-w-[200px]">
              <Heart className="w-5 h-5" />
              Create Love Journey
            </Button>
            <Button variant="tender" size="xl" className="min-w-[200px]">
              <Sparkles className="w-5 h-5" />
              Explore Positions
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Love Positions</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl font-bold text-white mb-2">❤️</div>
              <div className="text-white/80">Kama Sutra Inspired</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl font-bold text-white mb-2">✨</div>
              <div className="text-white/80">Customizable Journey</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoveHero