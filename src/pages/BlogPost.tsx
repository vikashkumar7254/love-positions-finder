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
    const imageCategory = categoryMap[selected.category as string] || "blog"
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
    articleSection: selected.category || 'General'
  } : null

  return (
    <div className="min-h-screen bg-background">
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
        <div className="container max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-romantic transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
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
              const imageCategory = categoryMap[selected.category as string] || "blog"
              src = getCategoryImage(imageCategory, "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&auto=format&fit=crop&q=60")
            }
            
            return (
              <div className="mb-6 rounded-2xl overflow-hidden shadow">
                <div className="relative w-full aspect-[16/9]">
                  <MediaDisplay 
                    src={src} 
                    alt={selected.title || 'Blog Post'} 
                    className="w-full h-full object-cover"
                    type="image"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{selected.title}</h1>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Article Header */}
          {selected && (
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
                  <span>{selected.date ? new Date(selected.date).toLocaleDateString() : 'No date'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selected.readTime || '5 min read'}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </header>
          )}
          {/* Article Content */}
          <Card className="border-0 bg-gradient-card">
            <CardContent className="p-8">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-romantic"></div>
                  <span className="ml-3 text-muted-foreground">Loading article...</span>
                </div>
              ) : selected ? (
                <div className="prose prose-lg max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selected.content || selected.excerpt || "No content available"
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Article not found</p>
                  <p className="text-muted-foreground text-sm mt-2">The article you're looking for doesn't exist or has been removed.</p>
                </div>
              )}
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