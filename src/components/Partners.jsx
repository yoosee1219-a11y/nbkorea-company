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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            제휴 파트너사
          </h2>
          <p className="text-lg text-slate-600">
            함께 성장하는 파트너사들을 소개합니다
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">로딩 중...</div>
        ) : partners.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {partner.logo_url ? (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full h-16 object-contain"
                  />
                ) : (
                  <span className="text-slate-700 font-medium">
                    {partner.name}
                  </span>
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
