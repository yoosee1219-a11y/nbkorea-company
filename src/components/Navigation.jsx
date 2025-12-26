import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: "회사소개", path: "/" },
  { label: "제휴 파트너사", path: "/partners" },
  { label: "블로그", path: "/blog" },
]

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-sm py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-nb-pink-600 text-white p-2 rounded-lg group-hover:bg-nb-pink-700 transition-colors">
              <Globe size={24} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl leading-none tracking-tight text-nb-pink-600">
                NB KOREA
              </span>
              <span className="text-xs font-medium text-nb-gold-600 tracking-wider">GLOBAL BUSINESS</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((link) => (
              <Link key={link.path} to={link.path}>
                <div
                  className={clsx(
                    "text-sm font-semibold transition-colors cursor-pointer relative py-1",
                    isActive(link.path)
                      ? "text-nb-pink-600"
                      : "text-slate-600 hover:text-nb-pink-600"
                  )}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-nb-pink-600 rounded-full"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 p-2 hover:bg-slate-100 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((link) => (
                <Link key={link.path} to={link.path}>
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer",
                      isActive(link.path)
                        ? "bg-nb-pink-50 text-nb-pink-600"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
