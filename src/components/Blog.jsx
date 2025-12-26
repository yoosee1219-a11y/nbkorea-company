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
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            최신 소식
          </h2>
          <p className="text-lg text-slate-600">
            NBKOREA의 새로운 소식을 확인하세요
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">로딩 중...</div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <time className="text-sm text-slate-500">
                    {formatDate(post.created_at)}
                  </time>
                  <h3 className="text-xl font-semibold text-slate-900 mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-3">
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
