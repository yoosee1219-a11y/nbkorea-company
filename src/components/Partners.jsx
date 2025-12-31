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
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-nb-pink-600 animate-spin" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-rose-200 rounded-full animate-ping opacity-20"></div>
            </div>
            <p className="text-slate-600 font-semibold text-lg">파트너사 정보를 불러오는 중...</p>
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
      whileHover={{ y: -4 }}
      className={`group bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 ${
        compact ? 'p-3' : 'p-5'
      }`}
    >
      <div className={`bg-slate-50 rounded-md flex items-center justify-center overflow-hidden relative ${
        compact ? 'aspect-[4/3] mb-2' : 'aspect-[3/2] mb-4'
      }`}>
        {partner.logo_url ? (
          <img
            src={partner.logo_url}
            alt={partner.name}
            className={`w-full h-full object-contain transition-opacity duration-300 opacity-90 group-hover:opacity-100 ${
              compact ? 'p-2' : 'p-4'
            }`}
          />
        ) : (
          <Building2 className={`text-slate-200 ${
            compact ? 'w-8 h-8' : 'w-10 h-10'
          }`} />
        )}

        {partner.country && (
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium text-slate-600 border border-slate-200">
            <span className="text-[10px]">{partner.country}</span>
          </div>
        )}
      </div>

      <h4 className={`font-semibold text-slate-900 line-clamp-2 ${
        compact ? 'text-xs mb-1' : 'text-sm mb-2'
      }`}>
        {partner.name}
      </h4>

      {partner.description && (
        <p className={`text-slate-400 line-clamp-2 leading-relaxed ${
          compact ? 'text-[10px]' : 'text-xs'
        }`}>
          {partner.description}
        </p>
      )}
    </motion.div>
  )

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-4"
          >
            <div className="h-1 w-12 bg-nb-pink-600 mx-auto mb-6"></div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            파트너사
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto"
          >
            신뢰할 수 있는 파트너와 함께 성장합니다
          </motion.p>
        </div>

        {/* Featured Partners Section */}
        {featuredPartners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 sm:mb-24"
          >
            <div className="text-center mb-12">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
                주요 파트너
              </h3>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
              {featuredPartners
                .sort((a, b) => {
                  if (a.name === 'LGU+') return -1
                  if (b.name === 'LGU+') return 1
                  return 0
                })
                .map((partner) => (
                  <motion.div
                    key={partner.id}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-500">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      ) : (
                        <Building2 className="w-12 h-12 text-slate-300" />
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>

            <div className="mt-16 pt-16 border-t border-slate-100"></div>
          </motion.div>
        )}

        {/* Desktop: 3-Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* 해외 유학원 */}
          <div>
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">
                해외 유학원
              </h3>
              <p className="text-xs text-slate-400">{overseasPartners.length}개 파트너</p>
            </div>
            <div className="space-y-6">
              {overseasPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
              {overseasPartners.length === 0 && (
                <p className="text-center text-slate-300 py-12 text-sm">파트너가 없습니다</p>
              )}
            </div>
          </div>

          {/* 근로자 송출업체 */}
          <div>
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">
                근로자 송출업체
              </h3>
              <p className="text-xs text-slate-400">{workerDispatchPartners.length}개 파트너</p>
            </div>
            <div className="space-y-6">
              {workerDispatchPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
              {workerDispatchPartners.length === 0 && (
                <p className="text-center text-slate-300 py-12 text-sm">파트너가 없습니다</p>
              )}
            </div>
          </div>

          {/* 국내 파트너 */}
          <div>
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">
                국내 파트너
              </h3>
              <p className="text-xs text-slate-400">{domesticPartners.length}개 파트너</p>
            </div>
            <div className="space-y-6">
              {domesticPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
              {domesticPartners.length === 0 && (
                <p className="text-center text-slate-300 py-12 text-sm">파트너가 없습니다</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {/* 해외 유학원 */}
          <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
            <button
              onClick={() => toggleCategory('overseas')}
              className="w-full bg-white hover:bg-slate-50 p-5 flex items-center justify-between transition-all duration-300 focus:outline-none"
              aria-expanded={openCategory === 'overseas'}
              aria-label="해외 유학원 파트너 목록 열기/닫기"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-semibold text-slate-900 uppercase tracking-wider">해외 유학원</span>
                <span className="text-xs text-slate-400">{overseasPartners.length}개 파트너</span>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'overseas' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
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
          <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
            <button
              onClick={() => toggleCategory('worker')}
              className="w-full bg-white hover:bg-slate-50 p-5 flex items-center justify-between transition-all duration-300 focus:outline-none"
              aria-expanded={openCategory === 'worker'}
              aria-label="근로자 송출업체 파트너 목록 열기/닫기"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-semibold text-slate-900 uppercase tracking-wider">근로자 송출업체</span>
                <span className="text-xs text-slate-400">{workerDispatchPartners.length}개 파트너</span>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'worker' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
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
          <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
            <button
              onClick={() => toggleCategory('domestic')}
              className="w-full bg-white hover:bg-slate-50 p-5 flex items-center justify-between transition-all duration-300 focus:outline-none"
              aria-expanded={openCategory === 'domestic'}
              aria-label="국내 파트너 목록 열기/닫기"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-semibold text-slate-900 uppercase tracking-wider">국내 파트너</span>
                <span className="text-xs text-slate-400">{domesticPartners.length}개 파트너</span>
              </div>
              <motion.div
                animate={{ rotate: openCategory === 'domestic' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
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
