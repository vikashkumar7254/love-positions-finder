import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, Heart, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { getCategoryImage } from "@/utils/imageManager"
import MediaDisplay from "@/components/MediaDisplay"

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [selected, setSelected] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!slug) return
      try {
        setLoading(true)
        console.log('🔍 Fetching blog with slug:', slug)
        const res = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`)
        console.log('📡 Blog fetch response status:', res.status)
        
        if (res.ok) {
          const data = await res.json()
          console.log('📊 Blog data received:', data)
          
          if (data && data.title) {
            setSelected({
              title: data.title,
              date: data.publishedAt || data.createdAt || new Date().toISOString(),
              readTime: `${data.readTime || 5} min read`,
              category: data.category || 'General',
              content: data.content || '',
              excerpt: data.excerpt || '',
              featuredImage: data.featuredImage || '',
            })
          } else {
            console.warn('⚠️ Blog data is empty or invalid:', data)
            // Try fallback
            const { sampleBlogs } = await import('@/utils/sampleBlogData')
            const fallbackBlog = sampleBlogs.find(blog => blog.slug === slug)
            if (fallbackBlog) {
              setSelected({
                title: fallbackBlog.title,
                date: fallbackBlog.publishedAt || fallbackBlog.createdAt,
                readTime: `${fallbackBlog.readTime || 5} min read`,
                category: fallbackBlog.category || 'General',
                content: fallbackBlog.content,
                excerpt: fallbackBlog.excerpt,
                featuredImage: fallbackBlog.featuredImage,
              })
            } else {
              setSelected(null)
            }
          }
        } else {
          console.error('❌ Blog fetch failed:', res.status)
          const errorText = await res.text()
          console.error('❌ Error details:', errorText)
          // Try to find blog in sample data as fallback
          const { sampleBlogs } = await import('@/utils/sampleBlogData')
          const fallbackBlog = sampleBlogs.find(blog => blog.slug === slug)
          if (fallbackBlog) {
            setSelected({
              title: fallbackBlog.title,
              date: fallbackBlog.publishedAt || fallbackBlog.createdAt,
              readTime: `${fallbackBlog.readTime || 5} min read`,
              category: fallbackBlog.category || 'General',
              content: fallbackBlog.content,
              excerpt: fallbackBlog.excerpt,
              featuredImage: fallbackBlog.featuredImage,
            })
          } else {
            setSelected(null)
          }
        }
      } catch (error) {
        console.error('❌ Blog fetch error:', error)
        // Try to find blog in sample data as fallback
        try {
          const { sampleBlogs } = await import('@/utils/sampleBlogData')
          const fallbackBlog = sampleBlogs.find(blog => blog.slug === slug)
          if (fallbackBlog) {
            setSelected({
              title: fallbackBlog.title,
              date: fallbackBlog.publishedAt || fallbackBlog.createdAt,
              readTime: `${fallbackBlog.readTime || 5} min read`,
              category: fallbackBlog.category || 'General',
              content: fallbackBlog.content,
              excerpt: fallbackBlog.excerpt,
              featuredImage: fallbackBlog.featuredImage,
            })
          } else {
            setSelected(null)
          }
        } catch {
          setSelected(null)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [slug])

  if (!loading && !selected) {
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
  const seoTitle = selected ? `${selected.title} | Love & Intimacy Blog` : 'Article | Love & Intimacy Blog'
  const seoDesc = (selected?.excerpt || selected?.content || '').toString().slice(0, 160)
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
    const imageCategory = categoryMap[selected?.category as string] || "blog"
    return getCategoryImage(imageCategory, "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=630&fit=crop&crop=center")
  })()

  const helmetJsonLd = selected ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: selected.title,
    description: seoDesc,
    image,
    author: { '@type': 'Organization', name: 'ScratchSexPositions' },
    publisher: { '@type': 'Organization', name: 'ScratchSexPositions' },
    datePublished: selected.date,
    dateModified: selected.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: selected?.category || 'General'
  } : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        {helmetJsonLd && (
          <script type="application/ld+json">{JSON.stringify(helmetJsonLd)}</script>
        )}
      </Helmet>
      <article className="pt-24 pb-12">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-3 text-gray-600 hover:text-rose-600 transition-colors mb-8 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Love Stories</span>
          </Link>

          {/* Hero Cover Image */}
          {selected && (() => {
            // Use featured image if available, otherwise fallback to category image
            const featuredImage = selected.featuredImage
            let src = featuredImage
            
            if (!src) {
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
              const imageCategory = categoryMap[selected?.category as string] || "blog"
              src = getCategoryImage(imageCategory, "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&auto=format&fit=crop&q=60")
            }
            
            return (
              <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative w-full aspect-[16/10]">
                  <MediaDisplay 
                    src={src} 
                    alt={selected.title || 'Blog Post'} 
                    className="w-full h-full object-cover"
                    type="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-full mb-4">
                      {selected?.category || "General"}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{selected.title}</h1>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Article Header */}
          {selected && (
            <header className="mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-white/20">
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-rose-400" />
                    <span className="font-medium">{selected.date ? new Date(selected.date).toLocaleDateString() : 'No date'}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-rose-400" />
                    <span className="font-medium">{selected.readTime || '5 min read'}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  {selected.title}
                </h1>
                {selected.excerpt && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {selected.excerpt}
                  </p>
                )}
              </div>
            </header>
          )}
          {/* Article Content */}
          <Card className="border-0 bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-200 border-t-rose-500"></div>
                    <span className="text-gray-600 text-lg font-medium">Loading your love story...</span>
                  </div>
                </div>
              ) : selected ? (
                <div className="prose prose-lg max-w-none p-12">
                  <div
                    className="text-gray-700 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{
                      __html: selected.content || selected.excerpt || "No content available"
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-rose-400" />
                  </div>
                  <p className="text-gray-600 text-xl font-medium mb-3">Article not found</p>
                  <p className="text-gray-500 text-lg">The love story you're looking for doesn't exist or has been removed.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Articles CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-white/20">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-sm font-semibold">
                <Heart className="w-4 h-4" />
                Continue Your Journey
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Explore More Love Stories
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover more inspiring articles about love, intimacy, and relationships that will help you deepen your connection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/blog">
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    <Heart className="w-5 h-5 mr-2" />
                    View All Love Stories
                  </Button>
                </Link>
                <Link to="/positions">
                  <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg font-semibold rounded-full">
                    Explore Positions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPost