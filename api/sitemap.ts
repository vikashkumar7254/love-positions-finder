const SITE = process.env.PUBLIC_SITE_URL || 'https://scratchsexpositions.com'

async function fetchBlogs(): Promise<{ slug: string; updatedAt?: string; publishedAt?: string }[]> {
  try {
    const res = await fetch(`${SITE}/api/blogs?status=published`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const staticPaths = [
    '/',
    '/games',
    '/games/scratch-position',
    '/games/spin-for-desire',
    '/positions',
    '/positions/most-popular',
    '/blog'
  ]

  const blogs = await fetchBlogs()

  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: string }[] = [
    ...staticPaths.map(p => ({ loc: `${SITE}${p}`, changefreq: 'weekly', priority: '0.8' })),
    ...blogs.map((b: any) => ({
      loc: `${SITE}/blog/${b.slug}`,
      lastmod: b.publishedAt || b.updatedAt,
      changefreq: 'monthly',
      priority: '0.6'
    }))
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `
    <url>
      <loc>${u.loc}</loc>
      ${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ''}
      ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ''}
      ${u.priority ? `<priority>${u.priority}</priority>` : ''}
    </url>`).join('')}
  </urlset>`

  res.setHeader('Content-Type', 'application/xml')
  return res.status(200).send(xml)
}



