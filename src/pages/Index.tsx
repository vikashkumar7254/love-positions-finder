import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Grid3X3, Heart, Star, Sparkles, Dice6, Gamepad2, Quote, Compass, Gift, Lock, Flame, Wand2, FlaskConical, Music2, Moon, Wind, Wine, PartyPopper, Palette, Shuffle } from "lucide-react"
import PositionSelector from "@/components/PositionSelector"
import ScratchCards from "@/components/ScratchCards"
import RomanticIdeas from "@/components/RomanticIdeas"
import { getCategoryImage } from "@/utils/imageManager"

const Index = () => {
  useEffect(() => {
    const title = "ScratchSexPositions | 500+ Positions, Games & Romantic Ideas"
    const desc = "Explore 500+ intimate positions, interactive games, and romantic guides. Create custom posters and plan your perfect intimate journey."
    const url = window.location.origin
    const image = getCategoryImage('homepage', "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=630&fit=crop&crop=center")

    document.title = title

    // Google site verification
    let googleVerification = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement | null
    if (!googleVerification) {
      googleVerification = document.createElement('meta')
      googleVerification.name = 'google-site-verification'
      document.head.appendChild(googleVerification)
    }
    googleVerification.content = 'UbHLGFZRitXzyw7wZ0OpUI1Aveb7wpsfy9rqxS1cTRM'

    // Basic meta tags
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null
    if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property','og:title'); document.head.appendChild(ogTitle) }
    ogTitle.content = title

    let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null
    if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute('property','og:description'); document.head.appendChild(ogDesc) }
    ogDesc.content = desc

    let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null
    if (!ogImage) { ogImage = document.createElement('meta'); ogImage.setAttribute('property','og:image'); document.head.appendChild(ogImage) }
    ogImage.content = image

    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null
    if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property','og:url'); document.head.appendChild(ogUrl) }
    ogUrl.content = url

    let ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement | null
    if (!ogType) { ogType = document.createElement('meta'); ogType.setAttribute('property','og:type'); document.head.appendChild(ogType) }
    ogType.content = 'website'

    let ogSiteName = document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement | null
    if (!ogSiteName) { ogSiteName = document.createElement('meta'); ogSiteName.setAttribute('property','og:site_name'); document.head.appendChild(ogSiteName) }
    ogSiteName.content = 'ScratchSexPositions'

    // Twitter Card tags
    let twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement | null
    if (!twitterCard) { twitterCard = document.createElement('meta'); twitterCard.name = 'twitter:card'; document.head.appendChild(twitterCard) }
    twitterCard.content = 'summary_large_image'

    let twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null
    if (!twitterTitle) { twitterTitle = document.createElement('meta'); twitterTitle.name = 'twitter:title'; document.head.appendChild(twitterTitle) }
    twitterTitle.content = title

    let twitterDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null
    if (!twitterDesc) { twitterDesc = document.createElement('meta'); twitterDesc.name = 'twitter:description'; document.head.appendChild(twitterDesc) }
    twitterDesc.content = desc

    let twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null
    if (!twitterImage) { twitterImage = document.createElement('meta'); twitterImage.name = 'twitter:image'; document.head.appendChild(twitterImage) }
    twitterImage.content = image

    // Additional SEO meta tags
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots) }
    robots.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

    let author = document.querySelector('meta[name="author"]') as HTMLMetaElement | null
    if (!author) { author = document.createElement('meta'); author.name = 'author'; document.head.appendChild(author) }
    author.content = 'ScratchSexPositions'

    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
    if (!keywords) { keywords = document.createElement('meta'); keywords.name = 'keywords'; document.head.appendChild(keywords) }
    keywords.content = 'sex positions, intimate positions, love positions, romantic games, intimacy guide, relationship tips, adult games, scratch cards, position generator'

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ScratchSexPositions",
      "description": desc,
      "url": url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${url}/?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)
  }, [])
  const sampleScratchCards = [
    { id: 1, title: "Wrapped Cradle", description: "Close, cozy, and romantic", revealed: false },
    { id: 2, title: "Tucked Missionary 180", description: "Gentle angle, intimate eye contact", revealed: false },
    { id: 3, title: "Standing Groundhog", description: "Playful and balanced stance", revealed: false },
    { id: 4, title: "Pressed Butterfly", description: "Comfortable and connected", revealed: false },
    { id: 5, title: "Lazy Rodeo", description: "Relaxed and affectionate", revealed: false },
    { id: 6, title: "Kneeling Cradle", description: "Embrace with closeness", revealed: false },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 bg-gradient-hero">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="lg:hidden text-center text-white">
            <div className="mb-6">
              <p className="uppercase tracking-wide text-white/80 mb-3 text-sm font-medium">ScratchSexPositions</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">Level Up Your Intimate Life</h1>
              <p className="text-white/90 mb-6 text-base leading-relaxed max-w-2xl mx-auto">
                Explore our collection of 500+ intimate positions, from romantic to adventurous. Perfect for couples seeking to enhance their connection.
              </p>
            </div>
            
            {/* Stats Cards Mobile */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1">500+</div>
                <div className="text-xs text-white/80">Sex Positions</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1">❤️</div>
                <div className="text-xs text-white/80">Kama Sutra Inspired</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1">✨</div>
                <div className="text-xs text-white/80">Customizable Poster</div>
              </div>
            </div>
            
            {/* Buttons Mobile */}
            <div className="space-y-3">
              <Link to="/positions/custom-poster" className="block">
                <Button variant="hero" className="w-full py-3 text-base font-semibold">
                  <Palette className="w-5 h-5 mr-2"/>
                  Create Your Poster
                </Button>
              </Link>
              <Link to="/positions/all" className="block">
                <Button variant="tender" className="w-full py-3 text-base font-semibold">
                  <Grid3X3 className="w-5 h-5 mr-2"/>
                  Explore Positions
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-6 items-center">
            <div className="col-span-2 text-white">
              <p className="uppercase tracking-wide text-white/80 mb-2 text-base">ScratchSexPositions</p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">Level Up Your Intimate Life</h1>
              <p className="text-white/90 mb-6 max-w-2xl text-lg">
                Explore our collection of 500+ intimate positions, from romantic to adventurous. Perfect for couples seeking to enhance their connection.
              </p>
              <div className="flex gap-3">
                <Link to="/positions/custom-poster"><Button variant="hero" className="text-base"><Palette className="w-4 h-4 mr-2"/> Create Your Poster</Button></Link>
                <Link to="/positions/all"><Button variant="tender" className="text-base"><Grid3X3 className="w-4 h-4 mr-2"/> Explore Positions</Button></Link>
              </div>
            </div>
            <Card variant="elegant" className="bg-white/20 backdrop-blur-sm">
              <CardContent className="p-6 grid grid-cols-3 gap-4 text-center text-white">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Sex Positions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">❤️</div>
                  <div className="text-sm">Kama Sutra Inspired</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">✨</div>
                  <div className="text-sm">Customizable Poster</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Most Popular pills temporarily removed per request */}
      </section>

      {/* Quick Explore Grid (2x4) */}
      <section className="px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* 1. Random Positions */}
            <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-purple-500/30 bg-gradient-to-b from-purple-500/25 to-purple-500/10 border border-purple-500/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/games/random-position" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-purple-500/25 group-hover:bg-purple-500/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <Shuffle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-400" />
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">Random Positions</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">Get instant random position suggestions with a single click.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">Instant</span>
                      <span className="px-2 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-medium">Random</span>
                    </div>
                    <div className="text-center">
                      <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Generate →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* 2. Spin for Desire */}
            <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-romantic/30 bg-gradient-to-b from-romantic/25 to-romantic/10 border border-romantic/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/games/spin-for-desire" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-romantic/25 group-hover:bg-romantic/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-romantic" />
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">Spin for Desire</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">Spin to pick a playful prompt or fantasy.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full bg-romantic/20 text-romantic text-xs font-medium">New</span>
                      <span className="px-2 py-1 rounded-full bg-warm/20 text-warm text-xs font-medium">Playful</span>
                    </div>
                    <div className="text-center">
                      <span className="text-romantic group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Explore →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* 3. Custom Position (Poster) */}
            <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-romantic/30 bg-gradient-to-b from-romantic/25 to-romantic/10 border border-romantic/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/positions/custom-poster" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-romantic/25 group-hover:bg-romantic/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <Palette className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-romantic" />
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">Custom Poster</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">Design your own collection of favorite positions.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-romantic/20 text-romantic">Creator</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-passionate/20 text-passionate">Free</span>
                    </div>
                    <div className="text-center">
                      <span className="text-romantic group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Create →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* 4. Passion Dice */}
            <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-romantic/30 bg-gradient-to-b from-romantic/25 to-romantic/10 border border-romantic/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/games/passion-dice" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-romantic/25 group-hover:bg-romantic/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <Dice6 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-romantic" />
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">Passion Dice</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">Roll for pleasure! Each combination reveals a steamy action - from gentle teasing to passionate encounters.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-passionate/20 text-passionate">Hot</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-warm/20 text-warm">Steamy</span>
                    </div>
                    <div className="text-center">
                      <span className="text-romantic group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Roll →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* 5. Honeymoon Bucket */}
            <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-romantic/30 bg-gradient-to-b from-romantic/25 to-romantic/10 border border-romantic/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/games/honeymoon-bucket-list" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-romantic/25 group-hover:bg-romantic/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <Gift className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-romantic" />
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">Honeymoon Bucket List</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">A sweet checklist of romantic honeymoon ideas.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-romantic/20 text-romantic">Romance</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-warm/20 text-warm">Ideas</span>
                    </div>
                    <div className="text-center">
                      <span className="text-romantic group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Open →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* 6. First Night Bucket List */}
            <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-romantic/30 bg-gradient-to-b from-romantic/25 to-romantic/10 border border-romantic/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/games/first-night-bucket-list" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-romantic/25 group-hover:bg-romantic/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-romantic" />
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">First Night Bucket List</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">Gentle and memorable ideas for your special night.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-romantic/20 text-romantic">Sweet</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-passionate/20 text-passionate">Memories</span>
                    </div>
                    <div className="text-center">
                      <span className="text-romantic group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Open →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
            {/* 7. Scratch Random Position */}
             <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-romantic/30 bg-gradient-to-b from-romantic/25 to-romantic/10 border border-romantic/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/games/scratch-position" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-romantic/25 group-hover:bg-romantic/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-romantic" />
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">Scratch Position</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">Get a random intimate position to try right now.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-romantic/20 text-romantic">Popular</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-passionate/20 text-passionate">Fun</span>
                    </div>
                    <div className="text-center">
                      <span className="text-romantic group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Explore →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* 8. Dice to Spice Game */}
            <Card variant="elegant" className="hover-romantic transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-romantic/30 bg-gradient-to-b from-romantic/25 to-romantic/10 border border-romantic/20">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Link to="/games/dice-to-spice" className="block group">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-romantic/25 group-hover:bg-romantic/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto mb-2">
                      <div className="flex gap-1">
                        <Dice6 className="w-3 h-3 text-romantic" />
                        <Dice6 className="w-3 h-3 text-romantic" />
                      </div>
                    </div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-foreground">Dice to Spice</div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/80 mb-3 leading-relaxed text-center">Roll two dice for exciting combinations! One shows actions, the other body parts. Choose from Cute, Spicy, or Custom difficulty levels.</p>
                  <div className="space-y-2">
                    <div className="flex gap-1 justify-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-passionate/20 text-passionate">Interactive</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-warm/20 text-warm">Two Dice</span>
                    </div>
                    <div className="text-center">
                      <span className="text-romantic group-hover:translate-x-0.5 transition-transform text-xs sm:text-sm font-medium">Play →</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Section Title below Grid */}
      <section className="px-4 pt-4 pb-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent tracking-tight">
            Create Your Perfect Intimate Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Discover the best sex positions for your next intimate moment.
          </p>
        </div>
      </section>

      {/* Choose Your Journey - Full Width Section */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <PositionSelector />
        </div>
      </section>
      {/* Promo: Unlock Your Intimate Adventure */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <Card variant="elegant" className="bg-gradient-to-b from-romantic/20 to-background/40 border border-romantic/20 shadow-lg">
            <CardContent className="py-6 sm:py-8 px-4 sm:px-6 md:px-10">
              <div className="max-w-2xl mx-auto text-center">
                <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-romantic/25 flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-romantic" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent mb-4">
                  Unlock Your Intimate Adventure
                </h3>
                <ul className="text-left inline-block text-sm sm:text-base text-foreground/85 space-y-3 mb-6">
                  <li className="flex items-start gap-3"><Heart className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-romantic flex-shrink-0"/> Discover <span className="font-semibold">6</span> exciting intimate position cards</li>
                  <li className="flex items-start gap-3"><Lock className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-romantic flex-shrink-0"/> Each card reveals a unique romantic position</li>
                  <li className="flex items-start gap-3"><Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-romantic flex-shrink-0"/> Scratch to reveal your intimate surprises</li>
                </ul>
                <div className="flex items-center justify-center">
                  <Link to="/games/scratch-position?start=1#start">
                    <Button variant="hero" className="px-6 py-3 text-sm sm:text-base w-full sm:w-auto">
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5"/>
                      Start Exploring
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA below journey */}
      <section className="px-6 pt-1 pb-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Link to="/games/scratch-position?start=1#start">
            <Button variant="romantic" className="px-6">View All Positions →</Button>
          </Link>
        </div>
      </section>

      {/* Intimate Desires Guide */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <Card variant="elegant" className="bg-gradient-to-b from-romantic/15 to-background/40 border border-romantic/20">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="mx-auto w-10 h-10 rounded-full bg-romantic/25 flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-romantic" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">Intimate Desires Guide</h3>
                <p className="text-sm md:text-base text-foreground/80 mt-2 max-w-3xl mx-auto">
                  Explore your deepest desires and fantasies together in this intimate journey of pleasure and connection.
                </p>
              </div>

              {(() => {
                const categories = [
                  'Sensual Teasing','Intimate Play','Fantasy Fulfillment','Intimate Innovation','Passionate Play','Romance Rituals','Sensual Exploration','Romantic Atmosphere','Kinky Adventures','Erotic Games'
                ]
                const [selected, setSelected] = useState<string>('Sensual Teasing')
                const catIcon = (c: string) => {
                  const base = "w-4 h-4"
                  switch (c) {
                    case 'Sensual Teasing': return <Flame className={`${base}`} />
                    case 'Intimate Play': return <Heart className={`${base}`} />
                    case 'Fantasy Fulfillment': return <Wand2 className={`${base}`} />
                    case 'Intimate Innovation': return <FlaskConical className={`${base}`} />
                    case 'Passionate Play': return <PartyPopper className={`${base}`} />
                    case 'Romance Rituals': return <Star className={`${base}`} />
                    case 'Sensual Exploration': return <Compass className={`${base}`} />
                    case 'Romantic Atmosphere': return <Sparkles className={`${base}`} />
                    case 'Kinky Adventures': return <Dice6 className={`${base}`} />
                    case 'Erotic Games': return <Gamepad2 className={`${base}`} />
                    default: return <Sparkles className={`${base}`} />
                  }
                }
                const activities = [
                      {
                        title:'Seductive Strip Tease',
                        sub:'Master the art of slow seduction',
                        icon: Flame,
                        spicy:[
                          'Perform a sultry lap dance',
                          'Remove clothing piece by piece',
                          'Use props like silk scarves',
                          'Incorporate body oil or lotion',
                          'Play with ice cubes',
                        ],
                        tips:[
                          'Maintain eye contact',
                          'Move slowly and deliberately',
                          'Use music to set the mood',
                          'Tease and deny access',
                        ],
                      },
                      {
                        title:'Anticipation Building',
                        sub:'Build excitement throughout the day',
                        icon: Sparkles,
                        spicy:[
                          'Send provocative text messages',
                          'Share intimate photos (consensually)',
                          'Leave suggestive notes',
                          "Describe what you'll do later",
                          'Voice messages with heavy breathing',
                        ],
                        tips:[
                          'Start subtle and build intensity',
                          'Mix sweet and spicy messages',
                          'Use suggestive emojis',
                          'Reference past intimate moments',
                        ],
                      },
                      {
                        title:'Strip Tease Art',
                        sub:'Master the art of seductive undressing',
                        icon: Star,
                        spicy:[
                          'Create a playlist of sensual songs',
                          'Practice slow, deliberate movements',
                          'Maintain eye contact',
                          'Use props like silk scarves',
                          'Dance slowly and sensually',
                        ],
                        tips:[
                          'Dim the lights for ambiance',
                          'Wear layers to remove slowly',
                          'Move with confidence',
                          'Take your time',
                        ],
                      },
                    ]
                const [activeIdx, setActiveIdx] = useState<number>(0)

                return (
                  <div>
                    {/* Category Pills */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
                      {categories.map((c)=> (
                        <button
                          key={c}
                          onClick={() => setSelected(c)}
                          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition flex items-center gap-2 ${selected===c? 'bg-romantic text-white border-romantic':'bg-background/40 text-foreground/80 border-white/10 hover:bg-background/60'}`}
                        >
                          <span className="opacity-90">{catIcon(c)}</span>
                          <span>{c}</span>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left: Activities List */}
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-foreground/80 mb-1">Sensual Teasing Activities</div>
                        {activities.map((a, i)=> (
                          <button
                            key={a.title}
                            onClick={() => setActiveIdx(i)}
                            className={`w-full text-left p-4 rounded-xl border cursor-pointer transition ${i===activeIdx? 'bg-background/40 border-romantic/40':'bg-background/20 border-white/10 hover:border-romantic/30'}`}
                          >
                            <div className="font-semibold flex items-center gap-2">
                              {a.icon ? <a.icon className="w-4 h-4 text-romantic" /> : null}
                              <span>{a.title}</span>
                            </div>
                            <div className="text-sm text-foreground/70">{a.sub}</div>
                          </button>
                        ))}
                      </div>

                      {/* Right: Details Panel (spans 2) */}
                      <div className="lg:col-span-2">
                        <Card variant="elegant" className="bg-gradient-to-b from-background/40 to-background/20 border-white/10">
                          <CardContent className="p-5">
                            {(() => {
                              const a = activities[activeIdx]
                              return (
                                <>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-romantic" />
                                    <div className="font-semibold">{a.title}</div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <div className="font-semibold mb-2">Spicy Ideas:</div>
                                      <ul className="text-sm text-foreground/80 space-y-1">
                                        {a.spicy.map((t)=> (
                                          <li key={t} className="flex gap-2 items-start"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-passionate" />{t}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <div className="font-semibold mb-2">Pro Tips:</div>
                                      <ul className="text-sm text-foreground/80 space-y-1">
                                        {a.tips.map((t)=> (
                                          <li key={t} className="flex gap-2 items-start"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-romantic" />{t}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </>
                              )
                            })()}
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Set the Mood Bar */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-background/40 to-background/20 border border-white/10">
                      <div className="font-semibold mb-3">Set the Mood</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        {[
                          {label:'Sensual Playlist', icon: Music2},
                          {label:'Dim Lighting', icon: Moon},
                          {label:'Ambient Scents', icon: Wind},
                          {label:'Romantic Drinks', icon: Wine},
                        ].map((m) => (
                          <div key={m.label} className="px-3 py-2 rounded-full bg-background/50 border border-white/10 flex items-center justify-center gap-2">
                            <m.icon className="w-4 h-4 text-romantic" />
                            <span>{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}

            </CardContent>
          </Card>
        </div>
      </section>

      {/* Romantic Ideas Section */}
      <RomanticIdeas />
    </div>
  )
}

export default Index;
