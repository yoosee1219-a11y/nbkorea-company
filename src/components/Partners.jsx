import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Globe2, Loader2, ChevronDown } from 'lucide-react'
import { getPartners } from '../services/dataService'

const Partners = () => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [openCategory, setOpenCategory] = useState('overseas') // 모바일용 아코디언 상태

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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-nb-pink-600 animate-spin" />
            <p className="text-slate-500 font-medium">로딩 중...</p>
          </div>
        </div>
      </section>
    )
  }

  const PartnerCard = ({ partner, compact = false }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`group bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-lg hover:border-nb-pink-100 transition-all duration-300 ${
        compact ? 'p-3' : 'p-4 sm:p-6'
      }`}
    >
      <div className={`bg-gradient-to-br from-nb-pink-50 to-nb-gold-50 rounded-lg flex items-center justify-center overflow-hidden relative ${
        compact ? 'aspect-[4/3] mb-2' : 'aspect-[3/2] mb-4'
      }`}>
        {partner.logo_url ? (
          <img
            src={partner.logo_url}
            alt={partner.name}
            className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ${
              compact ? 'p-2' : 'p-3'
            }`}
          />
        ) : (
          <Building2 className={`text-slate-300 group-hover:text-nb-pink-500 transition-colors ${
            compact ? 'w-8 h-8' : 'w-10 h-10'
          }`} />
        )}

        {partner.country && (
          <div className="absolute top-1.5 right-1.5 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1">
            <Globe2 className="w-3 h-3" />
            <span className="text-[10px]">{partner.country}</span>
          </div>
        )}
      </div>

      <h4 className={`font-bold text-slate-900 group-hover:text-nb-pink-600 transition-colors line-clamp-2 ${
        compact ? 'text-sm mb-1' : 'text-base mb-2'
      }`}>
        {partner.name}
      </h4>

      {partner.description && (
        <p className={`text-slate-500 line-clamp-2 leading-relaxed ${
          compact ? 'text-[11px]' : 'text-xs'
        }`}>
          {partner.description}
        </p>
      )}
    </motion.div>
  )

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4"
          >
            제휴 파트너사
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4"
          >
            전 세계 우수한 기관 및 기업과 협력하여 최상의 기회를 제공합니다
          </motion.p>
        </div>

        {/* Featured Partners Section */}
        {featuredPartners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                🎯 주요 파트너십
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600">
                신뢰할 수 있는 파트너와 함께합니다
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:flex lg:flex-wrap lg:justify-center max-w-4xl mx-auto px-4">
              {featuredPartners
                .sort((a, b) => {
                  // LGU+ 먼저, 그 다음 전북은행
                  if (a.name === 'LGU+') return -1
                  if (b.name === 'LGU+') return 1
                  return 0
                })
                .map((partner) => (
                  <motion.div
                    key={partner.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10 shadow-lg border-2 border-nb-gold-200 hover:border-nb-pink-300 transition-all duration-300 lg:w-56"
                  >
                    <div className="aspect-square bg-gradient-to-br from-nb-pink-50 to-nb-gold-50 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden mb-3 sm:mb-4">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="w-full h-full object-contain p-2 sm:p-3 lg:p-4"
                        />
                      ) : (
                        <Building2 className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-nb-pink-400" />
                      )}
                    </div>
                    <h4 className="text-center font-bold text-sm sm:text-base lg:text-lg text-slate-900">
                      {partner.name}
                    </h4>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Desktop: 3-Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* 해외 유학원 */}
          <div>
            <div className="bg-gradient-to-r from-nb-pink-500 to-nb-pink-600 text-white rounded-t-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-center">🌍 해외 유학원</h3>
              <p className="text-center text-sm mt-1 opacity-90">{overseasPartners.length}개 파트너</p>
            </div>
            <div className="space-y-4">
              {overseasPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
              {overseasPartners.length === 0 && (
                <p className="text-center text-slate-400 py-8">파트너가 없습니다</p>
              )}
            </div>
          </div>

          {/* 근로자 송출업체 */}
          <div>
            <div className="bg-gradient-to-r from-nb-gold-500 to-nb-gold-600 text-white rounded-t-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-center">✈️ 근로자 송출업체</h3>
              <p className="text-center text-sm mt-1 opacity-90">{workerDispatchPartners.length}개 파트너</p>
            </div>
            <div className="space-y-4">
              {workerDispatchPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
              {workerDispatchPartners.length === 0 && (
                <p className="text-center text-slate-400 py-8">파트너가 없습니다</p>
              )}
            </div>
          </div>

          {/* 국내 파트너 */}
          <div>
            <div className="bg-gradient-to-r from-nb-pink-600 to-nb-pink-700 text-white rounded-t-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-center">🇰🇷 국내 파트너</h3>
              <p className="text-center text-sm mt-1 opacity-90">{domesticPartners.length}개 파트너</p>
            </div>
            <div className="space-y-4">
              {domesticPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
              {domesticPartners.length === 0 && (
                <p className="text-center text-slate-400 py-8">파트너가 없습니다</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {/* 해외 유학원 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <button
              onClick={() => toggleCategory('overseas')}
              className="w-full bg-gradient-to-r from-nb-pink-500 to-nb-pink-600 text-white p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">🌍 해외 유학원</span>
                <span className="text-sm opacity-90">({overseasPartners.length})</span>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'overseas' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
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
                  <div className="p-3 grid grid-cols-2 gap-3">
                    {overseasPartners.map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} compact={true} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 근로자 송출업체 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <button
              onClick={() => toggleCategory('worker')}
              className="w-full bg-gradient-to-r from-nb-gold-500 to-nb-gold-600 text-white p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">✈️ 근로자 송출업체</span>
                <span className="text-sm opacity-90">({workerDispatchPartners.length})</span>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'worker' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
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
                  <div className="p-3 grid grid-cols-2 gap-3">
                    {workerDispatchPartners.map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} compact={true} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 국내 파트너 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <button
              onClick={() => toggleCategory('domestic')}
              className="w-full bg-gradient-to-r from-nb-pink-600 to-nb-pink-700 text-white p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">🇰🇷 국내 파트너</span>
                <span className="text-sm opacity-90">({domesticPartners.length})</span>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'domestic' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
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
                  <div className="p-3 grid grid-cols-2 gap-3">
                    {domesticPartners.map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} compact={true} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
