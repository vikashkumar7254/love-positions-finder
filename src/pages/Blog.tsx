import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, Heart, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { getCategoryImage } from "@/utils/imageManager"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tips for Trying New Love Positions",
    excerpt: "Discover expert advice on how to make trying new intimate positions a fun and comfortable experience for both you and your partner.",
    date: "2025-03-07",
    readTime: "8 min read",
    category: "Tips & Advice",
    slug: "top-10-tips-new-love-positions"
  },
  {
    id: 2,
    title: "How to Use a Random Position Generator for Romantic Dates",
    excerpt: "Spice up your date nights with our random position generator! Learn how to incorporate it for a memorable and exciting experience.",
    date: "2025-03-07",
    readTime: "8 min read",
    category: "Date Ideas",
    slug: "random-position-generator-dates"
  },
  {
    id: 3,
    title: "30 Romantic Date Night Ideas for Couples to Reignite the Spark",
    excerpt: "Discover creative and intimate date night ideas that go beyond the typical dinner and movie. Perfect for couples looking to add excitement to their relationship.",
    date: "2024-03-20",
    readTime: "8 min read",
    category: "Romance",
    slug: "30-romantic-date-night-ideas"
  },
  {
    id: 4,
    title: "The Science of Physical Touch: Why Intimacy Matters in Relationships",
    excerpt: "Explore the psychological and physiological benefits of physical intimacy and learn how to build deeper connections through touch.",
    date: "2024-03-19",
    readTime: "8 min read",
    category: "Science",
    slug: "science-physical-touch-intimacy"
  },
  {
    id: 5,
    title: "7 Communication Secrets Happy Couples Use Every Day",
    excerpt: "Discover the key communication strategies that happy couples use to maintain a strong and loving relationship.",
    date: "2024-03-18",
    readTime: "8 min read",
    category: "Communication",
    slug: "communication-secrets-happy-couples"
  },
  {
    id: 6,
    title: "Rekindling Passion: Expert Tips for Long-Term Relationships",
    excerpt: "Discover proven strategies to maintain and reignite passion in long-term relationships, backed by relationship experts and scientific research.",
    date: "2024-03-16",
    readTime: "8 min read",
    category: "Long-term Love",
    slug: "rekindling-passion-long-term"
  },
  {
    id: 7,
    title: "The Art of Sensual Massage: A Comprehensive Guide to Intimate Touch",
    excerpt: "Learn the techniques and benefits of sensual massage to enhance intimacy and connection in your relationship.",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Intimacy",
    slug: "art-sensual-massage-guide"
  },
  {
    id: 8,
    title: "Healing Relationship Trauma: A Path to Healthy Love",
    excerpt: "Expert guidance on overcoming past relationship trauma and building healthy, fulfilling relationships.",
    date: "2024-03-14",
    readTime: "8 min read",
    category: "Healing",
    slug: "healing-relationship-trauma"
  },
  {
    id: 9,
    title: "Mindful Lovemaking: Deepening Intimate Connections",
    excerpt: "Explore the practice of mindful intimacy and its transformative effects on physical and emotional connections.",
    date: "2024-03-13",
    readTime: "8 min read",
    category: "Mindfulness",
    slug: "mindful-lovemaking-connections"
  },
  {
    id: 10,
    title: "Building Trust and Boundaries in Modern Relationships",
    excerpt: "Learn how to establish healthy boundaries while building deep trust in your relationship.",
    date: "2024-03-12",
    readTime: "8 min read",
    category: "Trust",
    slug: "building-trust-boundaries"
  }
]

const categories = ["All", "General", "Tips & Advice", "Romance", "Communication", "Intimacy", "Science", "Long-term Love"]

const STORAGE_KEY = "userBlogs"

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [userPosts, setUserPosts] = useState<Array<any>>([])
  const [visibleCount, setVisibleCount] = useState(6)

  const getCoverFor = useMemo(() => {
    return (category?: string) => {
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
      const imageCategory = categoryMap[category || "General"] || "blog"
      return getCategoryImage(imageCategory, `https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&auto=format&fit=crop&q=60`)
    }
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setUserPosts(raw ? JSON.parse(raw) : [])
    } catch {
      setUserPosts([])
    }
    // Enhanced SEO for Blog page
    const title = 'Love & Intimacy Blog | Expert Relationship Advice'
    const desc = 'Expert insights on love, relationships, and intimacy. Tips, science, and romance guides from relationship experts and couples therapists.'
    const url = `${window.location.origin}/blog`
    const image = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=630&fit=crop&crop=center"

    document.title = title

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
    robots.content = 'index, follow, max-snippet:-1, max-image-preview:large'

    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
    if (!keywords) { keywords = document.createElement('meta'); keywords.name = 'keywords'; document.head.appendChild(keywords) }
    keywords.content = 'relationship advice, love tips, intimacy guide, dating advice, relationship blog, couples therapy, romance tips, relationship experts'

    // Structured Data for Blog
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Love & Intimacy Blog",
      "description": desc,
      "url": url,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "publisher": {
        "@type": "Organization",
        "name": "ScratchSexPositions"
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

  const approvedUserPosts = userPosts.filter((p: any) => p.approved)
  const pendingCount = userPosts.filter((p: any) => !p.approved).length
  const allPosts = [...approvedUserPosts.map((p) => ({
    id: `user-${p.id}`,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    category: p.category || "General",
    slug: p.slug,
    isUser: true,
  })), ...blogPosts]

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const topicPills = [
    "Most Popular","Romance","Intimacy","Communication","Date Ideas","Science","Mindfulness","Tips & Advice"
  ]

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-romantic text-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              ScratchSexPositions Blog
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover expert insights on love, relationships, and intimacy. Our carefully curated articles help couples create deeper connections and more passionate relationships.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/blog/new">
              <Button variant="tender" size="lg" className="shadow-md">
                <Heart className="w-5 h-5" />
                Write a Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Topics bar */}
          <div className="mt-6 flex flex-wrap gap-2">
            {topicPills.map(p => (
              <span key={p} className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-romantic/15 to-passionate/15 text-foreground/90 border border-white/10">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                <Card className="hover-romantic border-0 bg-gradient-card h-full overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative">
                    <div className="w-full aspect-[16/9] overflow-hidden">
                      <img
                        src={getCoverFor(post.category)}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      <CardTitle className="text-white text-lg leading-snug line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="inline-block px-2 py-1 bg-romantic/10 text-romantic text-xs rounded-full">
                      {post.category}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="text-romantic/80 text-sm inline-flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Read More
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Show More */}
          {visibleCount < filteredPosts.length && (
            <div className="text-center mt-10">
              <Button variant="romantic" onClick={() => setVisibleCount(c => Math.min(c + 6, filteredPosts.length))}>
                Load More Articles
              </Button>
              <div className="text-xs text-muted-foreground mt-2">
                Showing {Math.min(visibleCount, filteredPosts.length)} of {filteredPosts.length}
              </div>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have something interesting to share?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community to share your insights and experiences with other couples.
          </p>
          <Button variant="hero" size="lg">
            <Heart className="w-5 h-5" />
            Join Our Community
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Blog