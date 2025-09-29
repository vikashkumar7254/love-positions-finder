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
  Gift
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
    // Load stats from localStorage
    try {
      const blogs = JSON.parse(localStorage.getItem('userBlogs') || '[]')
      const scratchCards = JSON.parse(localStorage.getItem('scratch_positions_all') || '[]')
      
      setStats({
        totalBlogs: blogs.length,
        pendingBlogs: blogs.filter((b: any) => !b.approved).length,
        totalPositions: 190, // Static + custom positions
        totalScratchCards: scratchCards.length, // All positions (defaults + custom)
        totalUsers: 1250 // Mock data
      })
    } catch {
      // Handle error silently
    }

    document.title = "Admin Dashboard | ScratchSexPositions"
  }, [])

  const adminSections = [
    {
      title: "Blog Management",
      description: "Manage blog posts, approve submissions, and edit content",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      stats: `${stats.totalBlogs} total, ${stats.pendingBlogs} pending`,
      actions: [
        { label: "View All Blogs", href: "/admin/blogs", icon: Eye },
        { label: "Add New Blog", href: "/blog/new", icon: Plus }
      ]
    },
    {
      title: "Position Management",
      description: "Add, edit, and organize intimate positions",
      icon: Heart,
      color: "from-pink-500 to-red-500",
      stats: `${stats.totalPositions} positions available`,
      actions: [
        { label: "Add Position", href: "/admin/positions/new", icon: Plus },
        { label: "View All", href: "/positions/all", icon: Eye }
      ]
    },
    {
      title: "Scratch Cards",
      description: "Manage scratch card positions and images",
      icon: Image,
      color: "from-purple-500 to-purple-600",
      stats: `${stats.totalScratchCards} custom cards`,
      actions: [
        { label: "Manage Cards", href: "/admin/scratch-positions", icon: Edit3 },
        { label: "View Game", href: "/games/scratch-position", icon: Gamepad2 }
      ]
    },
    {
      title: "Games & Features",
      description: "Configure games and interactive features",
      icon: Gamepad2,
      color: "from-green-500 to-emerald-600",
      stats: "5 active games",
      actions: [
        { label: "All Games", href: "/games", icon: Eye },
        { label: "All Positions", href: "/positions/all", icon: Settings },
        { label: "Journey Images", href: "/admin/journey-images", icon: Image }
      ]
    },
    {
      title: "Analytics & Stats",
      description: "View usage statistics and user engagement",
      icon: BarChart3,
      color: "from-orange-500 to-yellow-500",
      stats: `${stats.totalUsers} active users`,
      actions: [
        { label: "View Analytics", href: "#", icon: TrendingUp },
        { label: "User Reports", href: "#", icon: Users }
      ]
    },
    {
      title: "System Settings",
      description: "Configure site settings, SEO, and preferences",
      icon: Settings,
      color: "from-gray-500 to-slate-600",
      stats: "All systems operational",
      actions: [
        { label: "Site Settings", href: "#", icon: Settings },
        { label: "Image Management", href: "/admin/images", icon: Image },
        { label: "Database", href: "#", icon: Database }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your love positions finder platform
              </p>
            </div>
            <Button variant="outline" onClick={logout} className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalBlogs}</div>
                <div className="text-xs text-muted-foreground">Total Blogs</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border-pink-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">{stats.totalPositions}</div>
                <div className="text-xs text-muted-foreground">Positions</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalScratchCards}</div>
                <div className="text-xs text-muted-foreground">Scratch Cards</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-xs text-muted-foreground">Active Games</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.totalUsers}</div>
                <div className="text-xs text-muted-foreground">Users</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <Card key={index} className="bg-gradient-card border-0 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                    <div className="text-xs text-romantic font-medium">{section.stats}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {section.actions.map((action, actionIndex) => {
                        const ActionIcon = action.icon
                        return (
                          <Link key={actionIndex} to={action.href}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full justify-start text-xs"
                            >
                              <ActionIcon className="w-3 h-3 mr-2" />
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

          {/* Recent Activity */}
          <Card className="mt-8 bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-romantic" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.pendingBlogs > 0 && (
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">{stats.pendingBlogs} blog posts pending approval</span>
                    </div>
                    <Link to="/admin/blogs">
                      <Button variant="outline" size="sm">Review</Button>
                    </Link>
                  </div>
                )}
                <Link to="/admin/scratch-positions" className="block p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 rounded-xl border border-pink-500/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Scratch Positions</h3>
                      <p className="text-sm text-muted-foreground">Manage all scratch cards</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Edit defaults & add custom</span>
                    <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Unified</span>
                  </div>
                </Link>
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
