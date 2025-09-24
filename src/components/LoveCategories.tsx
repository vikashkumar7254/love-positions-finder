import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Heart, Flame, Star, Moon, Sun, Flower, Sparkles, Crown, Gift, Music } from "lucide-react"

const LoveCategories = () => {
  const categories = [
    {
      icon: Heart,
      title: "Sensual Romance",
      description: "Tender moments of deep connection",
      color: "text-romantic",
      bgColor: "bg-romantic/10"
    },
    {
      icon: Flame,
      title: "Passionate Fire",
      description: "Intense and fiery intimate experiences",
      color: "text-passionate",
      bgColor: "bg-passionate/10"
    },
    {
      icon: Star,
      title: "Fantasy Dreams",
      description: "Explore your deepest desires together",
      color: "text-sensual",
      bgColor: "bg-sensual/10"
    },
    {
      icon: Crown,
      title: "Luxury Indulgence",
      description: "Premium intimate experiences",
      color: "text-warm",
      bgColor: "bg-warm/10"
    },
    {
      icon: Moon,
      title: "Midnight Mysteries",
      description: "Enchanting nocturnal connections",
      color: "text-romantic",
      bgColor: "bg-romantic/10"
    },
    {
      icon: Flower,
      title: "Garden of Love",
      description: "Natural and organic intimacy",
      color: "text-passionate",
      bgColor: "bg-passionate/10"
    },
    {
      icon: Sparkles,
      title: "Magic Moments",
      description: "Spellbinding romantic adventures",
      color: "text-sensual",
      bgColor: "bg-sensual/10"
    },
    {
      icon: Sun,
      title: "Morning Bliss",
      description: "Start your day with tender love",
      color: "text-warm",
      bgColor: "bg-warm/10"
    },
    {
      icon: Gift,
      title: "Special Occasions",
      description: "Perfect for anniversaries and celebrations",
      color: "text-romantic",
      bgColor: "bg-romantic/10"
    },
    {
      icon: Music,
      title: "Rhythmic Romance",
      description: "Move to the beat of your hearts",
      color: "text-passionate",
      bgColor: "bg-passionate/10"
    }
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Love Desires Guide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore your deepest desires and fantasies together in this intimate journey of pleasure and connection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card 
              key={category.title}
              variant="elegant" 
              className="group cursor-pointer hover-tender animate-slide-up text-center"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="pb-3">
                <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="romantic" className="animate-slide-up hover-romantic" style={{ animationDelay: '0.7s' }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-romantic" />
                <CardTitle className="text-xl">Sensual Teasing Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-romantic mb-2">Seductive Romance</h4>
                  <p className="text-sm text-muted-foreground">Master the art of slow seduction</p>
                </div>
                <div>
                  <h4 className="font-semibold text-romantic mb-2">Anticipation Building</h4>
                  <p className="text-sm text-muted-foreground">Build excitement throughout the day</p>
                </div>
                <Button variant="romantic" className="w-full mt-4">
                  Explore Romance
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="passionate" className="animate-slide-up hover-romantic" style={{ animationDelay: '0.8s' }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8 text-passionate" />
                <CardTitle className="text-xl">Passionate Connections</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-passionate mb-2">Fiery Embrace</h4>
                  <p className="text-sm text-muted-foreground">Intense moments of deep connection</p>
                </div>
                <div>
                  <h4 className="font-semibold text-passionate mb-2">Burning Desire</h4>
                  <p className="text-sm text-muted-foreground">Let passion guide your journey</p>
                </div>
                <Button variant="passionate" className="w-full mt-4">
                  Ignite Passion
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elegant" className="animate-slide-up hover-romantic" style={{ animationDelay: '0.9s' }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-sensual" />
                <CardTitle className="text-xl">Magical Moments</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sensual mb-2">Enchanted Evening</h4>
                  <p className="text-sm text-muted-foreground">Create unforgettable memories</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sensual mb-2">Dream Fulfillment</h4>
                  <p className="text-sm text-muted-foreground">Make fantasies come true</p>
                </div>
                <Button variant="tender" className="w-full mt-4">
                  Create Magic
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default LoveCategories