import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { 
  Search, 
  FileText, 
  Globe, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Eye
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const SEOQuickActions = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  // Only show for admin users
  const isAdmin = localStorage.getItem('admin_authenticated') === 'true'
  if (!isAdmin) return null
  
  // Check if SEO Quick Actions are enabled
  const isEnabled = localStorage.getItem('seo_config') ? 
    JSON.parse(localStorage.getItem('seo_config') || '{}').enableSEOQuickActions !== false : true
  
  if (!isEnabled) return null

  const siteUrl = window.location.origin
  const sitemapUrl = `${siteUrl}/sitemap.xml`
  const robotsUrl = `${siteUrl}/robots.txt`
  const googleConsoleUrl = "https://search.google.com/search-console"

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
  }

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const checkSEOStatus = () => {
    const checks = [
      {
        name: "Google Site Verification",
        status: document.querySelector('meta[name="google-site-verification"]') ? 'success' : 'error',
        message: document.querySelector('meta[name="google-site-verification"]') ? 
          'Verification meta tag present' : 'Verification meta tag missing'
      },
      {
        name: "Google Analytics",
        status: document.querySelector('script[src*="googletagmanager.com"]') ? 'success' : 'error',
        message: document.querySelector('script[src*="googletagmanager.com"]') ? 
          'Analytics tracking active' : 'Analytics tracking missing'
      },
      {
        name: "Meta Description",
        status: document.querySelector('meta[name="description"]')?.getAttribute('content') ? 'success' : 'error',
        message: document.querySelector('meta[name="description"]')?.getAttribute('content') ? 
          'Meta description present' : 'Meta description missing'
      },
      {
        name: "Open Graph Tags",
        status: document.querySelector('meta[property="og:title"]') ? 'success' : 'error',
        message: document.querySelector('meta[property="og:title"]') ? 
          'Social sharing tags present' : 'Social sharing tags missing'
      }
    ]

    return checks
  }

  const seoChecks = checkSEOStatus()

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <Search className="w-5 h-5 mr-2" />
          SEO Tools
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-y-auto">
      <Card className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 border-purple-500/30 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Search className="w-5 h-5" />
              SEO Quick Actions
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* SEO Status Checks */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm">SEO Status</h4>
            {seoChecks.map((check, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                {check.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="text-white/80">{check.name}</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm">Quick Actions</h4>
            
            {/* View Sitemap */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => openInNewTab(sitemapUrl)}
              className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Sitemap
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>

            {/* View Robots.txt */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => openInNewTab(robotsUrl)}
              className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Globe className="w-4 h-4 mr-2" />
              View Robots.txt
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>

            {/* Google Search Console */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => openInNewTab(googleConsoleUrl)}
              className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Search className="w-4 h-4 mr-2" />
              Google Search Console
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
          </div>

          {/* Copy URLs */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm">Copy URLs</h4>
            
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(sitemapUrl, "Sitemap URL")}
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                <Copy className="w-3 h-3 mr-1" />
                Sitemap
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(robotsUrl, "Robots.txt URL")}
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                <Copy className="w-3 h-3 mr-1" />
                Robots
              </Button>
            </div>
          </div>

          {/* Current Page Info */}
          <div className="pt-2 border-t border-white/20">
            <div className="text-xs text-white/60">
              <div className="flex items-center gap-1 mb-1">
                <Eye className="w-3 h-3" />
                Current Page
              </div>
              <div className="truncate">{window.location.pathname}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SEOQuickActions
