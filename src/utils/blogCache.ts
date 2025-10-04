// Blog Cache System for Instant Loading
interface CachedBlog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: number
  featuredImage: string
  author: string
  status: string
  createdAt: string
  updatedAt: string
}

interface CacheEntry {
  data: CachedBlog[]
  timestamp: number
}

const CACHE_KEY = 'blog_cache'
const CACHE_TIMEOUT = 5 * 60 * 1000 // 5 minutes

// Get cached blogs
export function getCachedBlogs(): CachedBlog[] {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return []
    
    const entry: CacheEntry = JSON.parse(cached)
    const now = Date.now()
    
    // Check if cache is still valid
    if (now - entry.timestamp < CACHE_TIMEOUT) {
      console.log('📦 Loading blogs from cache')
      return entry.data
    }
    
    // Cache expired, clear it
    localStorage.removeItem(CACHE_KEY)
    return []
  } catch (error) {
    console.error('❌ Error loading cached blogs:', error)
    return []
  }
}

// Save blogs to cache
export function saveBlogsToCache(blogs: CachedBlog[]): void {
  try {
    const entry: CacheEntry = {
      data: blogs,
      timestamp: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
    console.log('💾 Blogs saved to cache')
  } catch (error) {
    console.error('❌ Error saving blogs to cache:', error)
  }
}

// Get blogs with instant cache + background refresh
export async function getBlogsOptimized(): Promise<CachedBlog[]> {
  try {
    // Return cached data immediately if available
    const cached = getCachedBlogs()
    if (cached.length > 0) {
      // Refresh in background
      refreshBlogsInBackground()
      return cached
    }
    
    // No cache, fetch from API
    console.log('🌐 Fetching blogs from API...')
    const response = await fetch('/api/blogs?status=published')
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('📊 Blog posts data:', data)
    
    // Transform data to match expected structure
    const transformedData: CachedBlog[] = data.map((post: any) => ({
      id: post.id || `blog-${Date.now()}-${Math.random()}`,
      title: post.title || 'Untitled',
      slug: post.slug || toSlug(post.title) || `blog-${Date.now()}`,
      content: post.content || '',
      excerpt: post.excerpt || '',
      category: post.category || 'General',
      publishedAt: post.publishedAt || post.createdAt || new Date().toISOString(),
      readTime: post.readTime || 5,
      featuredImage: post.featuredImage || '',
      author: post.author || 'Admin',
      status: post.status || 'published',
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString()
    }))
    
    // Save to cache
    saveBlogsToCache(transformedData)
    
    return transformedData
  } catch (error) {
    console.error('❌ Error fetching blogs:', error)
    // Return cached data as fallback
    return getCachedBlogs()
  }
}

// Background refresh
async function refreshBlogsInBackground(): Promise<void> {
  try {
    const response = await fetch('/api/blogs?status=published')
    if (response.ok) {
      const data = await response.json()
      const transformedData: CachedBlog[] = data.map((post: any) => ({
        id: post.id || `blog-${Date.now()}-${Math.random()}`,
        title: post.title || 'Untitled',
        slug: post.slug || toSlug(post.title) || `blog-${Date.now()}`,
        content: post.content || '',
        excerpt: post.excerpt || '',
        category: post.category || 'General',
        publishedAt: post.publishedAt || post.createdAt || new Date().toISOString(),
        readTime: post.readTime || 5,
        featuredImage: post.featuredImage || '',
        author: post.author || 'Admin',
        status: post.status || 'published',
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt || new Date().toISOString()
      }))
      
      saveBlogsToCache(transformedData)
      console.log('🔄 Blogs refreshed in background')
    }
  } catch (error) {
    console.error('❌ Background refresh failed:', error)
  }
}

// Helper function to create slug
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Clear cache
export function clearBlogCache(): void {
  localStorage.removeItem(CACHE_KEY)
  console.log('🗑️ Blog cache cleared')
}
