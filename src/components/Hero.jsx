import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Users, Building2, CheckCircle, Mail, Phone, Zap, Award, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ConsultationModal from './ConsultationModal'

const Hero = () => {
  const { t } = useTranslation('hero')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Services data structure for dynamic rendering
  const services = [
    {
      key: 'telecom',
      gradientColors: 'from-nb-pink-600 to-rose-600',
      badgeGradient: 'from-nb-pink-100 to-rose-100',
      badgeText: 'text-nb-pink-700',
      borderColor: 'border-nb-pink-100',
      borderHoverColor: 'group-hover:border-nb-pink-300',
      svgGradientId: 'phoneGradient',
      svgElement: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <ellipse cx="50" cy="85" rx="35" ry="8" fill="#e11d48" opacity="0.2"/>
          <path d="M35 25 L35 75 L65 75 L65 25 Z" fill="url(#phoneGradient)" stroke="#be123c" strokeWidth="2"/>
          <rect x="40" y="32" width="20" height="28" rx="2" fill="#fff" opacity="0.9"/>
          <rect x="42" y="50" width="3" height="6" fill="#10b981" rx="1"/>
          <rect x="47" y="46" width="3" height="10" fill="#10b981" rx="1"/>
          <rect x="52" y="42" width="3" height="14" fill="#10b981" rx="1"/>
          <path d="M38 28 L38 50 L42 50 L42 28 Z" fill="#fff" opacity="0.3"/>
          <defs>
            <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899"/>
              <stop offset="100%" stopColor="#be123c"/>
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      key: 'loan',
      gradientColors: 'from-blue-600 to-indigo-600',
      badgeGradient: 'from-blue-100 to-indigo-100',
      badgeText: 'text-blue-700',
      borderColor: 'border-blue-100',
      borderHoverColor: 'group-hover:border-blue-300',
      svgGradientId: 'buildingGradient',
      svgElement: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <ellipse cx="50" cy="85" rx="35" ry="8" fill="#1d4ed8" opacity="0.2"/>
          <path d="M50 20 L70 30 L70 75 L30 75 L30 30 Z" fill="url(#buildingGradient)" stroke="#1e40af" strokeWidth="2"/>
          <path d="M50 20 L70 30 L50 35 L30 30 Z" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
          <rect x="38" y="40" width="8" height="8" fill="#dbeafe" rx="1"/>
          <rect x="54" y="40" width="8" height="8" fill="#dbeafe" rx="1"/>
          <rect x="38" y="52" width="8" height="8" fill="#dbeafe" rx="1"/>
          <rect x="54" y="52" width="8" height="8" fill="#dbeafe" rx="1"/>
          <rect x="43" y="64" width="14" height="11" fill="#1e40af" rx="1"/>
          <text x="50" y="30" fontSize="12" fill="#fbbf24" fontWeight="bold" textAnchor="middle">$</text>
          <defs>
            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa"/>
              <stop offset="100%" stopColor="#2563eb"/>
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      key: 'network',
      gradientColors: 'from-purple-600 to-pink-600',
      badgeGradient: 'from-purple-100 to-pink-100',
      badgeText: 'text-purple-700',
      borderColor: 'border-purple-100',
      borderHoverColor: 'group-hover:border-purple-300',
      svgGradientId: 'peopleGradient',
      svgElement: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <ellipse cx="50" cy="85" rx="35" ry="8" fill="#a855f7" opacity="0.2"/>
          <circle cx="50" cy="45" r="8" fill="url(#peopleGradient1)"/>
          <path d="M42 55 L42 70 L58 70 L58 55 Z" fill="url(#peopleGradient1)" stroke="#7c3aed" strokeWidth="2"/>
          <circle cx="28" cy="40" r="6" fill="url(#peopleGradient2)"/>
          <path d="M22 48 L22 60 L34 60 L34 48 Z" fill="url(#peopleGradient2)" stroke="#9333ea" strokeWidth="1.5"/>
          <circle cx="72" cy="40" r="6" fill="url(#peopleGradient2)"/>
          <path d="M66 48 L66 60 L78 60 L78 48 Z" fill="url(#peopleGradient2)" stroke="#9333ea" strokeWidth="1.5"/>
          <line x1="35" y1="50" x2="43" y2="55" stroke="#a855f7" strokeWidth="2" strokeDasharray="2,2"/>
          <line x1="65" y1="50" x2="57" y2="55" stroke="#a855f7" strokeWidth="2" strokeDasharray="2,2"/>
          <defs>
            <linearGradient id="peopleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc"/>
              <stop offset="100%" stopColor="#9333ea"/>
            </linearGradient>
            <linearGradient id="peopleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e9d5ff"/>
              <stop offset="100%" stopColor="#c084fc"/>
            </linearGradient>
          </defs>
        </svg>
      )
    }
  ]

  return (
    <>
      {/* Hero Section - Rich Visual Design */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-32 pb-24 overflow-hidden">
        {/* Animated Geometric Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-nb-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-3xl blur-2xl rotate-45"
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                {/* Decorative Element */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-1.5 bg-gradient-to-r from-nb-pink-600 to-rose-600 rounded-full mb-8"
                />

                {/* Partnership Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white shadow-lg shadow-nb-pink-600/10 border border-nb-pink-100 mb-8"
                >
                  <div className="relative">
                    <span className="size-3 rounded-full bg-nb-pink-600 animate-ping absolute"></span>
                    <span className="size-3 rounded-full bg-nb-pink-600"></span>
                  </div>
                  <span className="text-slate-800 text-sm font-bold uppercase tracking-wider">
                    {t('badge')}
                  </span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-slate-900 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
                  {t('headline')}<br />
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-nb-pink-600 via-rose-600 to-purple-600">
                      {t('headlineHighlight')}
                    </span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute bottom-2 left-0 h-3 bg-nb-pink-200/50 -z-0"
                    />
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {t('subheadline')}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-nb-pink-600 to-rose-600 hover:from-nb-pink-700 hover:to-rose-700 text-white text-base font-bold rounded-2xl shadow-xl shadow-nb-pink-600/30 transition-all cursor-pointer"
                  >
                    <Mail className="w-5 h-5" />
                    {t('ctaConsultation')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <Link to="/partners">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 text-base font-bold rounded-2xl border-2 border-slate-200 hover:border-nb-pink-300 shadow-lg transition-all"
                    >
                      {t('ctaPartners')}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Main Image Card */}
                <div className="relative">
                  {/* Decorative Background Elements */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-nb-pink-400/30 to-purple-400/30 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-2xl"
                  />

                  {/* Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200"
                      alt={t('imageAlt')}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - 3D Icons */}
      <section className="relative w-full bg-gradient-to-b from-white to-slate-50 py-24 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-nb-pink-50/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-50/50 to-transparent"></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-nb-pink-100 to-rose-100 border border-nb-pink-200 mb-6"
            >
              <span className="text-nb-pink-700 text-sm font-bold uppercase tracking-wider">{t('servicesBadge')}</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              {t('servicesTitle')}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group h-full flex"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradientColors} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500`}></div>

                <div className={`relative bg-white p-8 rounded-3xl border-2 ${service.borderColor} ${service.borderHoverColor} shadow-lg group-hover:shadow-2xl transition-all duration-500 flex flex-col w-full`}>
                  {/* 3D Icon */}
                  <div className="mb-6 relative flex justify-center">
                    <div className="w-24 h-24 relative">
                      {service.svgElement}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    {t(`${service.key}Title`)}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {t(`${service.key}Desc`)}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className={`px-4 py-2 bg-gradient-to-r ${service.badgeGradient} ${service.badgeText} text-sm font-bold rounded-xl`}>
                      {t(`${service.key}Badge`)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Colorful Section */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-nb-pink-600/30 to-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-full blur-3xl"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <span className="text-white text-sm font-bold uppercase tracking-wider">{t('whyBadge')}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              {t('whyTitle')}
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t('whySubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                gradient: 'from-nb-pink-500 to-rose-500',
                key: 'whyPartnership'
              },
              {
                gradient: 'from-blue-500 to-indigo-500',
                key: 'whyBenefits'
              },
              {
                gradient: 'from-purple-500 to-pink-500',
                key: 'whyCare'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {t(`${item.key}Icon`)}
                  </div>
                  <h3 className="text-2xl font-black mb-4">
                    {t(`${item.key}Title`)}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {t(`${item.key}Desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Colorful */}
      <section className="relative w-full bg-gradient-to-r from-nb-pink-600 via-rose-600 to-purple-600 text-white py-20 overflow-hidden">
        {/* Animated Circles */}
        <motion.div
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            >
              {t('ctaTitle')}<br />
              <span className="text-yellow-300">{t('ctaTitleHighlight')}</span>
            </motion.h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* For Foreigners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl"
            >
              <div className="text-5xl mb-4">{t('ctaForeignersIcon')}</div>
              <h3 className="text-2xl font-black mb-3">{t('ctaForeignersTitle')}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('ctaForeignersDesc')}
              </p>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                {t('ctaForeignersButton')}
              </motion.button>
            </motion.div>

            {/* For Partners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md text-white p-8 rounded-3xl border-2 border-white/30 shadow-2xl"
            >
              <div className="text-5xl mb-4">{t('ctaPartnersIcon')}</div>
              <h3 className="text-2xl font-black mb-3">{t('ctaPartnersTitle')}</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                {t('ctaPartnersDesc')}
              </p>
              <Link to="/partners">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-nb-pink-600 font-bold py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  {t('ctaPartnersButton')}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Hero
