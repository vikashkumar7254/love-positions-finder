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
  return Math.ceil(wordCount / wordsPerMinute)
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
  
  return Math.min(score, 100)
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
      const blogData = req.body as Partial<BlogPost>
      
      console.log('📊 Blog data received:', blogData)
      
      // Validate required fields
      if (!blogData.title || !blogData.content || !blogData.author) {
        console.error('❌ Missing required fields:', { title: !!blogData.title, content: !!blogData.content, author: !!blogData.author })
        return res.status(400).json({ error: 'Title, content, and author are required' })
      }
      
      // Generate ID and slug
      const counter = await redis.incr(BLOG_COUNTER_KEY)
      const id = `blog_${counter}`
      const slug = blogData.slug || generateSlug(blogData.title)
      
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
      const readTime = calculateReadTime(blogData.content)
      
      const newBlog: BlogPost = {
        id,
        title: blogData.title,
        slug,
        excerpt: blogData.excerpt || blogData.content.substring(0, 200) + '...',
        content: blogData.content,
        author: blogData.author,
        authorImage: blogData.authorImage,
        featuredImage: blogData.featuredImage || 'https://images.unsplash.com/photo-1516575080133-8f97cda8c7b8?w=800&h=400&fit=crop',
        category: blogData.category || 'Relationships',
        tags: blogData.tags || [],
        status: blogData.status || 'draft',
        metaTitle: blogData.metaTitle || blogData.title,
        metaDescription: blogData.metaDescription || blogData.excerpt || blogData.content.substring(0, 160),
        metaKeywords: blogData.metaKeywords,
        readTime,
        views: 0,
        likes: 0,
        createdAt: now,
        updatedAt: now,
        publishedAt: blogData.status === 'published' ? now : undefined,
        featured: blogData.featured || false,
        seoScore: 0
      }
      
      // Calculate SEO score
      newBlog.seoScore = calculateSEOScore(newBlog)
      console.log('📊 SEO score calculated:', newBlog.seoScore)
      
      await redis.hset(BLOG_KEY, { [id]: JSON.stringify(newBlog) })
      console.log('✅ Blog saved to database')
      
      return res.status(201).json(newBlog)
    }
    
    if (req.method === 'PUT') {
      const { id } = req.query
      const updateData = req.body as Partial<BlogPost>
      
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' })
      }
      
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
        updateData.readTime = calculateReadTime(updateData.content)
      }
      
      // Update published date if status changed to published
      if (updateData.status === 'published' && blogData.status !== 'published') {
        updateData.publishedAt = new Date().toISOString()
      }
      
      const updatedBlog = {
        ...blogData,
        ...updateData,
        updatedAt: new Date().toISOString()
      }
      
      // Recalculate SEO score
      updatedBlog.seoScore = calculateSEOScore(updatedBlog)
      
      await redis.hset(BLOG_KEY, { [id as string]: JSON.stringify(updatedBlog) })
      
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
