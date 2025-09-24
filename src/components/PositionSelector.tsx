import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import { Heart, Flame, Star, Sparkles } from "lucide-react"

const PositionSelector = () => {
  const [selectedStyle, setSelectedStyle] = useState("romantic")
  const [selectedCount, setSelectedCount] = useState(6)
  
  const styles = [
    { id: "romantic", label: "Romantic", icon: Heart, color: "text-romantic" },
    { id: "passionate", label: "Passionate", icon: Flame, color: "text-passionate" },
    { id: "adventurous", label: "Adventurous", icon: Star, color: "text-sensual" },
    { id: "mixed", label: "Mixed", icon: Sparkles, color: "text-warm" }
  ]
  
  const counts = [3, 4, 5, 6]

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-romantic bg-clip-text text-transparent">
            Create Your Perfect Love Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most intimate positions for your next romantic moment together
          </p>
        </div>
        
        <Card variant="romantic" className="animate-slide-up">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Choose Your Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Style Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {styles.map((style) => (
                  <Button
                    key={style.id}
                    variant={selectedStyle === style.id ? "romantic" : "outline"}
                    onClick={() => setSelectedStyle(style.id)}
                    className="h-auto p-4 flex flex-col gap-2"
                  >
                    <style.icon className={`w-6 h-6 ${selectedStyle === style.id ? 'text-white' : style.color}`} />
                    <span className="text-sm">{style.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Count Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Positions</h3>
              <div className="flex justify-center gap-3">
                {counts.map((count) => (
                  <Button
                    key={count}
                    variant={selectedCount === count ? "passionate" : "outline"}
                    onClick={() => setSelectedCount(count)}
                    className="w-16 h-16 text-lg font-bold"
                  >
                    {count}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Generate Button */}
            <div className="text-center pt-4">
              <Button variant="hero" size="xl" className="min-w-[250px]">
                <Heart className="w-5 h-5" />
                Generate Love Journey
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Select options and generate your personalized journey
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default PositionSelector