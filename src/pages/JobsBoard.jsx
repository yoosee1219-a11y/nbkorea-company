import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Briefcase, Loader2, Search, ShieldAlert, ExternalLink } from 'lucide-react'
import { getJobs } from '../services/postsService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { HreflangTags } from '../components/SEO'

const JobsBoard = () => {
  const { t } = useTranslation('jobs')
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data, error } = await getJobs()
      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <section className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
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
        <title>{t('seo.pageTitle')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta name="keywords" content={t('seo.keywords')} />
        <meta property="og:title" content={t('seo.ogTitle')} />
        <meta property="og:description" content={t('seo.ogDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nbkorea.com/jobs" />
        <link rel="canonical" href="https://nbkorea.com/jobs" />
      </Helmet>
      <HreflangTags path="/jobs" />
      <section className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 pt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nb-pink-100 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-nb-pink-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Wage Defaulter Warning Banner */}
        <a
          href="https://www.moel.go.kr/info/defaulter/defaulterList.do"
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-4xl mx-auto mb-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              <ShieldAlert className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-amber-900">{t('wageDefaulter.title')}</h3>
                <ExternalLink className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-amber-700">{t('wageDefaulter.description')}</p>
            </div>
          </div>
        </a>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-500">{t('no_jobs')}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <PostCard
                key={job.id}
                post={job}
                type="job"
                index={index}
                onClick={() => navigate(`/jobs/${job.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  )
}

export default JobsBoard
