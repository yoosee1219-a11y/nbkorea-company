import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Loader2, FileText, Newspaper } from 'lucide-react'
import { getBlogPosts } from '../services/dataService'

const Blog = () => {
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
    return date.toLocaleDateString('ko-KR', {
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
            <p className="text-slate-600 font-semibold text-lg">블로그 글을 불러오는 중...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nb-pink-50 to-rose-50 border border-nb-pink-200 mb-6"
          >
            <Newspaper className="size-5 text-nb-pink-600" />
            <span className="text-sm font-semibold text-nb-pink-700">블로그</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4"
          >
            최신 소식
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4"
          >
            NBKOREA의 새로운 소식과 인사이트를 확인하세요
          </motion.p>
        </div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 max-w-md mx-auto">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">블로그 포스트가 없습니다</h3>
              <p className="text-slate-500 text-sm">곧 새로운 소식을 전해드리겠습니다</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-2xl hover:border-nb-pink-200 transition-all duration-500 group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-nb-pink-50 via-slate-100 to-nb-gold-50 relative">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.svg
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </motion.svg>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="truncate">{formatDate(post.created_at)}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-nb-pink-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt || post.content}
                  </p>

                  <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                    <motion.span
                      className="text-nb-pink-600 text-xs sm:text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      자세히 보기 <ArrowRight size={16} className="hidden sm:inline" />
                    </motion.span>
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
