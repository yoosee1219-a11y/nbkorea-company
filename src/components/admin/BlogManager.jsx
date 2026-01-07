import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react'
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { getBlogPosts } from '../../services/dataService'
import ImageUpload from './ImageUpload'

const BlogManager = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: ''
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await getBlogPosts(999)
      if (error) throw error
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
      alert('블로그 포스트를 불러오는데 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 사이트 구분 추가
      const siteOrigin = import.meta.env.VITE_DEFAULT_LANGUAGE || 'ko'

      if (editingPost) {
        // Update existing post
        await updateDoc(doc(db, 'blog_posts', editingPost.id), {
          ...formData,
          site_origin: siteOrigin,
          updated_at: serverTimestamp()
        })
        alert('블로그 포스트가 수정되었습니다')
      } else {
        // Create new post
        await addDoc(collection(db, 'blog_posts'), {
          ...formData,
          site_origin: siteOrigin,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        })
        alert('블로그 포스트가 생성되었습니다')
      }

      setIsEditing(false)
      setEditingPost(null)
      setFormData({ title: '', content: '', excerpt: '', image_url: '' })
      fetchPosts()
    } catch (error) {
      console.error('Error saving post:', error)
      alert('저장에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title || '',
      content: post.content || '',
      excerpt: post.excerpt || '',
      image_url: post.image_url || ''
    })
    setIsEditing(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    setLoading(true)
    try {
      await deleteDoc(doc(db, 'blog_posts', id))
      alert('블로그 포스트가 삭제되었습니다')
      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('삭제에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingPost(null)
    setFormData({ title: '', content: '', excerpt: '', image_url: '' })
  }

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-nb-pink-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">블로그 포스트 관리</h2>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-medium rounded-lg transition-colors shadow-lg"
          >
            <PlusCircle size={20} />
            새 포스트
          </motion.button>
        )}
      </div>

      {/* Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {editingPost ? '포스트 수정' : '새 포스트 작성'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">요약</label>
              <input
                type="text"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500"
                placeholder="간단한 요약 (선택사항)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">내용</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="10"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">썸네일 이미지</label>
              <ImageUpload
                currentUrl={formData.image_url}
                onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
              />
              <p className="text-xs text-slate-500 mt-2">
                또는 URL 직접 입력:
              </p>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 mt-1"
                placeholder="https://... (선택사항)"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {editingPost ? '수정' : '작성'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
              >
                <X size={20} />
                취소
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-500">작성된 블로그 포스트가 없습니다</p>
          </div>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-slate-600 mb-2">{post.excerpt}</p>
                  )}
                  <p className="text-xs text-slate-400">
                    {post.created_at?.toDate?.()?.toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default BlogManager
