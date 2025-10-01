import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/enhanced-card'
import { Button } from '@/components/ui/enhanced-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Globe, 
  FileText, 
  Image, 
  Settings, 
  Save, 
  RefreshCw,
  Eye,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import { AdminProtectedRoute } from '@/components/AdminAuth'

interface SEOConfig {
  siteTitle: string
  siteDescription: string
  siteKeywords: string
  siteUrl: string
  siteImage: string
  twitterHandle: string
  googleAnalyticsId: string
  googleSiteVerification: string
  enableSEOQuickActions: boolean
  facebookAppId: string
  pages: {
    [key: string]: {
      title: string
      description: string
      keywords: string
      canonical: string
      ogTitle: string
      ogDescription: string
      ogImage: string
    }
  }
}

const SEOManagement = () => {
  const [config, setConfig] = useState<SEOConfig>({
    siteTitle: 'ScratchSexPositions - Discover Intimate Romance',
    siteDescription: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
    siteKeywords: 'sex positions, romance, intimate, couples, kama sutra, relationships, scratch cards',
    siteUrl: 'https://scratchsexpositions.com',
    siteImage: 'https://lovable.dev/opengraph-image-p98pqg.png',
    twitterHandle: '@scratchsexpos',
    googleAnalyticsId: 'G-KYMBBSB4XS',
    googleSiteVerification: 'UbHLGFZRitXzyw7wZ0OpUI1Aveb7wpsfy9rqxS1cTRM',
    enableSEOQuickActions: true,
    facebookAppId: '',
    pages: {
      home: {
        title: 'ScratchSexPositions - Discover Intimate Romance',
        description: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
        keywords: 'sex positions, romance, intimate, couples, kama sutra, relationships, scratch cards',
        canonical: 'https://scratchsexpositions.com/',
        ogTitle: 'ScratchSexPositions - Discover Intimate Romance',
        ogDescription: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
        ogImage: 'https://lovable.dev/opengraph-image-p98pqg.png'
      },
      scratchPosition: {
        title: 'Scratch Cards | Reveal 6 Surprise Positions',
        description: 'Scratch to reveal 6 surprise intimate positions with instructions and tips. Mobile-friendly canvas with progress tracking.',
        keywords: 'scratch cards, intimate positions, romantic games, couples, surprise positions',
        canonical: 'https://scratchsexpositions.com/games/scratch-position',
        ogTitle: 'Scratch Cards | Reveal 6 Surprise Positions',
        ogDescription: 'Scratch to reveal 6 surprise intimate positions with instructions and tips.',
        ogImage: 'https://lovable.dev/opengraph-image-p98pqg.png'
      },
      positions: {
        title: 'Intimate Positions | 500+ Romantic Experiences',
        description: 'Discover 500+ intimate positions with detailed instructions, difficulty levels, and benefits for couples.',
        keywords: 'intimate positions, romantic positions, couples, kama sutra, sex positions',
        canonical: 'https://scratchsexpositions.com/positions',
        ogTitle: 'Intimate Positions | 500+ Romantic Experiences',
        ogDescription: 'Discover 500+ intimate positions with detailed instructions, difficulty levels, and benefits for couples.',
        ogImage: 'https://lovable.dev/opengraph-image-p98pqg.png'
      },
      blog: {
        title: 'Romance Blog | Intimate Tips & Guides',
        description: 'Expert advice on romance, intimacy, and relationship tips for couples. Read our latest articles and guides.',
        keywords: 'romance blog, intimate tips, relationship advice, couples guide, romance articles',
        canonical: 'https://scratchsexpositions.com/blog',
        ogTitle: 'Romance Blog | Intimate Tips & Guides',
        ogDescription: 'Expert advice on romance, intimacy, and relationship tips for couples.',
        ogImage: 'https://lovable.dev/opengraph-image-p98pqg.png'
      }
    }
  })

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('global')

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('seo_config')
      if (saved) {
        setConfig(JSON.parse(saved))
      }
    } catch (error) {
      // Error loading SEO config, use defaults
    }
  }

  const saveConfig = async () => {
    setLoading(true)
    try {
      localStorage.setItem('seo_config', JSON.stringify(config))
      
      // Update index.html with new meta tags
      updateIndexHtml()
      
      // Update sitemap API
      updateSitemapApi()
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      // Error saving SEO config
    } finally {
      setLoading(false)
    }
  }

  const updateIndexHtml = () => {
    // This would typically be done server-side or via build process
    // For now, we'll just track the changes needed
    // Future: Update index.html with new meta tags
  }

  const updateSitemapApi = () => {
    // Update the sitemap API with new site URL
    // Future: Update sitemap generation with new URL
  }

  const testSEO = (page: string) => {
    const pageConfig = config.pages[page]
    if (!pageConfig) return

    const testUrl = `${config.siteUrl}${page === 'home' ? '/' : `/${page}`}`
    window.open(`https://search.google.com/test/rich-results?url=${encodeURIComponent(testUrl)}`, '_blank')
  }

  const previewPage = (page: string) => {
    const pageConfig = config.pages[page]
    if (!pageConfig) return

    const url = page === 'home' ? '/' : `/${page}`
    window.open(url, '_blank')
  }

  const updatePageConfig = (page: string, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: {
          ...prev.pages[page],
          [field]: value
        }
      }
    }))
  }

  const updateGlobalConfig = (field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
                  SEO Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Manage meta tags, titles, descriptions, and SEO settings
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={saveConfig}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : saved ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="global">Global SEO</TabsTrigger>
                <TabsTrigger value="pages">Page SEO</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Global SEO */}
              <TabsContent value="global" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Global SEO Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="siteTitle">Site Title</Label>
                        <Input
                          id="siteTitle"
                          value={config.siteTitle}
                          onChange={(e) => updateGlobalConfig('siteTitle', e.target.value)}
                          placeholder="Your site title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="siteUrl">Site URL</Label>
                        <Input
                          id="siteUrl"
                          value={config.siteUrl}
                          onChange={(e) => updateGlobalConfig('siteUrl', e.target.value)}
                          placeholder="https://yourdomain.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={config.siteDescription}
                        onChange={(e) => updateGlobalConfig('siteDescription', e.target.value)}
                        placeholder="Your site description"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="siteKeywords">Keywords (comma separated)</Label>
                      <Input
                        id="siteKeywords"
                        value={config.siteKeywords}
                        onChange={(e) => updateGlobalConfig('siteKeywords', e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="siteImage">Default OG Image URL</Label>
                      <Input
                        id="siteImage"
                        value={config.siteImage}
                        onChange={(e) => updateGlobalConfig('siteImage', e.target.value)}
                        placeholder="https://yourdomain.com/image.jpg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Page SEO */}
              <TabsContent value="pages" className="space-y-6">
                {Object.entries(config.pages).map(([pageKey, pageConfig]) => (
                  <Card key={pageKey}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 capitalize">
                          <FileText className="w-5 h-5" />
                          {pageKey === 'home' ? 'Homepage' : pageKey.replace(/([A-Z])/g, ' $1').trim()}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => previewPage(pageKey)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => testSEO(pageKey)}
                          >
                            <Search className="w-4 h-4 mr-1" />
                            Test SEO
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`${pageKey}-title`}>Page Title</Label>
                          <Input
                            id={`${pageKey}-title`}
                            value={pageConfig.title}
                            onChange={(e) => updatePageConfig(pageKey, 'title', e.target.value)}
                            placeholder="Page title"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${pageKey}-canonical`}>Canonical URL</Label>
                          <Input
                            id={`${pageKey}-canonical`}
                            value={pageConfig.canonical}
                            onChange={(e) => updatePageConfig(pageKey, 'canonical', e.target.value)}
                            placeholder="https://yourdomain.com/page"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`${pageKey}-description`}>Meta Description</Label>
                        <Textarea
                          id={`${pageKey}-description`}
                          value={pageConfig.description}
                          onChange={(e) => updatePageConfig(pageKey, 'description', e.target.value)}
                          placeholder="Page description"
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`${pageKey}-keywords`}>Keywords</Label>
                        <Input
                          id={`${pageKey}-keywords`}
                          value={pageConfig.keywords}
                          onChange={(e) => updatePageConfig(pageKey, 'keywords', e.target.value)}
                          placeholder="page specific keywords"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`${pageKey}-ogTitle`}>OG Title</Label>
                          <Input
                            id={`${pageKey}-ogTitle`}
                            value={pageConfig.ogTitle}
                            onChange={(e) => updatePageConfig(pageKey, 'ogTitle', e.target.value)}
                            placeholder="Open Graph title"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${pageKey}-ogImage`}>OG Image</Label>
                          <Input
                            id={`${pageKey}-ogImage`}
                            value={pageConfig.ogImage}
                            onChange={(e) => updatePageConfig(pageKey, 'ogImage', e.target.value)}
                            placeholder="https://yourdomain.com/og-image.jpg"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`${pageKey}-ogDescription`}>OG Description</Label>
                        <Textarea
                          id={`${pageKey}-ogDescription`}
                          value={pageConfig.ogDescription}
                          onChange={(e) => updatePageConfig(pageKey, 'ogDescription', e.target.value)}
                          placeholder="Open Graph description"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Social Media */}
              <TabsContent value="social" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Social Media Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="twitterHandle">Twitter Handle</Label>
                        <Input
                          id="twitterHandle"
                          value={config.twitterHandle}
                          onChange={(e) => updateGlobalConfig('twitterHandle', e.target.value)}
                          placeholder="@yourhandle"
                        />
                      </div>
                      <div>
                        <Label htmlFor="facebookAppId">Facebook App ID</Label>
                        <Input
                          id="facebookAppId"
                          value={config.facebookAppId}
                          onChange={(e) => updateGlobalConfig('facebookAppId', e.target.value)}
                          placeholder="123456789012345"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics */}
              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Analytics & Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                        <Input
                          id="googleAnalyticsId"
                          value={config.googleAnalyticsId}
                          onChange={(e) => updateGlobalConfig('googleAnalyticsId', e.target.value)}
                          placeholder="G-XXXXXXXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="googleSiteVerification">Google Site Verification</Label>
                        <Input
                          id="googleSiteVerification"
                          value={config.googleSiteVerification}
                          onChange={(e) => updateGlobalConfig('googleSiteVerification', e.target.value)}
                          placeholder="verification code"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="enableSEOQuickActions"
                          checked={config.enableSEOQuickActions}
                          onCheckedChange={(checked: boolean) => updateGlobalConfig('enableSEOQuickActions', String(checked))}
                        />
                        <Label htmlFor="enableSEOQuickActions">Enable SEO Quick Actions</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Show floating SEO tools on all pages for easy access to sitemap, robots.txt, and Google Search Console
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open(`${config.siteUrl}/sitemap.xml`, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Sitemap
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`${config.siteUrl}/robots.txt`, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Robots.txt
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://search.google.com/search-console', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google Search Console
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  )
}

export default SEOManagement
