// Sample blog data for testing
export const sampleBlogs = [
  {
    id: 'sample-1',
    title: '10 Romantic Date Ideas for Couples',
    slug: 'romantic-date-ideas-couples',
    excerpt: 'Discover creative and intimate date ideas that will bring you closer together and create lasting memories.',
    content: `
      <h2>1. Sunset Picnic</h2>
      <p>Pack a basket with your favorite foods and find a beautiful spot to watch the sunset together. Bring a blanket, some wine, and enjoy each other's company as the sky changes colors.</p>
      
      <h2>2. Cooking Class for Two</h2>
      <p>Learn to cook a new cuisine together. Whether it's Italian, Thai, or French, cooking together is intimate and fun. Plus, you get to enjoy the delicious results!</p>
      
      <h2>3. Stargazing Adventure</h2>
      <p>Drive to a dark spot away from city lights and spend the evening identifying constellations. Bring hot chocolate and cozy blankets for extra warmth.</p>
      
      <h2>4. Art Gallery Walk</h2>
      <p>Visit local art galleries and museums. Discuss the artwork, share your interpretations, and learn about each other's artistic tastes.</p>
      
      <h2>5. Wine Tasting</h2>
      <p>Visit a local winery or have a wine tasting at home. Learn about different wines, their origins, and find your favorites together.</p>
    `,
    author: 'Admin',
    featuredImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=630&fit=crop&crop=center',
    category: 'Romance',
    tags: ['date ideas', 'romance', 'couples', 'relationships'],
    status: 'published',
    readTime: 5,
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    featured: true
  },
  {
    id: 'sample-2',
    title: 'The Science of Intimacy',
    slug: 'science-of-intimacy',
    excerpt: 'Understanding the psychological and physiological aspects of intimacy can help strengthen your relationship.',
    content: `
      <h2>The Psychology of Intimacy</h2>
      <p>Intimacy is more than just physical closeness. It involves emotional vulnerability, trust, and deep connection. Research shows that couples who maintain high levels of intimacy report greater relationship satisfaction.</p>
      
      <h2>Physical Benefits</h2>
      <p>Regular intimate connection releases oxytocin, the "love hormone," which reduces stress and strengthens emotional bonds. It also boosts immune function and improves sleep quality.</p>
      
      <h2>Building Intimacy</h2>
      <p>Intimacy is built through consistent small actions: active listening, physical touch, shared experiences, and emotional support. It requires both partners to be present and engaged.</p>
      
      <h2>Communication is Key</h2>
      <p>Open, honest communication about needs, desires, and boundaries is essential for maintaining intimacy. Regular check-ins help ensure both partners feel heard and valued.</p>
    `,
    author: 'Admin',
    featuredImage: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
    category: 'Science',
    tags: ['intimacy', 'science', 'psychology', 'relationships'],
    status: 'published',
    readTime: 4,
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    featured: false
  },
  {
    id: 'sample-3',
    title: 'Communication Tips for Couples',
    slug: 'communication-tips-couples',
    excerpt: 'Learn effective communication strategies that can transform your relationship and deepen your connection.',
    content: `
      <h2>Active Listening</h2>
      <p>Truly listen to your partner without planning your response. Focus on understanding their perspective and feelings, not on being right.</p>
      
      <h2>Use "I" Statements</h2>
      <p>Instead of "You always..." try "I feel..." This reduces defensiveness and helps your partner understand your experience without feeling attacked.</p>
      
      <h2>Timing Matters</h2>
      <p>Choose the right moment for important conversations. Avoid discussing sensitive topics when either of you is stressed, tired, or distracted.</p>
      
      <h2>Non-Verbal Communication</h2>
      <p>Pay attention to body language, tone of voice, and facial expressions. These often communicate more than words alone.</p>
      
      <h2>Regular Check-ins</h2>
      <p>Schedule regular times to discuss your relationship, goals, and any concerns. This prevents small issues from becoming big problems.</p>
    `,
    author: 'Admin',
    featuredImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=630&fit=crop&crop=center',
    category: 'Communication',
    tags: ['communication', 'relationships', 'tips', 'couples'],
    status: 'published',
    readTime: 3,
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    featured: false
  }
]

// Function to add sample blogs to localStorage for testing
export const addSampleBlogs = () => {
  try {
    const existingBlogs = JSON.parse(localStorage.getItem('love-positions:blogs') || '{}')
    
    sampleBlogs.forEach(blog => {
      if (!existingBlogs[blog.id]) {
        existingBlogs[blog.id] = JSON.stringify(blog)
      }
    })
    
    localStorage.setItem('love-positions:blogs', JSON.stringify(existingBlogs))
    console.log('✅ Sample blogs added to localStorage')
    return true
  } catch (error) {
    console.error('❌ Error adding sample blogs:', error)
    return false
  }
}
