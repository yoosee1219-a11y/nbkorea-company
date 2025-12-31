import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail } from 'lucide-react'
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
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-lg border-b border-slate-100"
          : "bg-white/90 backdrop-blur-sm py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <img
              src="/nb-logo.png"
              alt="NB KOREA"
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="focus:outline-none rounded-md"
              >
                <div
                  className={clsx(
                    "text-sm lg:text-base font-semibold transition-all duration-300 cursor-pointer relative py-1 px-2",
                    isActive(link.path)
                      ? "text-nb-pink-600"
                      : "text-slate-700 hover:text-nb-pink-600"
                  )}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-nb-pink-600 to-rose-600 rounded-full"
                    />
                  )}
                </div>
              </Link>
            ))}

            {/* Contact CTA Button */}
            <a
              href="mailto:info_nbkorea@naver.com"
              className="inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-semibold text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none"
            >
              <Mail className="size-4" />
              <span className="hidden lg:inline">문의하기</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 p-2 hover:bg-slate-100 rounded-lg transition-all duration-300 focus:outline-none"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block focus:outline-none rounded-xl"
                >
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 cursor-pointer",
                      isActive(link.path)
                        ? "bg-gradient-to-r from-nb-pink-50 to-rose-50 text-nb-pink-600 shadow-sm"
                        : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                    )}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}

              {/* Mobile Contact Button */}
              <a
                href="mailto:info_nbkorea@naver.com"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-semibold text-base rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none"
              >
                <Mail className="size-5" />
                문의하기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
