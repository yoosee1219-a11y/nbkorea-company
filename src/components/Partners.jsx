import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Building2, Globe2, Loader2, ChevronDown, Sparkles, Award, Users, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { getPartners } from '../services/dataService'
import { useTranslation } from 'react-i18next'

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [springValue])

  return <span ref={ref}>{displayValue}</span>
}

const Partners = () => {
  const { t } = useTranslation('partners')
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [openCategory, setOpenCategory] = useState('overseas')
  const [carouselIndices, setCarouselIndices] = useState({
    overseas: 0,
    worker: 0,
    domestic: 0
  })

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const { data, error } = await getPartners()
      if (error) throw error
      setPartners(data || [])
    } catch (error) {
      console.error('Error fetching partners:', error)
    } finally {
      setLoading(false)
    }
  }

  // Featured partners
  const featuredPartners = partners.filter(p => p.category === 'featured')

  // 3개 주요 카테고리로 분류
  const overseasPartners = partners.filter(p =>
    p.category === 'overseas' || p.category === 'kyrgyzstan_study'
  )
  const workerDispatchPartners = partners.filter(p =>
    p.category === 'e9_visa' || p.category === 'worker_dispatch'
  )
  const domesticPartners = partners.filter(p => p.category === 'domestic')

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? '' : category)
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-nb-pink-600 animate-spin" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-rose-200 rounded-full animate-ping opacity-20"></div>
            </div>
            <p className="text-slate-600 font-semibold text-lg">{t('loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  const PartnerCard = ({ partner, compact = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`group bg-white rounded-2xl border-2 border-slate-200 hover:border-nb-pink-300 hover:shadow-xl transition-all duration-300 ${
        compact ? 'p-4' : 'p-6'
      } relative overflow-hidden`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-nb-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className={`relative bg-gradient-to-br from-slate-50 to-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 ${
        compact ? 'aspect-[4/3] mb-3' : 'aspect-[3/2] mb-4'
      }`}>
        {partner.logo_url ? (
          <img
            src={partner.logo_url}
            alt={partner.name}
            className={`w-full h-full object-contain transition-all duration-300 ${
              compact ? 'p-3' : 'p-6'
            } group-hover:scale-105`}
          />
        ) : (
          <Building2 className={`text-slate-300 ${
            compact ? 'w-10 h-10' : 'w-12 h-12'
          }`} />
        )}

        {partner.country && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-700 border border-slate-200 shadow-sm">
            {partner.country}
          </div>
        )}
      </div>

      <h4 className={`font-bold text-slate-900 line-clamp-2 group-hover:text-nb-pink-600 transition-colors ${
        compact ? 'text-sm mb-2' : 'text-base mb-3'
      }`}>
        {partner.name}
      </h4>

      {partner.description && (
        <p className={`text-slate-500 line-clamp-2 leading-relaxed ${
          compact ? 'text-xs' : 'text-sm'
        }`}>
          {partner.description}
        </p>
      )}
    </motion.div>
  )

  // Carousel Component
  const PartnerCarousel = ({ partners, category, title, icon: Icon, gradientFrom, gradientTo, iconBg }) => {
    const itemsPerPage = 3
    const currentIndex = carouselIndices[category] || 0
    const totalPages = Math.ceil(partners.length / itemsPerPage)

    const nextSlide = () => {
      setCarouselIndices(prev => ({
        ...prev,
        [category]: (prev[category] + 1) % totalPages
      }))
    }

    const prevSlide = () => {
      setCarouselIndices(prev => ({
        ...prev,
        [category]: prev[category] === 0 ? totalPages - 1 : prev[category] - 1
      }))
    }

    const visiblePartners = partners.slice(
      currentIndex * itemsPerPage,
      currentIndex * itemsPerPage + itemsPerPage
    )

    if (partners.length === 0) {
      return (
        <div>
          <div className={`mb-8 bg-gradient-to-r ${gradientFrom} ${gradientTo} p-6 rounded-2xl border ${iconBg.replace('from-', 'border-').replace(' to-', '-200 border-')}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{title}</h3>
                <p className={`text-sm font-semibold ${gradientFrom.includes('pink') ? 'text-nb-pink-600' : gradientFrom.includes('blue') ? 'text-blue-600' : 'text-purple-600'}`}>
                  {t('categories.partnerCount', { count: partners.length })}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-semibold">{t('empty')}</p>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className={`mb-8 bg-gradient-to-r ${gradientFrom} ${gradientTo} p-6 rounded-2xl border ${iconBg.replace('from-', 'border-').replace(' to-', '-200 border-')}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{title}</h3>
                <p className={`text-sm font-semibold ${gradientFrom.includes('pink') ? 'text-nb-pink-600' : gradientFrom.includes('blue') ? 'text-blue-600' : 'text-purple-600'}`}>
                  {t('categories.partnerCount', { count: partners.length })}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
                  aria-label="Previous"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
                  aria-label="Next"
                >
                  <ArrowRight className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            )}
          </div>
          {/* Page indicator */}
          {totalPages > 1 && (
            <div className="flex gap-1.5 justify-center mt-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? `w-8 ${gradientFrom.includes('pink') ? 'bg-nb-pink-600' : gradientFrom.includes('blue') ? 'bg-blue-600' : 'bg-purple-600'}`
                      : 'w-1.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Carousel Cards */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visiblePartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 overflow-hidden">
      {/* Animated Background Shapes */}
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
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-nb-pink-400/10 to-rose-400/10 rounded-full blur-3xl"
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
        className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-4"
          >
            <div className="h-1.5 w-16 bg-gradient-to-r from-nb-pink-600 to-rose-600 mx-auto mb-6 rounded-full"></div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            <span className="text-nb-pink-600 font-bold">{t('subtitle')}</span>{t('subtitleSuffix')}
          </motion.p>
        </div>

        {/* Animated Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Total Partners */}
            <div className="group bg-gradient-to-br from-nb-pink-500 to-rose-600 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Users className="w-12 h-12 text-white/90 mx-auto mb-4" />
                <div className="text-5xl font-black text-white mb-2">
                  <AnimatedCounter value={partners.length} />+
                </div>
                <p className="text-white/90 font-semibold text-lg">{t('stats.totalPartners')}</p>
              </div>
            </div>

            {/* Countries */}
            <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <MapPin className="w-12 h-12 text-white/90 mx-auto mb-4" />
                <div className="text-5xl font-black text-white mb-2">
                  <AnimatedCounter value={[...new Set(partners.map(p => p.country).filter(Boolean))].length} />+
                </div>
                <p className="text-white/90 font-semibold text-lg">{t('stats.countries')}</p>
              </div>
            </div>

            {/* Featured Partners */}
            <div className="group bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Award className="w-12 h-12 text-white/90 mx-auto mb-4" />
                <div className="text-5xl font-black text-white mb-2">
                  <AnimatedCounter value={partners.filter(p => p.category === 'featured').length} />
                </div>
                <p className="text-white/90 font-semibold text-lg">{t('stats.premiumPartners')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Partners Section */}
        {featuredPartners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 mb-4">
                <Award className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">{t('featured.badge')}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {t('featured.title')}
              </h3>
              <p className="text-slate-600">{t('featured.subtitle')}</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
              {featuredPartners
                .sort((a, b) => {
                  if (a.name === 'LGU+') return -1
                  if (b.name === 'LGU+') return 1
                  return 0
                })
                .map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-nb-pink-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Card */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-br from-white to-slate-50 rounded-3xl flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl group-hover:shadow-nb-pink-600/20 transition-all duration-500">
                      {/* Special background for better logo visibility */}
                      <div className={`absolute inset-0 ${
                        partner.name === 'LGU+' || partner.name === '전북은행'
                          ? 'bg-gradient-to-br from-slate-700 to-slate-900'
                          : 'bg-gradient-to-br from-slate-100 to-slate-50'
                      }`}></div>

                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="relative z-10 w-full h-full object-contain p-8 transition-all duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <Building2 className="w-16 h-16 text-slate-300" />
                      )}

                      {/* Premium badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-400 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                        ★ VIP
                      </div>
                    </div>

                    {/* Partner name */}
                    <div className="text-center mt-4">
                      <p className="font-bold text-slate-900 text-lg">{partner.name}</p>
                    </div>
                  </motion.div>
                ))}
            </div>

            <div className="mt-20 pt-16 border-t-2 border-slate-200"></div>
          </motion.div>
        )}

        {/* Desktop: Carousel Layout */}
        <div className="hidden lg:block space-y-16 max-w-7xl mx-auto">
          {/* 해외 유학원 Carousel */}
          <PartnerCarousel
            partners={overseasPartners}
            category="overseas"
            title={t('categories.overseas')}
            icon={Globe2}
            gradientFrom="from-nb-pink-50"
            gradientTo="to-rose-50"
            iconBg="from-nb-pink-500 to-rose-500"
          />

          {/* 근로자 송출업체 Carousel */}
          <PartnerCarousel
            partners={workerDispatchPartners}
            category="worker"
            title={t('categories.worker')}
            icon={Building2}
            gradientFrom="from-blue-50"
            gradientTo="to-indigo-50"
            iconBg="from-blue-500 to-indigo-500"
          />

          {/* 국내 파트너 Carousel */}
          <PartnerCarousel
            partners={domesticPartners}
            category="domestic"
            title={t('categories.domestic')}
            icon={Sparkles}
            gradientFrom="from-purple-50"
            gradientTo="to-pink-50"
            iconBg="from-purple-500 to-pink-500"
          />
        </div>

        {/* Mobile: Accordion Layout */}
        <div className="lg:hidden space-y-6">
          {/* 해외 유학원 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg"
          >
            <button
              onClick={() => toggleCategory('overseas')}
              className="w-full bg-gradient-to-r from-nb-pink-50 to-rose-50 hover:from-nb-pink-100 hover:to-rose-100 p-6 flex items-center justify-between transition-all duration-300 focus:outline-none"
              aria-expanded={openCategory === 'overseas'}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nb-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <Globe2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-base font-black text-slate-900 block">{t('categories.overseas')}</span>
                  <span className="text-sm text-nb-pink-600 font-semibold">{t('categories.partnerCount', { count: overseasPartners.length })}</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'overseas' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-slate-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openCategory === 'overseas' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 gap-4 bg-slate-50">
                    {overseasPartners.map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} compact={true} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 근로자 송출업체 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg"
          >
            <button
              onClick={() => toggleCategory('worker')}
              className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 p-6 flex items-center justify-between transition-all duration-300 focus:outline-none"
              aria-expanded={openCategory === 'worker'}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-base font-black text-slate-900 block">{t('categories.worker')}</span>
                  <span className="text-sm text-blue-600 font-semibold">{t('categories.partnerCount', { count: workerDispatchPartners.length })}</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'worker' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-slate-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openCategory === 'worker' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 gap-4 bg-slate-50">
                    {workerDispatchPartners.map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} compact={true} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 국내 파트너 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg"
          >
            <button
              onClick={() => toggleCategory('domestic')}
              className="w-full bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 p-6 flex items-center justify-between transition-all duration-300 focus:outline-none"
              aria-expanded={openCategory === 'domestic'}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-base font-black text-slate-900 block">{t('categories.domestic')}</span>
                  <span className="text-sm text-purple-600 font-semibold">{t('categories.partnerCount', { count: domesticPartners.length })}</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'domestic' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-slate-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openCategory === 'domestic' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 gap-4 bg-slate-50">
                    {domesticPartners.map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} compact={true} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Partners
