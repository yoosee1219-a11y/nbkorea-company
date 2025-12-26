import { useEffect, useState } from 'react'
import { getPartners } from '../services/dataService'

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

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            제휴 파트너사
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            함께 성장하는 파트너사들을 소개합니다
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">로딩 중...</div>
        ) : partners.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="p-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                {partner.logo_url ? (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full h-16 object-contain"
                  />
                ) : (
                  <h3 className="text-lg font-semibold text-slate-700 group-hover:text-slate-900 transition-colors text-center">
                    {partner.name}
                  </h3>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            파트너사 정보가 없습니다
          </div>
        )}
      </div>
    </section>
  )
}

export default Partners
