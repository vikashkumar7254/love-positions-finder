import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import { Heart, Flame, Star, Sparkles, Clock, RefreshCw } from "lucide-react"
import { getPositionsByStyle, getRandomPositions } from "@/data/positions"
import { getCategoryImage, getRandomCategoryImage } from "@/utils/imageManager"
import { getDefaultImageForJourneyStyle, getRandomDefaultImageForJourneyStyle } from "@/utils/defaultImageManager"
import LazyImage from "@/components/LazyImage"
import type { Position, StyleType } from "@/types"

const PositionSelector = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("romantic")
  const [selectedCount, setSelectedCount] = useState(6)
  const [journey, setJourney] = useState<Position[]>([])
  const [loading, setLoading] = useState(false)
  const [renderStyle, setRenderStyle] = useState<StyleType>("romantic")
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)
  
  const styles = [
    { id: "romantic", label: "Romantic", icon: Heart, color: "text-romantic" },
    { id: "passionate", label: "Passionate", icon: Flame, color: "text-passionate" },
    { id: "adventurous", label: "Adventurous", icon: Star, color: "text-sensual" },
    { id: "mixed", label: "Mixed", icon: Sparkles, color: "text-warm" }
  ]
  
  const counts = [3, 4, 5, 6]

  const availablePool = useMemo(() => {
    // combine curated by style and a fallback random pool
    const base = getPositionsByStyle(selectedStyle)
    if (base.length >= selectedCount) return base
    return [
      ...base,
      ...getRandomPositions(60).filter(p => p.style === selectedStyle || selectedStyle === 'mixed')
    ]
  }, [selectedStyle, selectedCount])

  const generateJourney = () => {
    setLoading(true)
    setTimeout(() => {
      const shuffled = [...availablePool].sort(() => Math.random() - 0.5)
      const picked = shuffled.slice(0, selectedCount)
      setJourney(picked)
      // lock the style used to render cards until next generation
      setRenderStyle(selectedStyle)
      setLoading(false)
    }, 300)
  }

  // Close lightbox on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxUrl(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="py-6 px-6">
      <div className="max-w-6xl mx-auto">
        <Card 
          variant="elegant" 
          className="animate-slide-up bg-gradient-to-b from-romantic/20 to-background/40 border border-romantic/20"
        >
          <CardHeader>
            <CardTitle>Choose Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Style</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {styles.map((style) => (
                      <Button
                        key={style.id}
                        variant={selectedStyle === style.id ? "romantic" : "outline"}
                        onClick={() => setSelectedStyle(style.id as StyleType)}
                        className="h-auto p-3 flex flex-col gap-1"
                      >
                        <style.icon className={`w-5 h-5 ${selectedStyle === style.id ? 'text-white' : style.color}`} />
                        <span className="text-xs">{style.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Positions</h3>
                  <div className="flex flex-wrap gap-2">
                    {counts.map((count) => (
                      <Button
                        key={count}
                        variant={selectedCount === count ? "passionate" : "outline"}
                        onClick={() => setSelectedCount(count)}
                        className="w-12 h-12 text-base font-semibold"
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <Button variant="hero" size="lg" className="w-full" onClick={generateJourney} disabled={loading}>
                    <Heart className="w-5 h-5" />
                    {loading ? 'Generating...' : 'Generate Journey'}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Select options and generate your personalized journey.</p>
                </div>
              </div>

              {/* Results grid */}
              <div className="lg:col-span-2">
                {journey.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-romantic/30 p-8 text-center text-foreground/70 bg-background/30">
                    Select style and count, then generate your sequence. Cards will appear here.
                  </div>
                ) : (
                  <div className={`grid gap-5 ${selectedCount <= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                    {journey.map((p, idx) => (
                      <div key={p.id || `${p.name}-${idx}`} className="rounded-xl overflow-hidden bg-gradient-to-b from-romantic/10 to-background/20 border border-romantic/20 shadow-sm">
                        <div className="relative">
                          {(() => {
                            // Use position's imageUrl if available, otherwise use customizable default images
                            const base = p.imageUrl || getDefaultImageForJourneyStyle(renderStyle)
                            const hiRes = p.imageUrl || getDefaultImageForJourneyStyle(renderStyle)
                            return (
                              // eslint-disable-next-line @next/next/no-img-element
                              <LazyImage
                                src={base}
                                alt={p.name}
                                className="w-full h-44 object-contain cursor-zoom-in"
                                onClick={() => setLightboxUrl(hiRes)}
                                width={400}
                                height={300}
                              />
                            )
                          })()}
                          <span className="absolute -top-3 -left-3 bg-romantic text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow ring-2 ring-background/60">{idx + 1}</span>
                        </div>
                        <div className="p-4">
                          <div className="font-semibold mb-2 text-foreground">{p.name}</div>
                          <ul className="text-sm text-foreground/80 space-y-1 mb-3">
                            {(p.instructions?.slice(0,3) || []).map((ins, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-romantic" />
                                <span>{ins}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-2 text-xs text-foreground/70">
                            <Clock className="w-3 h-3" />
                            <span>{p.duration || '3-5 mins'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {journey.length > 0 && (
                  <div className="flex justify-center">
                    <Button 
                      variant="hero" 
                      className="mt-5 rounded-full px-5 py-2 bg-gradient-to-r from-romantic to-passionate text-white shadow transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                      onClick={generateJourney}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Generate New Sequence
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lightbox Modal */}
        {lightboxUrl && (
          <div 
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxUrl(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={lightboxUrl} 
              alt="Preview" 
              className="max-w-[95vw] max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default PositionSelector