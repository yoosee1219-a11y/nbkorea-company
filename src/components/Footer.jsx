import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Globe size={24} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl leading-none tracking-tight">
                  NBKOREA
                </span>
                <span className="text-xs font-medium text-slate-400 tracking-wider">GLOBAL BUSINESS</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              한국과 세계를 연결하는 글로벌 비즈니스 파트너
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  회사소개
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-400 hover:text-white transition-colors text-sm">
                  제휴 파트너사
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">
                  블로그
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">문의하기</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>서울특별시</li>
              <li>대한민국</li>
              <li className="mt-4">
                <a href="mailto:contact@nbkorea.com" className="hover:text-white transition-colors">
                  contact@nbkorea.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {currentYear} NBKOREA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
