import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { realAnalyticsService, RealAnalyticsData, SEOHealthCheck } from '@/utils/realAnalytics';
import { 
  Search, 
  Globe, 
  Image, 
  BarChart3, 
  Settings, 
  Eye, 
  Zap, 
  Shield, 
  Target,
  TrendingUp,
  FileText,
  Link,
  Smartphone,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Database,
  Cpu,
  Wifi,
  Key,
  Monitor,
  Trash2
} from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schemaType: string;
  author: string;
  publishedTime: string;
  modifiedTime: string;
  language: string;
  robots: string;
  viewport: string;
}

interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  overall: 'good' | 'needs-improvement' | 'poor';
}

interface SEOAnalytics {
  totalPages: number;
  indexedPages: number;
  metaTitles: number;
  metaDescriptions: number;
  imagesWithAlt: number;
  totalImages: number;
  internalLinks: number;
  externalLinks: number;
  avgPageSpeed: number;
  mobileFriendly: boolean;
  organicTraffic: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  topKeywords: Array<{keyword: string, position: number, traffic: number}>;
  topPages: Array<{page: string, views: number, bounceRate: number}>;
  backlinks: number;
  domainAuthority: number;
  pageSpeedInsights: {
    mobile: number;
    desktop: number;
  };
  socialShares: {
    facebook: number;
    twitter: number;
    linkedin: number;
    pinterest: number;
  };
}

interface SEOOptimization {
  titleOptimization: boolean;
  metaDescriptionOptimization: boolean;
  headerOptimization: boolean;
  imageOptimization: boolean;
  internalLinking: boolean;
  externalLinking: boolean;
  schemaMarkup: boolean;
  sitemapGeneration: boolean;
  robotsTxt: boolean;
  canonicalUrls: boolean;
  mobileOptimization: boolean;
  pageSpeedOptimization: boolean;
  contentOptimization: boolean;
  keywordDensity: boolean;
  altTextOptimization: boolean;
  socialMediaOptimization: boolean;
}

const SEOAdmin: React.FC = () => {
  const [seoData, setSeoData] = useState<SEOData>({
    title: 'ScratchSexPositions - Discover Intimate Romance',
    description: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
    keywords: 'sex positions, romance, intimate, couples, kama sutra, relationships, scratch cards, love positions, intimate romance, couple games, romantic ideas, honeymoon, first night, truth or dare, passion dice, romantic activities',
    canonical: 'https://scratchsexpositions.com',
    ogTitle: 'ScratchSexPositions - Discover Intimate Romance',
    ogDescription: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
    ogImage: 'https://scratchsexpositions.com/og-image.svg',
    twitterTitle: 'ScratchSexPositions - Discover Intimate Romance',
    twitterDescription: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
    twitterImage: 'https://scratchsexpositions.com/og-image.svg',
    schemaType: 'WebSite',
    author: 'ScratchSexPositions',
    publishedTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
    language: 'en',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0'
  });

  const [coreWebVitals, setCoreWebVitals] = useState<CoreWebVitals>({
    lcp: 1.2,
    fid: 45,
    cls: 0.05,
    fcp: 0.8,
    ttfb: 200,
    overall: 'good'
  });

  const [analytics, setAnalytics] = useState<RealAnalyticsData | null>(null);
  const [seoHealth, setSeoHealth] = useState<SEOHealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const [optimization, setOptimization] = useState<SEOOptimization>({
    titleOptimization: true,
    metaDescriptionOptimization: true,
    headerOptimization: true,
    imageOptimization: true,
    internalLinking: true,
    externalLinking: false,
    schemaMarkup: true,
    sitemapGeneration: true,
    robotsTxt: true,
    canonicalUrls: true,
    mobileOptimization: true,
    pageSpeedOptimization: true,
    contentOptimization: true,
    keywordDensity: true,
    altTextOptimization: true,
    socialMediaOptimization: true
  });

  const [activeTab, setActiveTab] = useState('overview');

  // Load real analytics data
  useEffect(() => {
    const loadRealData = async () => {
      setLoading(true);
      try {
        const [analyticsData, healthData] = await Promise.all([
          realAnalyticsService.getRealAnalyticsData(),
          realAnalyticsService.getSEOHealthCheck()
        ]);
        
        setAnalytics(analyticsData);
        setSeoHealth(healthData);
        setLastUpdated(analyticsData.lastUpdated);
      } catch (error) {
        console.error('Error loading real data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRealData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(loadRealData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: keyof SEOData, value: string) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const [analyticsData, healthData] = await Promise.all([
        realAnalyticsService.getRealAnalyticsData(),
        realAnalyticsService.getSEOHealthCheck()
      ]);
      
      setAnalytics(analyticsData);
      setSeoHealth(healthData);
      setLastUpdated(analyticsData.lastUpdated);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://scratchsexpositions.com</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://scratchsexpositions.com/positions</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://scratchsexpositions.com/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateRobotsTxt = () => {
    const robots = `User-agent: *
Allow: /

Sitemap: https://scratchsexpositions.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /positions/
Allow: /blog/
Allow: /games/`;
    
    const blob = new Blob([robots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getVitalStatus = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'needs-improvement': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'poor': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'needs-improvement': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Advanced SEO Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Optimize your website for top Google rankings with advanced SEO tools
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {loading ? '...' : analytics?.pageSpeedInsights?.desktop || 'N/A'}
              </div>
              <div className="text-xs text-gray-600">Page Speed Score</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {loading ? '...' : `${seoHealth?.metaTitles?.optimized || 0}/${seoHealth?.metaTitles?.total || 0}`}
              </div>
              <div className="text-xs text-gray-600">Optimized Pages</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Image className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {loading ? '...' : `${seoHealth?.imagesWithAlt?.withAlt || 0}/${seoHealth?.imagesWithAlt?.total || 0}`}
              </div>
              <div className="text-xs text-gray-600">Images with Alt</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Smartphone className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {loading ? '...' : (analytics?.pageSpeedInsights?.mobile || 0) > 70 ? '✓' : '✗'}
              </div>
              <div className="text-xs text-gray-600">Mobile Ready</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-sm text-gray-600">
              {loading ? 'Loading real data...' : `Last updated: ${lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}`}
            </span>
          </div>
          <Button onClick={refreshData} disabled={loading} size="sm" variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6 lg:grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="meta">Meta Tags</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="structured">Structured Data</TabsTrigger>
            <TabsTrigger value="tools">SEO Tools</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Core Web Vitals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Core Web Vitals
                  </CardTitle>
                  <CardDescription>
                    Google's key performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Largest Contentful Paint</span>
                    <Badge className={getStatusColor(getVitalStatus(coreWebVitals.lcp, { good: 2.5, poor: 4.0 }))}>
                      {coreWebVitals.lcp}s
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">First Input Delay</span>
                    <Badge className={getStatusColor(getVitalStatus(coreWebVitals.fid, { good: 100, poor: 300 }))}>
                      {coreWebVitals.fid}ms
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cumulative Layout Shift</span>
                    <Badge className={getStatusColor(getVitalStatus(coreWebVitals.cls, { good: 0.1, poor: 0.25 }))}>
                      {coreWebVitals.cls}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">First Contentful Paint</span>
                    <Badge className={getStatusColor(getVitalStatus(coreWebVitals.fcp, { good: 1.8, poor: 3.0 }))}>
                      {coreWebVitals.fcp}s
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time to First Byte</span>
                    <Badge className={getStatusColor(getVitalStatus(coreWebVitals.ttfb, { good: 200, poor: 600 }))}>
                      {coreWebVitals.ttfb}ms
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    SEO Health Check
                  </CardTitle>
                  <CardDescription>
                    Overall SEO status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Meta Titles</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon('good')}
                      <span className="text-sm text-green-600">100%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Meta Descriptions</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon('good')}
                      <span className="text-sm text-green-600">100%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Image Alt Text</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon('needs-improvement')}
                      <span className="text-sm text-yellow-600">90%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Internal Linking</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon('good')}
                      <span className="text-sm text-green-600">Good</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mobile Optimization</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon('good')}
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick SEO Actions</CardTitle>
                <CardDescription>
                  Essential SEO tasks to improve rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button onClick={generateSitemap} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Sitemap
                  </Button>
                  <Button onClick={generateRobotsTxt} variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Generate Robots.txt
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Meta Tags
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    SEO Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Traffic Overview
                  </CardTitle>
                  <CardDescription>
                    Website traffic and engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">...</div>
                        <div className="text-sm text-gray-600">Loading...</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">...</div>
                        <div className="text-sm text-gray-600">Loading...</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">...</div>
                        <div className="text-sm text-gray-600">Loading...</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">...</div>
                        <div className="text-sm text-gray-600">Loading...</div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {analytics?.organicTraffic?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">Organic Traffic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {analytics?.bounceRate?.toFixed(1) || 'N/A'}%
                        </div>
                        <div className="text-sm text-gray-600">Bounce Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {analytics?.avgSessionDuration?.toFixed(1) || 'N/A'}m
                        </div>
                        <div className="text-sm text-gray-600">Avg Session</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {analytics?.conversionRate?.toFixed(1) || 'N/A'}%
                        </div>
                        <div className="text-sm text-gray-600">Conversion Rate</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Top Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Top Keywords
                  </CardTitle>
                  <CardDescription>
                    Best performing keywords
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loading ? (
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center justify-between animate-pulse">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-4 bg-gray-200 rounded"></div>
                              <div className="w-24 h-4 bg-gray-200 rounded"></div>
                            </div>
                            <div className="w-16 h-4 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      analytics?.topKeywords?.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">#{Math.round(keyword.position)}</Badge>
                            <span className="font-medium">{keyword.keyword}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {keyword.traffic.toLocaleString()} visits
                            {keyword.ctr && (
                              <span className="ml-2 text-xs text-blue-600">
                                ({keyword.ctr.toFixed(1)}% CTR)
                              </span>
                            )}
                          </div>
                        </div>
                      )) || []
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Top Performing Pages
                </CardTitle>
                <CardDescription>
                  Most visited pages and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div>
                              <div className="w-24 h-4 bg-gray-200 rounded mb-1"></div>
                              <div className="w-16 h-3 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="w-20 h-4 bg-gray-200 rounded mb-1"></div>
                            <div className="w-16 h-3 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    analytics?.topPages?.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium">{page.page}</div>
                            <div className="text-sm text-gray-600">{page.views.toLocaleString()} views</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{page.bounceRate.toFixed(1)}% bounce rate</div>
                          <div className="text-xs text-gray-500">
                            {page.avgTime ? `${page.avgTime.toFixed(1)}m avg time` : 'Performance'}
                          </div>
                        </div>
                      </div>
                    )) || []
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {loading ? '...' : analytics?.socialShares?.facebook?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Facebook Shares</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-sky-600" />
                  </div>
                  <div className="text-2xl font-bold text-sky-600">
                    {loading ? '...' : analytics?.socialShares?.twitter?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Twitter Shares</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {loading ? '...' : analytics?.socialShares?.linkedin?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">LinkedIn Shares</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {loading ? '...' : analytics?.socialShares?.pinterest?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Pinterest Shares</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meta Tags Tab */}
          <TabsContent value="meta" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Meta Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Meta Tags</CardTitle>
                  <CardDescription>
                    Essential meta tags for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={seoData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter page title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {seoData.title.length}/60 characters
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Meta Description</Label>
                    <Textarea
                      id="description"
                      value={seoData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter meta description"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {seoData.description.length}/160 characters
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      value={seoData.keywords}
                      onChange={(e) => handleInputChange('keywords', e.target.value)}
                      placeholder="Enter keywords separated by commas"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="canonical">Canonical URL</Label>
                    <Input
                      id="canonical"
                      value={seoData.canonical}
                      onChange={(e) => handleInputChange('canonical', e.target.value)}
                      placeholder="Enter canonical URL"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Open Graph Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Open Graph Tags</CardTitle>
                  <CardDescription>
                    Social media sharing optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ogTitle">OG Title</Label>
                    <Input
                      id="ogTitle"
                      value={seoData.ogTitle}
                      onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                      placeholder="Enter Open Graph title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ogDescription">OG Description</Label>
                    <Textarea
                      id="ogDescription"
                      value={seoData.ogDescription}
                      onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                      placeholder="Enter Open Graph description"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ogImage">OG Image URL</Label>
                    <Input
                      id="ogImage"
                      value={seoData.ogImage}
                      onChange={(e) => handleInputChange('ogImage', e.target.value)}
                      placeholder="Enter Open Graph image URL"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="twitterTitle">Twitter Title</Label>
                      <Input
                        id="twitterTitle"
                        value={seoData.twitterTitle}
                        onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                        placeholder="Enter Twitter title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitterImage">Twitter Image</Label>
                      <Input
                        id="twitterImage"
                        value={seoData.twitterImage}
                        onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                        placeholder="Enter Twitter image URL"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Reset</Button>
              <Button>Save Meta Tags</Button>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Core Web Vitals and performance data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Largest Contentful Paint</span>
                      <Badge variant="outline">{coreWebVitals.lcp}s</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (2.5 / coreWebVitals.lcp) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">First Input Delay</span>
                      <Badge variant="outline">{coreWebVitals.fid}ms</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (100 / coreWebVitals.fid) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cumulative Layout Shift</span>
                      <Badge variant="outline">{coreWebVitals.cls}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (0.1 / coreWebVitals.cls) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Suggestions</CardTitle>
                  <CardDescription>
                    Recommendations to improve performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Image Optimization</p>
                        <p className="text-xs text-gray-600">All images are optimized and compressed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Lazy Loading</p>
                        <p className="text-xs text-gray-600">Images load only when needed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Code Splitting</p>
                        <p className="text-xs text-gray-600">Consider implementing code splitting for better performance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Caching</p>
                        <p className="text-xs text-gray-600">Proper caching headers are set</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Optimization Tab */}
          <TabsContent value="optimization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SEO Optimizations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    SEO Optimizations
                  </CardTitle>
                  <CardDescription>
                    Enable/disable automatic SEO optimizations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(optimization).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <Label htmlFor={key} className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                      </div>
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => 
                          setOptimization(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Optimizations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Performance Optimizations
                  </CardTitle>
                  <CardDescription>
                    Core Web Vitals and speed optimizations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Image className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Image Optimization</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">Code Splitting</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">Caching</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Lazy Loading</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Optimization Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Optimization Actions</CardTitle>
                <CardDescription>
                  Run optimization tasks to improve SEO performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Optimize Images
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Check Keywords
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Link className="w-4 h-4 mr-2" />
                    Audit Links
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Sitemap
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Structured Data Tab */}
          <TabsContent value="structured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>JSON-LD Structured Data</CardTitle>
                <CardDescription>
                  Rich snippets and structured data for better search results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="schemaType">Schema Type</Label>
                  <Input
                    id="schemaType"
                    value={seoData.schemaType}
                    onChange={(e) => handleInputChange('schemaType', e.target.value)}
                    placeholder="e.g., WebSite, Organization, Article"
                  />
                </div>
                
                <div>
                  <Label>Generated JSON-LD</Label>
                  <Textarea
                    value={JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": seoData.schemaType,
                      "name": seoData.title,
                      "description": seoData.description,
                      "url": seoData.canonical,
                      "author": {
                        "@type": "Organization",
                        "name": seoData.author
                      },
                      "datePublished": seoData.publishedTime,
                      "dateModified": seoData.modifiedTime,
                      "inLanguage": seoData.language,
                      "image": seoData.ogImage
                    }, null, 2)}
                    rows={15}
                    readOnly
                    className="font-mono text-xs"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button>Update Structured Data</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Analysis Tools</CardTitle>
                  <CardDescription>
                    Tools to analyze and improve SEO
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Keyword Density Analyzer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Link className="w-4 h-4 mr-2" />
                    Internal Link Checker
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Image className="w-4 h-4 mr-2" />
                    Image Alt Text Checker
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Monitor className="w-4 h-4 mr-2" />
                    Mobile Usability Test
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Reports</CardTitle>
                  <CardDescription>
                    Generate comprehensive SEO reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Full SEO Audit Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Competitor Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Ranking Progress Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Content Quality Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                  <CardDescription>
                    Configure SEO settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Auto SEO Optimization</Label>
                        <p className="text-xs text-gray-500">Automatically optimize content for SEO</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Real-time Monitoring</Label>
                        <p className="text-xs text-gray-500">Monitor SEO performance in real-time</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Email Notifications</Label>
                        <p className="text-xs text-gray-500">Get notified about SEO issues</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Auto Sitemap Updates</Label>
                        <p className="text-xs text-gray-500">Automatically update sitemap when content changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>
                    Advanced SEO configuration options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="crawlDelay" className="text-sm font-medium">Crawl Delay (seconds)</Label>
                      <Input id="crawlDelay" type="number" defaultValue="1" min="0" max="10" />
                    </div>
                    
                    <div>
                      <Label htmlFor="maxDepth" className="text-sm font-medium">Max Crawl Depth</Label>
                      <Input id="maxDepth" type="number" defaultValue="5" min="1" max="20" />
                    </div>
                    
                    <div>
                      <Label htmlFor="userAgent" className="text-sm font-medium">Custom User Agent</Label>
                      <Input id="userAgent" defaultValue="ScratchSexPositionsBot/1.0" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Debug Mode</Label>
                        <p className="text-xs text-gray-500">Enable detailed logging</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Manage SEO data and backups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Configure external service API keys
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="googleApiKey" className="text-sm font-medium">Google Search Console API Key</Label>
                    <Input id="googleApiKey" type="password" placeholder="Enter API key" />
                  </div>
                  
                  <div>
                    <Label htmlFor="googleAnalyticsKey" className="text-sm font-medium">Google Analytics API Key</Label>
                    <Input id="googleAnalyticsKey" type="password" placeholder="Enter API key" />
                  </div>
                  
                  <div>
                    <Label htmlFor="bingApiKey" className="text-sm font-medium">Bing Webmaster Tools API Key</Label>
                    <Input id="bingApiKey" type="password" placeholder="Enter API key" />
                  </div>
                  
                  <div>
                    <Label htmlFor="semrushApiKey" className="text-sm font-medium">SEMrush API Key</Label>
                    <Input id="semrushApiKey" type="password" placeholder="Enter API key" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save API Keys</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SEOAdmin;
