import { Link, useLocation } from "react-router-dom"
import { Sparkles, Home, BookOpen, Gamepad2, Shield } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { useAdminAuth } from "./AdminAuth"

const Navigation = () => {
  const location = useLocation()
  const { isAuthenticated } = useAdminAuth()
  const isActive = (path: string) => location.pathname === path
  const isGamesActive = location.pathname.startsWith('/games')
  const isBlogActive = location.pathname.startsWith('/blog')
  const isAdminActive = location.pathname.startsWith('/admin')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-2 gap-2">
          {/* Centered Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Sparkles className="w-6 h-6 text-romantic" />
            <span className="text-lg font-semibold text-foreground">ScratchSexPositions</span>
          </Link>

          {/* Minimal Links */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant={isActive('/') ? 'romantic' : 'outline'} size="sm" className="rounded-full px-3 py-1 flex items-center gap-2">
                <Home className="w-4 h-4" /> Home
              </Button>
            </Link>
            <Link to="/games">
              <Button variant={isGamesActive ? 'romantic' : 'outline'} size="sm" className="rounded-full px-3 py-1 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" /> Games
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant={isBlogActive ? 'romantic' : 'outline'} size="sm" className="rounded-full px-3 py-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Blog
              </Button>
            </Link>
            {isAuthenticated && (
              <Link to="/admin">
                <Button variant={isAdminActive ? 'romantic' : 'outline'} size="sm" className="rounded-full px-3 py-1 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Admin
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation