import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Heart, Menu, X, Home, BookOpen, Gamepad2, Sparkles, ChevronDown, MapPin, Gift } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/games", label: "Games", icon: Gamepad2, submenu: [
      { path: "/games/truth-or-dare", label: "Truth or Dare" },
      { path: "/games/foreplay-dice", label: "Foreplay Dice" },
      { path: "/games/all-games", label: "All Sexy Games" },
      { path: "/games/long-distance", label: "Long Distance Relationship" }
    ]},
    { path: "/love-languages", label: "Love Languages", icon: Heart },
    { path: "/romantic-guides", label: "Romantic Guides", icon: BookOpen },
    { path: "/blog", label: "Blogs", icon: BookOpen },
    { path: "/positions", label: "Positions", icon: Sparkles, submenu: [
      { path: "/positions/most-popular", label: "Most Popular" },
      { path: "/positions/all", label: "All Sex Positions" },
      { path: "/positions/random-generator", label: "Random Position Generator" }
    ]},
    { path: "/journey-planner", label: "Journey Planner", icon: MapPin },
    { path: "/scratch-cards", label: "Scratch Cards", icon: Gift },
    { path: "/custom-poster", label: "Custom Poster", icon: Heart }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="w-8 h-8 text-romantic animate-heart-pulse" />
            <span className="text-xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
              LovePositions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon, submenu }) => (
              <div 
                key={path} 
                className="relative"
                onMouseEnter={() => submenu && setActiveDropdown(path)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(path) || (submenu && submenu.some(item => isActive(item.path)))
                      ? "text-romantic bg-romantic/10"
                      : "text-muted-foreground hover:text-romantic hover:bg-romantic/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {submenu && <ChevronDown className="w-3 h-3" />}
                </Link>
                
                {/* Dropdown Menu */}
                {submenu && activeDropdown === path && (
                  <div className="absolute top-full left-0 mt-1 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg min-w-[200px] z-50">
                    {submenu.map(({ path: subPath, label: subLabel }) => (
                      <Link
                        key={subPath}
                        to={subPath}
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-romantic/5 hover:text-romantic ${
                          isActive(subPath) ? "text-romantic bg-romantic/10" : "text-muted-foreground"
                        }`}
                      >
                        {subLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-romantic"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon, submenu }) => (
                <div key={path}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(path) || (submenu && submenu.some(item => isActive(item.path)))
                        ? "text-romantic bg-romantic/10"
                        : "text-muted-foreground hover:text-romantic hover:bg-romantic/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {submenu && (
                    <div className="ml-6 mt-1 space-y-1">
                      {submenu.map(({ path: subPath, label: subLabel }) => (
                        <Link
                          key={subPath}
                          to={subPath}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-1 text-xs rounded transition-colors ${
                            isActive(subPath) 
                              ? "text-romantic bg-romantic/10" 
                              : "text-muted-foreground hover:text-romantic hover:bg-romantic/5"
                          }`}
                        >
                          {subLabel}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation