import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { GraduationCap, Loader2, Search } from 'lucide-react'
import { getUniversities } from '../services/postsService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'

const UniversitiesBoard = () => {
  const { t } = useTranslation('jobs')
  const navigate = useNavigate()
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      const { data, error } = await getUniversities()
      if (error) throw error
      setUniversities(data || [])
    } catch (error) {
      console.error('Error fetching universities:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUniversities = universities.filter(uni =>
    uni.university_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.department?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <section className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-12 h-12 text-nb-pink-600 animate-spin" />
          <p className="text-slate-600 font-semibold text-lg">{t('loading')}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>{t('universities.seo.pageTitle')}</title>
        <meta name="description" content={t('universities.seo.description')} />
        <meta name="keywords" content={t('universities.seo.keywords')} />
        <meta property="og:title" content={t('universities.seo.ogTitle')} />
        <meta property="og:description" content={t('universities.seo.ogDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nbkorea.com/universities" />
        <link rel="canonical" href="https://nbkorea.com/universities" />
      </Helmet>
      <section className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 pt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('universities_title')}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t('universities_subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('search_universities')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Universities Grid */}
        {filteredUniversities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-500">{t('no_universities')}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni, index) => (
              <PostCard
                key={uni.id}
                post={uni}
                type="university"
                index={index}
                onClick={() => navigate(`/universities/${uni.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  )
}

export default UniversitiesBoard
