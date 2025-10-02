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
    const store = globalThis.__BLOGS_STORE__ || {}
    console.log('🔍 Memory store data:', store)
    return store
  },
  async hget(_key: string, field: string) {
    const store = globalThis.__BLOGS_STORE__ || {}
    const value = store[field]
    console.log('🔍 Memory hget:', { field, value, type: typeof value })
    return value
  },
  async hset(_key: string, data: Record<string, string>) {
    if (!globalThis.__BLOGS_STORE__) globalThis.__BLOGS_STORE__ = {}
    console.log('🔍 Memory hset data:', data)
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
  },
  async del(_key: string) {
    if (_key === BLOG_COUNTER_KEY) {
      globalThis.__BLOGS_COUNTER__ = 0
    }
    return 1
  },
  async get(_key: string) {
    if (_key === BLOG_COUNTER_KEY) {
      return globalThis.__BLOGS_COUNTER__ || 0
    }
    return null
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
      const { id, slug, status, category, featured, debug } = req.query
      
      // Debug endpoint to clear data
      if (debug === 'clear') {
        console.log('🧹 Clearing all blog data...')
        await redis.del(BLOG_KEY)
        await redis.del(BLOG_COUNTER_KEY)
        return res.status(200).json({ message: 'Data cleared successfully' })
      }
      
      // Debug endpoint to check data
      if (debug === 'check') {
        const allBlogs = await redis.hgetall(BLOG_KEY)
        const counter = await redis.get(BLOG_COUNTER_KEY)
        return res.status(200).json({ 
          blogCount: Object.keys(allBlogs || {}).length,
          counter: counter,
          sampleData: Object.entries(allBlogs || {}).slice(0, 2),
          usingRedis: useRedis
        })
      }
      
      // Debug endpoint to fix empty slugs
      if (debug === 'fix-slugs') {
        console.log('🔧 Fixing empty slugs...')
        const allBlogs = await redis.hgetall(BLOG_KEY)
        let fixedCount = 0
        
        for (const [key, blogStr] of Object.entries(allBlogs || {})) {
          let blog
          if (typeof blogStr === 'string') {
            try {
              blog = JSON.parse(blogStr)
            } catch (error) {
              continue
            }
          } else {
            blog = blogStr
          }
          
          if (!blog.slug || blog.slug.trim() === '') {
            const newSlug = generateSlug(blog.title)
            blog.slug = newSlug
            blog.updatedAt = new Date().toISOString()
            
            await redis.hset(BLOG_KEY, { [key]: JSON.stringify(blog) })
            fixedCount++
            console.log(`✅ Fixed slug for ${key}: ${newSlug}`)
          }
        }
        
        return res.status(200).json({ 
          message: `Fixed ${fixedCount} empty slugs`,
          fixedCount
        })
      }
      
      if (id) {
        // Get single blog by ID
        const blog = await redis.hget(BLOG_KEY, id as string)
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' })
        }
        
        // Parse blog data safely
        let blogData
        if (typeof blog === 'string') {
          try {
            blogData = JSON.parse(blog)
          } catch (error) {
            console.error('❌ Failed to parse blog string:', error)
            return res.status(500).json({ error: 'Failed to parse blog data' })
          }
        } else if (typeof blog === 'object' && blog !== null) {
          blogData = blog
        } else {
          return res.status(500).json({ error: 'Invalid blog data format' })
        }
        
        // Ensure category is not null
        if (blogData.category === null || blogData.category === undefined) {
          blogData.category = 'General'
        }
        
        // Increment view count
        blogData.views = (blogData.views || 0) + 1
        await redis.hset(BLOG_KEY, { [id as string]: JSON.stringify(blogData) })
        
        return res.status(200).json(blogData)
      }
      
      if (slug) {
        // Get single blog by slug
        const allBlogs = await redis.hgetall(BLOG_KEY)
        const blog = Object.values(allBlogs || {}).find((blogStr: any) => {
          let blogData
          if (typeof blogStr === 'string') {
            try {
              blogData = JSON.parse(blogStr)
            } catch (error) {
              console.error('❌ Failed to parse blog string:', error)
              return false
            }
          } else if (typeof blogStr === 'object' && blogStr !== null) {
            blogData = blogStr
          } else {
            return false
          }
          return blogData.slug === slug
        })
        
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' })
        }
        
        let blogData
        if (typeof blog === 'string') {
          try {
            blogData = JSON.parse(blog)
          } catch (error) {
            console.error('❌ Failed to parse blog string:', error)
            return res.status(500).json({ error: 'Failed to parse blog data' })
          }
        } else {
          blogData = blog
        }
        
        // Ensure category is not null
        if (blogData.category === null || blogData.category === undefined) {
          blogData.category = 'General'
        }
        
        // Increment view count
        blogData.views = (blogData.views || 0) + 1
        await redis.hset(BLOG_KEY, { [blogData.id]: JSON.stringify(blogData) })
        
        return res.status(200).json(blogData)
      }
      
      // Get all blogs with filters
      const allBlogs = await redis.hgetall(BLOG_KEY)
      console.log('🔍 Raw Redis data:', allBlogs)
      console.log('🔍 Data types:', Object.entries(allBlogs || {}).map(([key, value]) => ({ key, type: typeof value, isString: typeof value === 'string' })))
      
      let blogs: BlogPost[] = Object.values(allBlogs || {}).map((blogStr: any, index: number) => {
        console.log(`🔍 Processing blog ${index}:`, { type: typeof blogStr, isString: typeof blogStr === 'string', isObject: typeof blogStr === 'object' })
        
        // Handle both string and object data from Redis
        if (typeof blogStr === 'string') {
          try {
            const parsed = JSON.parse(blogStr)
            console.log(`✅ Successfully parsed blog ${index}`)
            // Ensure category is not null
            if (parsed.category === null || parsed.category === undefined) {
              parsed.category = 'General'
            }
            return parsed
          } catch (error) {
            console.error(`❌ Failed to parse blog string ${index}:`, error)
            console.error('❌ Raw string data:', blogStr)
            return null
          }
        } else if (typeof blogStr === 'object' && blogStr !== null) {
          // Already an object, return as is
          console.log(`✅ Blog ${index} is already an object`)
          // Ensure category is not null
          if (blogStr.category === null || blogStr.category === undefined) {
            blogStr.category = 'General'
          }
          return blogStr
        } else {
          console.error(`❌ Invalid blog data type ${index}:`, typeof blogStr)
          return null
        }
      }).filter(Boolean) // Remove null values
      
      console.log('🔍 Final processed blogs:', blogs.length)
      
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
      console.log('🔧 Using Redis:', useRedis ? 'Yes' : 'No (memory fallback)')
      
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
      
      // Generate ID and slug - ensure counter is properly initialized
      let counter: number
      try {
        counter = await redis.incr(BLOG_COUNTER_KEY)
      } catch (error) {
        // If incr fails, the key might contain non-integer data, so reset it
        console.log('🔄 Resetting blog counter due to error:', error.message)
        await redis.del(BLOG_COUNTER_KEY)
        counter = await redis.incr(BLOG_COUNTER_KEY)
      }
      const id = `blog_${counter}`
      const slug = cleanBlogData.slug && cleanBlogData.slug.trim() !== '' 
        ? cleanBlogData.slug 
        : generateSlug(cleanBlogData.title)
      
      console.log('📊 Generated slug:', slug, 'from title:', cleanBlogData.title)
      
      // Check if slug already exists
      const allBlogs = await redis.hgetall(BLOG_KEY)
      const existingSlug = Object.values(allBlogs || {}).find((blogStr: any) => {
        let blog
        if (typeof blogStr === 'string') {
          try {
            blog = JSON.parse(blogStr)
          } catch (error) {
            console.error('❌ Failed to parse blog for slug check in POST:', error)
            return false
          }
        } else if (typeof blogStr === 'object' && blogStr !== null) {
          blog = blogStr
        } else {
          return false
        }
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
        publishedAt: newBlog.publishedAt ? String(newBlog.publishedAt) : '',
        seoScore: Math.max(0, Math.min(100, Math.floor(Number(newBlog.seoScore || 0)))),
        featured: Boolean(newBlog.featured)
      }
      
      // Final validation - ensure no undefined values
      const finalBlogData = Object.fromEntries(
        Object.entries(blogForRedis).map(([key, value]) => [
          key, 
          value === undefined ? '' : value
        ])
      )
      
      console.log('📊 Final blog data for Redis:', finalBlogData)
      console.log('📊 Data types check:', {
        seoScore: typeof finalBlogData.seoScore,
        readTime: typeof finalBlogData.readTime,
        views: typeof finalBlogData.views,
        likes: typeof finalBlogData.likes,
        publishedAt: typeof finalBlogData.publishedAt
      })
      
      await redis.hset(BLOG_KEY, { [id]: JSON.stringify(finalBlogData) })
      console.log('✅ Blog saved to database')
      
      // Create a clean response object to avoid JSON serialization issues
      const responseBlog = {
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
      
      console.log('📊 Response blog data:', responseBlog)
      
      try {
        return res.status(201).json(responseBlog)
      } catch (jsonError) {
        console.error('❌ JSON response error:', jsonError)
        return res.status(201).json({
          id: String(newBlog.id),
          title: String(newBlog.title),
          message: 'Blog created successfully'
        })
      }
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
      
      // Parse blog data safely
      let blogData
      if (typeof existingBlog === 'string') {
        try {
          blogData = JSON.parse(existingBlog)
        } catch (error) {
          console.error('❌ Failed to parse existing blog:', error)
          return res.status(500).json({ error: 'Failed to parse existing blog data' })
        }
      } else if (typeof existingBlog === 'object' && existingBlog !== null) {
        blogData = existingBlog
      } else {
        return res.status(500).json({ error: 'Invalid existing blog data format' })
      }
      
      // Update slug if title changed
      if (updateData.title && updateData.title !== blogData.title) {
        const newSlug = generateSlug(updateData.title)
        
        // Check if new slug already exists
        const allBlogs = await redis.hgetall(BLOG_KEY)
        const existingSlug = Object.values(allBlogs || {}).find((blogStr: any) => {
          let blog
          if (typeof blogStr === 'string') {
            try {
              blog = JSON.parse(blogStr)
            } catch (error) {
              console.error('❌ Failed to parse blog for slug check:', error)
              return false
            }
          } else if (typeof blogStr === 'object' && blogStr !== null) {
            blog = blogStr
          } else {
            return false
          }
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
        publishedAt: updatedBlog.publishedAt ? String(updatedBlog.publishedAt) : '',
        seoScore: Math.max(0, Math.min(100, Math.floor(Number(updatedBlog.seoScore || 0)))),
        featured: Boolean(updatedBlog.featured)
      }
      
      // Final validation - ensure no undefined values
      const finalUpdatedData = Object.fromEntries(
        Object.entries(blogForRedis).map(([key, value]) => [
          key, 
          value === undefined ? '' : value
        ])
      )
      
      console.log('📊 Final updated blog data for Redis:', finalUpdatedData)
      
      await redis.hset(BLOG_KEY, { [id as string]: JSON.stringify(finalUpdatedData) })
      
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
    console.error('Error details:', error instanceof Error ? error.message : String(error))
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace')
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: errorMessage,
      timestamp: new Date().toISOString()
    })
  }
}
