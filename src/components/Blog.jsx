import { useEffect, useState } from 'react'
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
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '')
  }

  return (
    <section id="blog" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            최신 소식
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            NBKOREA의 새로운 소식을 확인하세요
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">로딩 중...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-slate-900 font-medium mb-2">
                    {formatDate(post.created_at)}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt || post.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            블로그 포스트가 없습니다
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog
