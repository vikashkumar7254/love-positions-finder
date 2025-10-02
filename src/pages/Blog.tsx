import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { Calendar, Clock, Heart, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { getCategoryImage } from "@/utils/imageManager"
import MediaDisplay from "@/components/MediaDisplay"
import LazyImage from "@/components/LazyImage"

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
      <section className="pt-16 sm:pt-24 pb-6 sm:pb-8 bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-rose-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 relative z-10">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
              <span className="text-pink-200 font-medium text-sm sm:text-base">Love & Intimacy Blog</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-200 via-white to-purple-200 bg-clip-text text-transparent">
              Ignite Your Passion
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6">
              Discover the art of intimate connection through expert insights, romantic guides, and passionate adventures designed for couples who want to deepen their love.
            </p>
            <div className="flex items-center justify-center">
              <Link to="/blog/new">
                <Button variant="tender" size="lg" className="shadow-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Share Your Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-slate-50 to-pink-50">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-rose-400 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                placeholder="Search for love, intimacy, romance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg sm:rounded-xl shadow-sm text-sm sm:text-base"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg' 
                      : 'bg-white/60 text-gray-700 border-rose-200 hover:bg-rose-50 hover:border-rose-300'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Topics bar */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
            {topicPills.map(p => (
              <span key={p} className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200 hover:from-rose-200 hover:to-pink-200 transition-all duration-200 cursor-pointer">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full overflow-hidden rounded-xl sm:rounded-2xl group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
                  {/* Cover Image */}
                  <div className="relative overflow-hidden">
                    <div className="w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                      <LazyImage
                        src={post.featuredImage || getCoverFor(post?.category || 'General')}
                        alt={post.title || 'Untitled'}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold rounded-full shadow-lg">
                        {post?.category || 'General'}
                      </span>
                    </div>
                    {/* Read Time Badge */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {post.readTime || '5 min read'}
                      </span>
                    </div>
                    {/* Hover Title Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-base sm:text-lg font-bold leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400" />
                      <span>{new Date(post.date || new Date()).toLocaleDateString()}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt || 'No description available'}
                    </p>
                    
                    {/* Read More Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-rose-500 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 group-hover:text-rose-600 transition-colors duration-200">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        Read More
                      </div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
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
            <div className="text-center mt-16">
              <Button 
                variant="romantic" 
                onClick={() => setVisibleCount(c => Math.min(c + 6, filteredPosts.length))}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Discover More Love Stories
              </Button>
              <div className="text-sm text-gray-500 mt-4">
                Showing {Math.min(visibleCount, filteredPosts.length)} of {filteredPosts.length} articles
              </div>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
              <p className="text-gray-600 text-lg mb-8">Try adjusting your search or filter criteria to discover more love stories.</p>
              <Button 
                variant="outline" 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}
                className="border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-3 rounded-full"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 bg-rose-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-pink-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-sm font-semibold">
              <Heart className="w-4 h-4" />
              Share Your Love Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ready to Inspire Others?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join our passionate community of couples who believe in the power of love, intimacy, and connection. Share your experiences, learn from others, and help create a world where every relationship thrives.
            </p>
            <div className="flex items-center justify-center">
              <Link to="/blog/new">
                <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <Heart className="w-5 h-5 mr-2" />
                  Write Your Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog