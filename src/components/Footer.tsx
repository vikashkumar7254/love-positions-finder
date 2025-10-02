import { Link } from "react-router-dom"
import { Heart, Mail, Globe, Github, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Explore",
      links: [
        { label: "All Positions", href: "/positions" },
        { label: "Most Popular", href: "/positions/most-popular" },
        { label: "Scratch Cards", href: "/games/scratch-position?start=1#start" },
        { label: "Journey Planner", href: "/journey-planner" },
        { label: "Custom Poster", href: "/custom-poster" }
      ]
    },
    {
      title: "Games & Tools",
      links: [
        { label: "Truth or Dare", href: "/games/truth-or-dare" },
        { label: "Passion Dice", href: "/games/passion-dice" },
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
        { label: "Communication Tips", href: "/blog/communication-tips" },
        { label: "Relationship Advice", href: "/blog/relationship-advice" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "FAQ", href: "/faq" }
      ]
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 text-white mt-6 sm:mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 mb-4 sm:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-romantic animate-heart-pulse" />
              <span className="text-lg sm:text-xl font-bold text-white hover:text-romantic transition-colors">
                ScratchSexPositions
              </span>
            </Link>
            <p className="text-slate-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              Igniting passion and deepening connections through intimate experiences.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://twitter.com/lovepositions" 
                className="text-slate-400 hover:text-romantic transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://instagram.com/lovepositions" 
                className="text-slate-400 hover:text-romantic transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://github.com/lovepositions" 
                className="text-slate-400 hover:text-romantic transition-colors"
                aria-label="View our GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4 text-white">{section.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {section.links.slice(0, 3).map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href}
                      className="text-slate-300 hover:text-romantic transition-colors text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section - Hidden on mobile */}
        <div className="hidden sm:block border-t border-slate-700 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-white flex items-center gap-2">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-romantic" />
                Stay Connected
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Get the latest romantic tips and relationship advice delivered to your inbox.
              </p>
            </div>
            <div>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-romantic focus:border-transparent placeholder-slate-400"
                />
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-romantic to-passionate hover:from-romantic/90 hover:to-passionate/90 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-slate-400 text-xs mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
            <div className="text-slate-400 text-xs sm:text-sm text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 sm:mb-2">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-romantic" />
                <span>© {currentYear} ScratchSexPositions. All rights reserved.</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Made with ❤️ for couples everywhere
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-400">
              <Link to="/privacy-policy" className="hover:text-romantic transition-colors hover:underline">
                Privacy Policy
              </Link>
              <span className="text-slate-600">•</span>
              <Link to="/terms-of-service" className="hover:text-romantic transition-colors hover:underline">
                Terms of Service
              </Link>
              <span className="text-slate-600">•</span>
              <Link to="/contact" className="hover:text-romantic transition-colors hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer