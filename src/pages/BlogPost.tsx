import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, Heart, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/Navigation"

const blogContent = {
  "top-10-tips-new-love-positions": {
    title: "Top 10 Tips for Trying New Love Positions",
    date: "2025-03-07",
    readTime: "8 min read",
    category: "Tips & Advice",
    content: `
      <p class="text-lg mb-6">Exploring new intimate positions with your partner can be an exciting way to deepen your connection and add variety to your relationship. Here are expert tips to make the experience comfortable and enjoyable for both of you.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">1. Communication is Key</h2>
      <p class="mb-6">Before trying anything new, have an open conversation with your partner about your desires, boundaries, and comfort levels. This creates a safe space for exploration.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">2. Start Slow and Simple</h2>
      <p class="mb-6">Begin with positions that are variations of what you already know and love. Small changes can make a big difference in sensation and intimacy.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">3. Focus on Comfort</h2>
      <p class="mb-6">Ensure both partners are physically comfortable. Use pillows for support and don't hesitate to adjust positions as needed.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">4. Create the Right Atmosphere</h2>
      <p class="mb-6">Set the mood with dim lighting, soft music, and perhaps some scented candles. The environment plays a crucial role in intimacy.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">5. Practice Patience</h2>
      <p class="mb-6">Not every position will work perfectly the first time. Be patient with yourselves and each other as you learn what feels good.</p>
    `
  },
  "random-position-generator-dates": {
    title: "How to Use a Random Position Generator for Romantic Dates",
    date: "2025-03-07",
    readTime: "8 min read",
    category: "Date Ideas",
    content: `
      <p class="text-lg mb-6">Adding spontaneity to your romantic life can reignite passion and create memorable experiences. Here's how to incorporate a random position generator into your date nights.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">Setting the Scene</h2>
      <p class="mb-6">Create anticipation by planning a special evening. Start with a romantic dinner, share your favorite wine, and build intimacy through conversation and connection.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">Making it Playful</h2>
      <p class="mb-6">Turn the generator into a fun game. Take turns generating positions and discussing what excites you about each one. Remember, you're always free to modify or skip any suggestion.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-romantic">Building Trust and Excitement</h2>
      <p class="mb-6">Use this as an opportunity to deepen trust and explore fantasies together. The randomness removes pressure and can lead to delightful surprises.</p>
    `
  }
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? blogContent[slug as keyof typeof blogContent] : null

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="inline-block px-3 py-1 bg-romantic/10 text-romantic text-sm rounded-full mb-4">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <Card className="border-0 bg-gradient-card">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* Related Articles CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Explore More Love Insights</h3>
            <p className="text-muted-foreground mb-6">
              Discover more articles about love, intimacy, and relationships
            </p>
            <Link to="/blog">
              <Button variant="hero" size="lg">
                <Heart className="w-5 h-5" />
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPost