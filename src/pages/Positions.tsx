import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Sparkles, Heart, ArrowRight, Gamepad2, Shuffle } from "lucide-react"
import { Helmet } from "react-helmet-async"

const Positions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Helmet>
        <title>Positions Collection | Love & Intimacy Guide</title>
        <meta name="description" content="Discover intimate positions and romantic guides designed to enhance your connection and bring you closer together." />
        <link rel="canonical" href={`${window.location.origin}/positions`} />
        <meta property="og:title" content="Positions Collection | Love & Intimacy Guide" />
        <meta property="og:description" content="Discover intimate positions and romantic guides designed to enhance your connection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/positions`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-12 h-12 text-rose-500" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Love & Intimacy
              </h1>
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover the art of intimate connection through romantic guides, passionate adventures, and love stories designed to deepen your relationship.
            </p>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-12 px-6 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Explore Our Collection</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/blog">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-800">Love Stories</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">
                      Read inspiring love stories and romantic guides from our community
                    </p>
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Read Stories
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/games">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Gamepad2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-800">Interactive Games</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">
                      Play fun and romantic games designed for couples
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Play Games
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/journey-planner">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Shuffle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-800">Journey Planner</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">
                      Plan your romantic journey with personalized guides
                    </p>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                      <Shuffle className="w-4 h-4 mr-2" />
                      Plan Journey
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-sm font-semibold">
                <Heart className="w-4 h-4" />
                Start Your Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Ready to Deepen Your Connection?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join our community of couples who believe in the power of love, intimacy, and connection. Discover new ways to strengthen your relationship and create lasting memories together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/blog">
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    <Heart className="w-5 h-5 mr-2" />
                    Read Love Stories
                  </Button>
                </Link>
                <Link to="/games">
                  <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg font-semibold rounded-full">
                    Play Games
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Positions