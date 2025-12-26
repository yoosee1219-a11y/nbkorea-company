import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
              <div className="bg-nb-pink-600 text-white p-2 rounded-lg">
                <Globe size={20} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl leading-none tracking-tight text-nb-pink-400">
                  NB KOREA
                </span>
                <span className="text-xs font-medium text-nb-gold-400 tracking-wider">GLOBAL BUSINESS</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              한국과 세계를 연결하는 글로벌 비즈니스 파트너
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm inline-block">
                  회사소개
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm inline-block">
                  제휴 파트너사
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm inline-block">
                  블로그
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">문의하기</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>서울특별시</li>
              <li>대한민국</li>
              <li className="mt-3 sm:mt-4">
                <a href="mailto:contact@nbkorea.com" className="hover:text-white transition-colors inline-block">
                  contact@nbkorea.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 sm:pt-8">
          <p className="text-center text-xs sm:text-sm text-slate-500">
            &copy; {currentYear} NBKOREA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
