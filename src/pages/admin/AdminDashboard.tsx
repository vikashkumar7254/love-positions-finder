import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute, useAdminAuth } from "@/components/AdminAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { 
  BookOpen, 
  Heart, 
  Image, 
  Gamepad2, 
  Users, 
  TrendingUp, 
  Settings,
  Database,
  Eye,
  Plus,
  Edit3,
  BarChart3,
  Gift,
  Sparkles,
  Tag,
  Search,
  FileText,
  Globe,
  Zap,
  Target,
  MapPin,
  Palette,
  Compass
} from "lucide-react"

const AdminDashboardContent = () => {
  const { logout } = useAdminAuth()
  const [stats, setStats] = useState({
    totalBlogs: 0,
    pendingBlogs: 0,
    totalPositions: 0,
    totalScratchCards: 0,
    totalUsers: 0
  })

  useEffect(() => {
    // Load real stats from localStorage and API
    const loadStats = async () => {
      try {
        // Load blogs from API
        const blogsResponse = await fetch('/api/blogs')
        const blogs = blogsResponse.ok ? await blogsResponse.json() : []
        
        // Load scratch cards from localStorage
        const scratchCards = JSON.parse(localStorage.getItem('scratch_positions_all') || '[]')
        
        // Load spin desires
        const spinDesires = JSON.parse(localStorage.getItem('spinDesires') || '[]')
        
        // Load default images
        const defaultImages = JSON.parse(localStorage.getItem('default_images_custom') || '[]')
        
        setStats({
          totalBlogs: blogs.length,
          pendingBlogs: blogs.filter((b: any) => b.status === 'pending').length,
          totalPositions: scratchCards.length,
          totalScratchCards: scratchCards.length,
          totalUsers: 0 // Will be updated when user system is implemented
        })
      } catch (error) {
        console.error('Error loading stats:', error)
        // Fallback to localStorage only
        try {
          const blogs = JSON.parse(localStorage.getItem('userBlogs') || '[]')
          const scratchCards = JSON.parse(localStorage.getItem('scratch_positions_all') || '[]')
          
          setStats({
            totalBlogs: blogs.length,
            pendingBlogs: blogs.filter((b: any) => !b.approved).length,
            totalPositions: scratchCards.length,
            totalScratchCards: scratchCards.length,
            totalUsers: 0
          })
        } catch {
          // Handle error silently
        }
      }
    }

    loadStats()
    document.title = "Admin Dashboard | Love Positions Finder"
  }, [])

  const adminSections = [
    {
      title: "Blog Management",
      description: "Manage blog posts, approve submissions, and edit content",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      stats: `${stats.totalBlogs} total, ${stats.pendingBlogs} pending`,
      actions: [
        { label: "Manage Blogs", href: "/admin/blogs", icon: BookOpen },
        { label: "Add New Blog", href: "/admin/blogs", icon: Plus }
      ]
    },
    {
      title: "Scratch Cards",
      description: "Manage scratch card positions and images",
      icon: Image,
      color: "from-purple-500 to-purple-600",
      stats: `${stats.totalScratchCards} positions`,
      actions: [
        { label: "Manage Cards", href: "/admin/scratch-positions", icon: Edit3 },
        { label: "View Game", href: "/games/scratch-position", icon: Gamepad2 }
      ]
    },
    {
      title: "Spin for Desire",
      description: "Uses random scratch positions (500+ available)",
      icon: Gift,
      color: "from-pink-500 to-rose-600",
      stats: "12 random positions per visit",
      actions: [
        { label: "View Game", href: "/games/spin-for-desire", icon: Gamepad2 }
      ]
    },
    {
      title: "Journey Positions",
      description: "Manage journey images, GIFs and videos",
      icon: MapPin,
      color: "from-green-500 to-emerald-600",
      stats: "Journey planning positions",
      actions: [
        { label: "Manage Positions", href: "/admin/journey-positions", icon: Edit3 },
        { label: "View Planner", href: "/journey-planner", icon: Compass }
      ]
    },
    {
      title: "Advanced SEO",
      description: "Advanced SEO tools, analytics, and optimization",
      icon: Zap,
      color: "from-orange-500 to-yellow-500",
      stats: "Top Google Rankings",
      actions: [
        { label: "SEO Dashboard", href: "/admin/seo", icon: Target },
        { label: "Analytics", href: "/admin/seo", icon: BarChart3 },
        { label: "Performance", href: "/admin/seo", icon: Zap }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Manage your love positions finder platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                System Online
              </div>
              <Button variant="outline" onClick={logout} className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                <Settings className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.totalBlogs}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Blogs</div>
                {stats.pendingBlogs > 0 && (
                  <div className="text-xs text-orange-600 font-medium mt-1">
                    {stats.pendingBlogs} pending
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.totalScratchCards}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Positions</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">6</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Games</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">∞</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Custom Images</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardHeader className="pb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-white mb-2">{section.title}</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{section.description}</p>
                    <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-purple-700 dark:text-purple-300">{section.stats}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {section.actions.map((action, actionIndex) => {
                        const ActionIcon = action.icon
                        return (
                          <Link key={actionIndex} to={action.href}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-start text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 group/btn"
                            >
                              <ActionIcon className="w-4 h-4 mr-3 group-hover/btn:scale-110 transition-transform" />
                              {action.label}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Quick Actions */}
          <Card className="mt-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-800 dark:text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.pendingBlogs > 0 && (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{stats.pendingBlogs} blog posts pending approval</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Review and approve new content</p>
                      </div>
                    </div>
                    <Link to="/admin/blogs">
                      <Button variant="default" size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">Review Now</Button>
                    </Link>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/admin/scratch-positions" className="block p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 rounded-xl border border-pink-200 dark:border-pink-800 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Image className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Scratch Positions</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Manage positions & images</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{stats.totalScratchCards} positions available</span>
                      <span className="text-purple-600 dark:text-purple-400 font-medium group-hover:translate-x-1 transition-transform">Manage →</span>
                    </div>
                  </Link>
                  
                  <Link to="/games/spin-for-desire" className="block p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 rounded-xl border border-pink-200 dark:border-pink-800 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Spin for Desire</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Random positions from scratch cards</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">12 random from 500+ positions</span>
                      <span className="text-pink-600 dark:text-pink-400 font-medium group-hover:translate-x-1 transition-transform">Play Game →</span>
                    </div>
                  </Link>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const AdminDashboard = () => {
  return (
    <AdminProtectedRoute>
      <AdminDashboardContent />
    </AdminProtectedRoute>
  )
}

export default AdminDashboard
