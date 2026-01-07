import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Loader2, FileText, Newspaper } from 'lucide-react'
import { getBlogPosts } from '../services/dataService'
import { useTranslation } from 'react-i18next'

const Blog = () => {
  const { t, i18n } = useTranslation('blog')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await getBlogPosts(6)
      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US'
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-rose-50/30 min-h-[60vh] flex items-center justify-center">
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

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-12 max-w-md mx-auto">
              <div className="bg-slate-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('empty.title')}</h3>
              <p className="text-slate-400 text-sm">{t('empty.subtitle')}</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden bg-slate-50 relative">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-slate-200" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-nb-pink-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt || post.content}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-nb-pink-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('readMore')} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog
