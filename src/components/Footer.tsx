import { Link } from "react-router-dom"
import { Heart, Mail, Globe, Github, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Explore",
      links: [
        { label: "All Positions", href: "/positions/all" },
        { label: "Most Popular", href: "/positions/most-popular" },
        { label: "Random Generator", href: "/positions/random-generator" },
        { label: "Scratch Cards", href: "/scratch-cards" },
        { label: "Journey Planner", href: "/journey-planner" },
        { label: "Custom Poster", href: "/custom-poster" }
      ]
    },
    {
      title: "Games & Tools",
      links: [
        { label: "Truth or Dare", href: "/games/truth-or-dare" },
        { label: "Foreplay Dice", href: "/games/foreplay-dice" },
        { label: "Long Distance", href: "/games/long-distance" },
        { label: "All Games", href: "/games/all-games" },
        { label: "Love Languages", href: "/love-languages" }
      ]
    },
    {
      title: "Learn & Connect",
      links: [
        { label: "Romantic Guides", href: "/romantic-guides" },
        { label: "Love & Intimacy Blog", href: "/blog" },
        { label: "Communication Tips", href: "/blog" },
        { label: "Relationship Advice", href: "/blog" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "FAQ", href: "/faq" }
      ]
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-romantic animate-heart-pulse" />
              <span className="text-xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                LovePositions
              </span>
            </Link>
            <p className="text-slate-300 text-sm mb-4">
              Discover 500+ intimate positions and create deeper connections with your partner. 
              Explore love languages, play romantic games, and build your perfect intimate journey.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/lovepositions" 
                className="text-slate-400 hover:text-romantic transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/lovepositions" 
                className="text-slate-400 hover:text-romantic transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/lovepositions" 
                className="text-slate-400 hover:text-romantic transition-colors"
                aria-label="View our GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href}
                      className="text-slate-300 hover:text-romantic transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-lg mb-2 text-white flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Stay Connected
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Get the latest tips, positions, and relationship advice delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-romantic focus:border-transparent"
              />
              <button className="px-4 py-2 bg-romantic hover:bg-romantic/90 text-white rounded-md text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Age Verification Notice */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-amber-400 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-200 font-medium text-sm mb-1">Age Verification Required</h4>
                <p className="text-amber-100/80 text-xs">
                  This website contains adult content intended for individuals 18 years or older. 
                  By accessing this site, you confirm that you are of legal age in your jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © {currentYear} LovePositions. All rights reserved. 
              <span className="block md:inline md:ml-2">
                Designed with ❤️ for couples everywhere.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <Link to="/privacy" className="hover:text-romantic transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-romantic transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-romantic transition-colors">
                Contact
              </Link>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer