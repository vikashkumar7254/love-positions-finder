import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { Calendar, Clock, Heart, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { getCategoryImage } from "@/utils/imageManager"
import MediaDisplay from "@/components/MediaDisplay"

// Removed static demo posts; now loading from API

const categories = ["All", "General", "Tips & Advice", "Romance", "Communication", "Intimacy", "Science", "Long-term Love"]

// No local storage merge; show only published/approved posts from API

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleCount, setVisibleCount] = useState(6)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
    // Load published blogs from API
    (async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/blogs?status=published')
        if (res.ok) {
          const data = await res.json()
          console.log('📊 Blog posts data:', data)
          console.log('📊 First post:', data[0])
          
          // Transform data to match expected structure
          const transformedData = data.map((post: any) => ({
            ...post,
            date: post.publishedAt || post.createdAt || new Date().toISOString(),
            readTime: post.readTime ? `${post.readTime} min read` : '5 min read',
            featuredImage: post.featuredImage
          }))
          
          console.log('📊 Transformed data:', transformedData)
          setPosts(transformedData)
        } else {
          console.error('❌ Failed to fetch blogs:', res.status)
          // Fallback to sample data if API fails
          console.log('🔄 Loading fallback sample data...')
          const { sampleBlogs } = await import('@/utils/sampleBlogData')
          setPosts(sampleBlogs)
        }
      } catch (error) {
        console.error('❌ Blog loading error:', error)
        // Fallback to sample data if API fails
        console.log('🔄 Loading fallback sample data...')
        const { sampleBlogs } = await import('@/utils/sampleBlogData')
        setPosts(sampleBlogs)
      } finally {
        setLoading(false)
      }
    })()
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

  const allPosts = posts
    .filter((b: any) => b && b.id && b.title) // Filter out invalid posts
    .map((b: any) => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt || 'No description available',
      date: b.publishedAt || b.createdAt || new Date().toISOString(),
      readTime: `${b.readTime || 5} min read`,
      category: b.category && b.category !== null ? b.category : "General",
      slug: b.slug || '',
      featuredImage: b.featuredImage,
    }))

  const filteredPosts = allPosts.filter(post => {
    // Add null safety checks
    if (!post || !post.title || !post.excerpt) {
      return false
    }
    
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || (post.category && post.category === selectedCategory)
    return matchesSearch && matchesCategory
  })

  const topicPills = [
    "Most Popular","Romance","Intimacy","Communication","Date Ideas","Science","Mindfulness","Tips & Advice"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Love & Intimacy Blog | Expert Relationship Advice</title>
        <meta name="description" content="Expert insights on love, relationships, and intimacy. Tips, science, and romance guides from experts." />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
        <meta property="og:title" content="Love & Intimacy Blog | Expert Relationship Advice" />
        <meta property="og:description" content="Expert insights on love, relationships, and intimacy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/blog`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Love & Intimacy Blog',
          url: `${window.location.origin}/blog`
        })}</script>
      </Helmet>
      
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
            {(() => {
              const postsToRender = filteredPosts.slice(0, visibleCount)
              console.log('🔍 Rendering blogs:', {
                totalFiltered: filteredPosts.length,
                visibleCount: visibleCount,
                postsToRender: postsToRender.length,
                allPosts: filteredPosts.map(p => ({ id: p.id, title: p.title, slug: p.slug }))
              })
              return postsToRender
            })().map((post, index) => {
              console.log(`🎯 Rendering post ${index + 1}/${visibleCount}:`, post.title)
              try {
              // Add comprehensive null checks for post data
              if (!post || !post.id || !post.title) {
                console.warn('⚠️ Skipping post with missing essential data:', post)
                return null
              }
              
              // Generate slug if missing - improved for international text
              const postSlug = post.slug && post.slug.trim() !== '' 
                ? post.slug 
                : post.title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '') // Remove special characters
                    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
                    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
                    .substring(0, 50) // Limit length
                    || `blog-${post.id}` // Fallback to blog-id if empty
              
              console.log(`🔍 Post ${index}:`, {
                id: post.id,
                title: post.title,
                originalSlug: post.slug,
                generatedSlug: postSlug,
                hasValidSlug: !!postSlug
              })
              
              if (!postSlug) {
                console.warn('⚠️ Skipping post with invalid slug:', post)
                return null
              }
              
              return (
              <Link key={post.id} to={`/blog/${postSlug}`} className="block group">
                <Card className="hover-romantic border-0 bg-gradient-card h-full overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative">
                    <div className="w-full aspect-[16/9] overflow-hidden">
                      <MediaDisplay
                        src={post.featuredImage || getCoverFor(post?.category || 'General')}
                        alt={post.title || 'Untitled'}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-300"
                        type="image"
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
                      <span>{new Date(post.date || new Date()).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{post.readTime || '5 min read'}</span>
                    </div>
                    <div className="inline-block px-2 py-1 bg-romantic/10 text-romantic text-xs rounded-full">
                      {post?.category || 'General'}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4 line-clamp-3">
                      {post.excerpt || 'No description available'}
                    </CardDescription>
                    <div className="text-romantic/80 text-sm inline-flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Read More
                    </div>
                  </CardContent>
                </Card>
              </Link>
              )
              } catch (error) {
                console.error(`❌ Error rendering blog post ${index}:`, error, post)
                return null
              }
            })}
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