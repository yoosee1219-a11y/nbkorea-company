import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, ArrowRight, Globe, Users, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-6">
                <img
                  src="/nb-logo.png"
                  alt="NB KOREA"
                  className="h-16 sm:h-20 w-auto brightness-95 hover:brightness-110 transition-all duration-300"
                />
              </div>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                {t('companyDescription')}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nb-pink-600/20 to-rose-600/20 border border-nb-pink-500/30">
                <span className="size-2 rounded-full bg-nb-pink-500 animate-pulse"></span>
                <span className="text-nb-pink-400 text-xs font-semibold uppercase tracking-wider">
                  {t('partnerBadge')}
                </span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white flex items-center gap-2">
                <Globe className="size-5 text-nb-pink-500" />
                {t('sections.services.title')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <div className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base flex items-start gap-2 group cursor-default">
                    <ArrowRight className="size-4 mt-1 text-nb-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{t('sections.services.items.studentVisa')}</span>
                  </div>
                </li>
                <li>
                  <div className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base flex items-start gap-2 group cursor-default">
                    <ArrowRight className="size-4 mt-1 text-nb-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{t('sections.services.items.workerVisa')}</span>
                  </div>
                </li>
                <li>
                  <div className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base flex items-start gap-2 group cursor-default">
                    <ArrowRight className="size-4 mt-1 text-nb-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{t('sections.services.items.globalPartnership')}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white flex items-center gap-2">
                <FileText className="size-5 text-nb-pink-500" />
                {t('sections.quickLinks.title')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-slate-400 hover:text-white transition-all duration-300 text-sm sm:text-base inline-flex items-center gap-2 group focus:outline-none focus:text-nb-pink-400"
                  >
                    <ArrowRight className="size-4 text-nb-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t('sections.quickLinks.items.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="text-slate-400 hover:text-white transition-all duration-300 text-sm sm:text-base inline-flex items-center gap-2 group focus:outline-none focus:text-nb-pink-400"
                  >
                    <ArrowRight className="size-4 text-nb-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t('sections.quickLinks.items.partners')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-slate-400 hover:text-white transition-all duration-300 text-sm sm:text-base inline-flex items-center gap-2 group focus:outline-none focus:text-nb-pink-400"
                  >
                    <ArrowRight className="size-4 text-nb-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t('sections.quickLinks.items.blog')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white flex items-center gap-2">
                <Users className="size-5 text-nb-pink-500" />
                {t('sections.contact.title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400 text-sm sm:text-base">
                  <MapPin className="size-5 text-nb-pink-500 flex-shrink-0 mt-0.5" />
                  <span
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t('sections.contact.address') }}
                  />
                </li>
                <li>
                  <a
                    href="mailto:info_nbkorea@naver.com"
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 text-sm sm:text-base group focus:outline-none focus:text-nb-pink-400"
                  >
                    <Mail className="size-5 text-nb-pink-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>info_nbkorea@naver.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            {t('copyright', { year: currentYear })}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-right">
            {t('tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
