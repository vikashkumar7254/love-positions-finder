import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, Heart, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { getCategoryImage } from "@/utils/imageManager"

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
const STORAGE_KEY = "userBlogs"

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  // Try static first
  const staticPost = slug ? blogContent[slug as keyof typeof blogContent] : null
  // Try user-created (approved only)
  let userPost: any = null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const arr = raw ? JSON.parse(raw) : []
    userPost = slug ? arr.find((p: any) => p.slug === slug && p.approved) : null
  } catch {
    userPost = null
  }

  const selected: any = staticPost || userPost

  if (!selected) {
    // Not found SEO
    if (typeof document !== 'undefined') {
      document.title = 'Article Not Found | Love & Intimacy Blog'
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
      meta.content = 'The article you are looking for does not exist.'
    }

    return (
      <div className="min-h-screen bg-background">
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

  // Enhanced SEO for existing blog post
  const seoTitle = `${selected.title} | Love & Intimacy Blog`
  const seoDesc = (selected.excerpt || selected.content || '').toString().slice(0, 160)
  const url = `${window.location.origin}/blog/${slug}`
  const image = (() => {
    const categoryMap: Record<string, string> = {
      "Tips & Advice": "blog",
      "Date Ideas": "blog",
      "Romance": "blog",
      "Communication": "blog",
      "Intimacy": "blog",
      "Science": "blog",
      "Long-term Love": "blog",
      "General": "blog"
    }
    const imageCategory = categoryMap[selected.category as string] || "blog"
    return getCategoryImage(imageCategory, "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=630&fit=crop&crop=center")
  })()

  if (typeof document !== 'undefined') {
    document.title = seoTitle

    // Basic meta tags
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content = seoDesc

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = url

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null
    if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property','og:title'); document.head.appendChild(ogTitle) }
    ogTitle.content = seoTitle

    let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null
    if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute('property','og:description'); document.head.appendChild(ogDesc) }
    ogDesc.content = seoDesc

    let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null
    if (!ogImage) { ogImage = document.createElement('meta'); ogImage.setAttribute('property','og:image'); document.head.appendChild(ogImage) }
    ogImage.content = image

    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null
    if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property','og:url'); document.head.appendChild(ogUrl) }
    ogUrl.content = url

    let ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement | null
    if (!ogType) { ogType = document.createElement('meta'); ogType.setAttribute('property','og:type'); document.head.appendChild(ogType) }
    ogType.content = 'article'

    let ogSiteName = document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement | null
    if (!ogSiteName) { ogSiteName = document.createElement('meta'); ogSiteName.setAttribute('property','og:site_name'); document.head.appendChild(ogSiteName) }
    ogSiteName.content = 'Love & Intimacy Blog'

    // Article specific tags
    let articleAuthor = document.querySelector('meta[property="article:author"]') as HTMLMetaElement | null
    if (!articleAuthor) { articleAuthor = document.createElement('meta'); articleAuthor.setAttribute('property','article:author'); document.head.appendChild(articleAuthor) }
    articleAuthor.content = 'ScratchSexPositions'

    let articlePublished = document.querySelector('meta[property="article:published_time"]') as HTMLMetaElement | null
    if (!articlePublished) { articlePublished = document.createElement('meta'); articlePublished.setAttribute('property','article:published_time'); document.head.appendChild(articlePublished) }
    articlePublished.content = selected.date

    let articleSection = document.querySelector('meta[property="article:section"]') as HTMLMetaElement | null
    if (!articleSection) { articleSection = document.createElement('meta'); articleSection.setAttribute('property','article:section'); document.head.appendChild(articleSection) }
    articleSection.content = selected.category || 'General'

    // Twitter Card tags
    let twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement | null
    if (!twitterCard) { twitterCard = document.createElement('meta'); twitterCard.name = 'twitter:card'; document.head.appendChild(twitterCard) }
    twitterCard.content = 'summary_large_image'

    let twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null
    if (!twitterTitle) { twitterTitle = document.createElement('meta'); twitterTitle.name = 'twitter:title'; document.head.appendChild(twitterTitle) }
    twitterTitle.content = seoTitle

    let twitterDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null
    if (!twitterDesc) { twitterDesc = document.createElement('meta'); twitterDesc.name = 'twitter:description'; document.head.appendChild(twitterDesc) }
    twitterDesc.content = seoDesc

    let twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null
    if (!twitterImage) { twitterImage = document.createElement('meta'); twitterImage.name = 'twitter:image'; document.head.appendChild(twitterImage) }
    twitterImage.content = image

    // Additional SEO meta tags
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots) }
    robots.content = 'index, follow, max-snippet:-1, max-image-preview:large'

    let author = document.querySelector('meta[name="author"]') as HTMLMetaElement | null
    if (!author) { author = document.createElement('meta'); author.name = 'author'; document.head.appendChild(author) }
    author.content = 'ScratchSexPositions'

    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
    if (!keywords) { keywords = document.createElement('meta'); keywords.name = 'keywords'; document.head.appendChild(keywords) }
    keywords.content = `relationship advice, love tips, intimacy guide, ${selected.category?.toLowerCase()}, dating advice, couples therapy, romance tips`

    // Structured Data for Article
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": selected.title,
      "description": seoDesc,
      "image": image,
      "author": {
        "@type": "Organization",
        "name": "ScratchSexPositions"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ScratchSexPositions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop&crop=center"
        }
      },
      "datePublished": selected.date,
      "dateModified": selected.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "articleSection": selected.category || "General"
    }

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Hero Cover Image */}
          {(() => {
            const categoryMap: Record<string, string> = {
              "Tips & Advice": "blog",
              "Date Ideas": "blog",
              "Romance": "blog",
              "Communication": "blog",
              "Intimacy": "blog",
              "Science": "blog",
              "Long-term Love": "blog",
              "General": "blog"
            }
            const imageCategory = categoryMap[selected.category as string] || "blog"
            const src = getCategoryImage(imageCategory, "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&auto=format&fit=crop&q=60")
            return (
              <div className="mb-6 rounded-2xl overflow-hidden shadow">
                <div className="relative w-full aspect-[16/9]">
                  <img src={src} alt={selected.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{selected.title}</h1>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Article Header */}
          <header className="mb-8">
            <div className="inline-block px-3 py-1 bg-romantic/10 text-romantic text-sm rounded-full mb-4">
              {selected.category || "General"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {selected.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selected.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{selected.readTime}</span>
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
              <div className="prose prose-lg max-w-none">
                {staticPost ? (
                  <div dangerouslySetInnerHTML={{ __html: staticPost.content }} />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${(selected.content || "")
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/\n\n+/g, "</p><p>")
                        .replace(/\n/g, "<br/>")}</p>`,
                    }}
                  />
                )}
              </div>
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