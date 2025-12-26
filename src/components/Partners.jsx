import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe2, Loader2 } from 'lucide-react'
import { getPartners } from '../services/dataService'

const CATEGORY_LABELS = {
  'kyrgyzstan_study': '🇰🇬 키르기스스탄 유학원',
  'e9_visa': '✈️ E-9 비자 송출업체',
  'domestic': '🇰🇷 국내 파트너',
  'overseas': '🌍 해외 유학원/송출업체'
}

const Partners = () => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

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

  // Group partners by category
  const groupedPartners = partners.reduce((acc, partner) => {
    const category = partner.category || 'overseas'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(partner)
    return acc
  }, {})

  const categoryOrder = ['kyrgyzstan_study', 'e9_visa', 'domestic', 'overseas']

  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium">로딩 중...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            제휴 파트너사
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            전 세계 우수한 기관 및 기업과 협력하여 최상의 기회를 제공합니다
          </motion.p>
        </div>

        {partners.length === 0 ? (
          <div className="text-center text-slate-500">
            파트너사 정보가 없습니다
          </div>
        ) : (
          <div className="space-y-16">
            {categoryOrder.map((categoryKey, index) => {
              const categoryPartners = groupedPartners[categoryKey]

              if (!categoryPartners || categoryPartners.length === 0) return null

              return (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                      {CATEGORY_LABELS[categoryKey]}
                    </h3>
                    <span className="ml-auto text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                      {categoryPartners.length}개
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="group bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300"
                      >
                        <div className="aspect-[3/2] mb-5 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden relative">
                          {partner.logo_url ? (
                            <img
                              src={partner.logo_url}
                              alt={partner.name}
                              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <Building2 className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" />
                          )}

                          {partner.country && (
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1">
                              <Globe2 className="w-3 h-3" />
                              {partner.country}
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {partner.name}
                        </h4>

                        {partner.description && (
                          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                            {partner.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Partners
