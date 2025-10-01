import { Redis } from '@upstash/redis'

// Support local dev without Upstash: fall back to in-memory storage
const useRedis = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

type KV = Record<string, string>
declare global {
  // eslint-disable-next-line no-var
  var __BLOGS_STORE__: KV | undefined
  // eslint-disable-next-line no-var
  var __BLOGS_COUNTER__: number | undefined
}

const memory = {
  async hgetall(_key: string) {
    return globalThis.__BLOGS_STORE__ || {}
  },
  async hget(_key: string, field: string) {
    return (globalThis.__BLOGS_STORE__ || {})[field]
  },
  async hset(_key: string, data: Record<string, string>) {
    if (!globalThis.__BLOGS_STORE__) globalThis.__BLOGS_STORE__ = {}
    Object.assign(globalThis.__BLOGS_STORE__, data)
    return 'OK'
  },
  async hdel(_key: string, field: string) {
    if (!globalThis.__BLOGS_STORE__) return 0
    const existed = field in globalThis.__BLOGS_STORE__
    delete globalThis.__BLOGS_STORE__[field]
    return existed ? 1 : 0
  },
  async incr(_key: string) {
    if (typeof globalThis.__BLOGS_COUNTER__ !== 'number') globalThis.__BLOGS_COUNTER__ = 0
    globalThis.__BLOGS_COUNTER__! += 1
    return globalThis.__BLOGS_COUNTER__!
  }
}

const redis = useRedis
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! })
  : (memory as unknown as Redis)

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorImage?: string
  featuredImage: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'pending'
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  readTime: number
  views: number
  likes: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  seoScore?: number
  featured: boolean
}

const BLOG_KEY = 'love-positions:blogs'
const BLOG_COUNTER_KEY = 'love-positions:blog-counter'

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Calculate reading time (average 200 words per minute)
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const time = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, time) // Ensure minimum 1 minute
}

// Calculate SEO score based on various factors
function calculateSEOScore(blog: Partial<BlogPost>): number {
  let score = 0
  
  // Title length (50-60 chars is optimal)
  if (blog.title && blog.title.length >= 50 && blog.title.length <= 60) score += 20
  else if (blog.title && blog.title.length >= 30) score += 10
  
  // Meta description (150-160 chars is optimal)
  if (blog.metaDescription && blog.metaDescription.length >= 150 && blog.metaDescription.length <= 160) score += 20
  else if (blog.metaDescription && blog.metaDescription.length >= 120) score += 10
  
  // Has featured image
  if (blog.featuredImage) score += 15
  
  // Has excerpt
  if (blog.excerpt && blog.excerpt.length >= 100) score += 15
  
  // Has tags
  if (blog.tags && blog.tags.length >= 3) score += 10
  else if (blog.tags && blog.tags.length >= 1) score += 5
  
  // Content length (1500+ words is good)
  if (blog.content && blog.content.length >= 7500) score += 20
  else if (blog.content && blog.content.length >= 3000) score += 10
  
  return Math.min(Math.max(0, score), 100) // Ensure score is between 0-100
}

export default async function handler(req: any, res: any) {
  // CORS headers for Vercel serverless
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  try {
    if (req.method === 'GET') {
      const { id, slug, status, category, featured } = req.query
      
      if (id) {
        // Get single blog by ID
        const blog = await redis.hget(BLOG_KEY, id as string)
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' })
        }
        
        // Increment view count
        const blogData = JSON.parse(blog as string)
        blogData.views = (blogData.views || 0) + 1
        await redis.hset(BLOG_KEY, { [id as string]: JSON.stringify(blogData) })
        
        return res.status(200).json(blogData)
      }
      
      if (slug) {
        // Get single blog by slug
        const allBlogs = await redis.hgetall(BLOG_KEY)
        const blog = Object.values(allBlogs || {}).find((blogStr: any) => {
          const blogData = JSON.parse(blogStr)
          return blogData.slug === slug
        })
        
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' })
        }
        
        const blogData = JSON.parse(blog as string)
        // Increment view count
        blogData.views = (blogData.views || 0) + 1
        await redis.hset(BLOG_KEY, { [blogData.id]: JSON.stringify(blogData) })
        
        return res.status(200).json(blogData)
      }
      
      // Get all blogs with filters
      const allBlogs = await redis.hgetall(BLOG_KEY)
      let blogs: BlogPost[] = Object.values(allBlogs || {}).map((blogStr: any) => JSON.parse(blogStr))
      
      // Apply filters
      if (status) {
        blogs = blogs.filter(blog => blog.status === status)
      }
      
      if (category) {
        blogs = blogs.filter(blog => blog.category === category)
      }
      
      if (featured === 'true') {
        blogs = blogs.filter(blog => blog.featured)
      }
      
      // Sort by publishedAt or createdAt (newest first)
      blogs.sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt).getTime()
        const dateB = new Date(b.publishedAt || b.createdAt).getTime()
        return dateB - dateA
      })
      
      return res.status(200).json(blogs)
    }
    
    if (req.method === 'POST') {
      console.log('📝 Creating new blog post...')
      console.log('📊 Raw request body:', req.body)
      
      const blogData = req.body as Partial<BlogPost>
      
      // Clean the data to ensure all fields are JSON serializable
      const cleanBlogData = {
        title: String(blogData.title || ''),
        content: String(blogData.content || ''),
        author: String(blogData.author || 'Guest Author'),
        excerpt: String(blogData.excerpt || ''),
        slug: String(blogData.slug || ''),
        authorImage: String(blogData.authorImage || ''),
        featuredImage: String(blogData.featuredImage || ''),
        category: String(blogData.category || 'General'),
        tags: Array.isArray(blogData.tags) ? blogData.tags.map(String) : [],
        status: String(blogData.status || 'draft'),
        metaTitle: String(blogData.metaTitle || blogData.title || ''),
        metaDescription: String(blogData.metaDescription || blogData.excerpt || ''),
        metaKeywords: String(blogData.metaKeywords || ''),
        featured: Boolean(blogData.featured || false)
      }
      
      console.log('📊 Cleaned blog data:', cleanBlogData)
      console.log('📊 Data types:', {
        title: typeof cleanBlogData.title,
        content: typeof cleanBlogData.content,
        tags: Array.isArray(cleanBlogData.tags),
        featured: typeof cleanBlogData.featured
      })
      
      // Validate required fields
      if (!cleanBlogData.title || !cleanBlogData.content || !cleanBlogData.author) {
        console.error('❌ Missing required fields:', { title: !!cleanBlogData.title, content: !!cleanBlogData.content, author: !!cleanBlogData.author })
        return res.status(400).json({ error: 'Title, content, and author are required' })
      }
      
      // Generate ID and slug
      const counter = await redis.incr(BLOG_COUNTER_KEY)
      const id = `blog_${counter}`
      const slug = cleanBlogData.slug || generateSlug(cleanBlogData.title)
      
      // Check if slug already exists
      const allBlogs = await redis.hgetall(BLOG_KEY)
      const existingSlug = Object.values(allBlogs || {}).find((blogStr: any) => {
        const blog = JSON.parse(blogStr)
        return blog.slug === slug
      })
      
      if (existingSlug) {
        return res.status(400).json({ error: 'Slug already exists' })
      }
      
      const now = new Date().toISOString()
      const readTime = calculateReadTime(cleanBlogData.content)
      
      const newBlog: BlogPost = {
        id,
        title: cleanBlogData.title,
        slug,
        excerpt: cleanBlogData.excerpt || cleanBlogData.content.substring(0, 200) + '...',
        content: cleanBlogData.content,
        author: cleanBlogData.author,
        authorImage: cleanBlogData.authorImage,
        featuredImage: cleanBlogData.featuredImage || 'https://images.unsplash.com/photo-1516575080133-8f97cda8c7b8?w=800&h=400&fit=crop',
        category: cleanBlogData.category || 'Relationships',
        tags: cleanBlogData.tags || [],
        status: cleanBlogData.status as 'draft' | 'published' | 'pending',
        metaTitle: cleanBlogData.metaTitle || cleanBlogData.title,
        metaDescription: cleanBlogData.metaDescription || cleanBlogData.excerpt || cleanBlogData.content.substring(0, 160),
        metaKeywords: cleanBlogData.metaKeywords,
        readTime,
        views: 0,
        likes: 0,
        createdAt: now,
        updatedAt: now,
        publishedAt: cleanBlogData.status === 'published' ? now : undefined,
        featured: cleanBlogData.featured || false,
        seoScore: 0
      }
      // Calculate SEO score
      newBlog.seoScore = calculateSEOScore(newBlog)
      console.log('📊 SEO score calculated:', newBlog.seoScore)
      
      // Ensure all numeric values are properly handled as integers
      const blogForRedis = {
        id: String(newBlog.id),
        title: String(newBlog.title),
        slug: String(newBlog.slug),
        excerpt: String(newBlog.excerpt),
        content: String(newBlog.content),
        author: String(newBlog.author),
        authorImage: String(newBlog.authorImage || ''),
        featuredImage: String(newBlog.featuredImage),
        category: String(newBlog.category),
        tags: Array.isArray(newBlog.tags) ? newBlog.tags.map(String) : [],
        status: String(newBlog.status),
        metaTitle: String(newBlog.metaTitle || ''),
        metaDescription: String(newBlog.metaDescription || ''),
        metaKeywords: String(newBlog.metaKeywords || ''),
        readTime: Math.max(1, Math.floor(Number(newBlog.readTime || 1))),
        views: Math.max(0, Math.floor(Number(newBlog.views || 0))),
        likes: Math.max(0, Math.floor(Number(newBlog.likes || 0))),
        createdAt: String(newBlog.createdAt),
        updatedAt: String(newBlog.updatedAt),
        publishedAt: newBlog.publishedAt ? String(newBlog.publishedAt) : null,
        seoScore: Math.max(0, Math.min(100, Math.floor(Number(newBlog.seoScore || 0)))),
        featured: Boolean(newBlog.featured)
      }
      
      console.log('📊 Final blog data for Redis:', blogForRedis)
      console.log('📊 Data types check:', {
        seoScore: typeof blogForRedis.seoScore,
        readTime: typeof blogForRedis.readTime,
        views: typeof blogForRedis.views,
        likes: typeof blogForRedis.likes,
        publishedAt: typeof blogForRedis.publishedAt
      })
      
      await redis.hset(BLOG_KEY, { [id]: JSON.stringify(blogForRedis) })
      console.log('✅ Blog saved to database')
      
      return res.status(201).json(newBlog)
    }
    
    if (req.method === 'PUT') {
      const { id } = req.query
      const rawUpdateData = req.body as Partial<BlogPost>
      
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' })
      }
      
      // Clean the update data to ensure JSON serialization
      const updateData = {
        title: rawUpdateData.title ? String(rawUpdateData.title) : undefined,
        content: rawUpdateData.content ? String(rawUpdateData.content) : undefined,
        author: rawUpdateData.author ? String(rawUpdateData.author) : undefined,
        excerpt: rawUpdateData.excerpt ? String(rawUpdateData.excerpt) : undefined,
        slug: rawUpdateData.slug ? String(rawUpdateData.slug) : undefined,
        authorImage: rawUpdateData.authorImage ? String(rawUpdateData.authorImage) : undefined,
        featuredImage: rawUpdateData.featuredImage ? String(rawUpdateData.featuredImage) : undefined,
        category: rawUpdateData.category ? String(rawUpdateData.category) : undefined,
        tags: Array.isArray(rawUpdateData.tags) ? rawUpdateData.tags.map(String) : undefined,
        status: rawUpdateData.status ? String(rawUpdateData.status) : undefined,
        metaTitle: rawUpdateData.metaTitle ? String(rawUpdateData.metaTitle) : undefined,
        metaDescription: rawUpdateData.metaDescription ? String(rawUpdateData.metaDescription) : undefined,
        metaKeywords: rawUpdateData.metaKeywords ? String(rawUpdateData.metaKeywords) : undefined,
        featured: rawUpdateData.featured !== undefined ? Boolean(rawUpdateData.featured) : undefined
      }
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined) {
          delete updateData[key as keyof typeof updateData]
        }
      })
      
      console.log('📝 Updating blog post:', id)
      console.log('📊 Cleaned update data:', updateData)
      
      const existingBlog = await redis.hget(BLOG_KEY, id as string)
      if (!existingBlog) {
        return res.status(404).json({ error: 'Blog not found' })
      }
      
      const blogData = JSON.parse(existingBlog as string)
      
      // Update slug if title changed
      if (updateData.title && updateData.title !== blogData.title) {
        const newSlug = generateSlug(updateData.title)
        
        // Check if new slug already exists
        const allBlogs = await redis.hgetall(BLOG_KEY)
        const existingSlug = Object.values(allBlogs || {}).find((blogStr: any) => {
          const blog = JSON.parse(blogStr)
          return blog.slug === newSlug && blog.id !== id
        })
        
        if (existingSlug) {
          return res.status(400).json({ error: 'Slug already exists' })
        }
        
        updateData.slug = newSlug
      }
      
      // Update reading time if content changed
      if (updateData.content) {
        // @ts-expect-error: readTime is not in updateData type but will be merged into blogData
        updateData.readTime = calculateReadTime(updateData.content)
      }

      // Update published date if status changed to published
      if (updateData.status === 'published' && blogData.status !== 'published') {
        // @ts-expect-error: publishedAt may not be in updateData type but is valid for blog object
        updateData.publishedAt = new Date().toISOString()
      }

      const updatedBlog = {
        ...blogData,
        ...updateData,
        updatedAt: new Date().toISOString()
      }
      
      // Recalculate SEO score
      updatedBlog.seoScore = calculateSEOScore(updatedBlog)
      
      // Ensure all numeric values are properly handled as integers
      const blogForRedis = {
        id: String(updatedBlog.id),
        title: String(updatedBlog.title),
        slug: String(updatedBlog.slug),
        excerpt: String(updatedBlog.excerpt),
        content: String(updatedBlog.content),
        author: String(updatedBlog.author),
        authorImage: String(updatedBlog.authorImage || ''),
        featuredImage: String(updatedBlog.featuredImage),
        category: String(updatedBlog.category),
        tags: Array.isArray(updatedBlog.tags) ? updatedBlog.tags.map(String) : [],
        status: String(updatedBlog.status),
        metaTitle: String(updatedBlog.metaTitle || ''),
        metaDescription: String(updatedBlog.metaDescription || ''),
        metaKeywords: String(updatedBlog.metaKeywords || ''),
        readTime: Math.max(1, Math.floor(Number(updatedBlog.readTime || 1))),
        views: Math.max(0, Math.floor(Number(updatedBlog.views || 0))),
        likes: Math.max(0, Math.floor(Number(updatedBlog.likes || 0))),
        createdAt: String(updatedBlog.createdAt),
        updatedAt: String(updatedBlog.updatedAt),
        publishedAt: updatedBlog.publishedAt ? String(updatedBlog.publishedAt) : null,
        seoScore: Math.max(0, Math.min(100, Math.floor(Number(updatedBlog.seoScore || 0)))),
        featured: Boolean(updatedBlog.featured)
      }
      
      console.log('📊 Final updated blog data for Redis:', blogForRedis)
      
      await redis.hset(BLOG_KEY, { [id as string]: JSON.stringify(blogForRedis) })
      
      return res.status(200).json(updatedBlog)
    }
    
    if (req.method === 'DELETE') {
      const { id } = req.query
      
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' })
      }
      
      const existingBlog = await redis.hget(BLOG_KEY, id as string)
      if (!existingBlog) {
        return res.status(404).json({ error: 'Blog not found' })
      }
      
      await redis.hdel(BLOG_KEY, id as string)
      
      return res.status(200).json({ message: 'Blog deleted successfully' })
    }
    
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Blog API error:', error)
    console.error('Error details:', error.message)
    console.error('Stack trace:', error.stack)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message,
      timestamp: new Date().toISOString()
    })
  }
}
