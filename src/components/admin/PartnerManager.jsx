import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react'
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { getPartners } from '../../services/dataService'
import ImageUpload from './ImageUpload'

const PartnerManager = () => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPartner, setEditingPartner] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'overseas',
    logo_url: '',
    country: '',
    description: ''
  })

  const categories = [
    { value: 'featured', label: '🎯 주요 파트너십' },
    { value: 'overseas', label: '🌍 해외 유학원' },
    { value: 'e9_visa', label: '✈️ 근로자 송출업체' },
    { value: 'domestic', label: '🇰🇷 국내 파트너' }
  ]

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const { data, error } = await getPartners()
      if (error) throw error
      setPartners(data)
    } catch (error) {
      console.error('Error fetching partners:', error)
      alert('파트너를 불러오는데 실패했습니다')
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
      const dataToSave = {
        ...formData,
        site_origin: siteOrigin
      }

      if (editingPartner) {
        // Update existing partner
        await updateDoc(doc(db, 'partners', editingPartner.id), dataToSave)
        alert('파트너가 수정되었습니다')
      } else {
        // Create new partner
        await addDoc(collection(db, 'partners'), dataToSave)
        alert('파트너가 추가되었습니다')
      }

      setIsEditing(false)
      setEditingPartner(null)
      setFormData({ name: '', category: 'overseas', logo_url: '', country: '', description: '' })
      fetchPartners()
    } catch (error) {
      console.error('Error saving partner:', error)
      alert('저장에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (partner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name || '',
      category: partner.category || 'overseas',
      logo_url: partner.logo_url || '',
      country: partner.country || '',
      description: partner.description || ''
    })
    setIsEditing(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    setLoading(true)
    try {
      await deleteDoc(doc(db, 'partners', id))
      alert('파트너가 삭제되었습니다')
      fetchPartners()
    } catch (error) {
      console.error('Error deleting partner:', error)
      alert('삭제에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingPartner(null)
    setFormData({ name: '', category: 'overseas', logo_url: '', country: '', description: '' })
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

  if (loading && partners.length === 0) {
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
        <h2 className="text-2xl font-bold text-slate-900">파트너 관리</h2>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-medium rounded-lg transition-colors shadow-lg"
          >
            <PlusCircle size={20} />
            파트너 추가
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
            {editingPartner ? '파트너 수정' : '새 파트너 추가'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">파트너명</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">국가</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500"
                  placeholder="키르기스스탄 (선택사항)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">로고 이미지</label>
                <ImageUpload
                  currentUrl={formData.logo_url}
                  onUploadComplete={(url) => setFormData({ ...formData, logo_url: url })}
                />
                <p className="text-xs text-slate-500 mt-2">
                  또는 URL 직접 입력:
                </p>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 mt-1"
                  placeholder="https://... (선택사항)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">설명</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 resize-none"
                placeholder="파트너 설명 (선택사항)"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {editingPartner ? '수정' : '추가'}
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

      {/* Partners List by Category */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryPartners = groupedPartners[category.value] || []
          if (categoryPartners.length === 0) return null

          return (
            <div key={category.value} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
                <span>{category.label}</span>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {categoryPartners.length}개
                </span>
              </h3>
              <div className="grid gap-3">
                {categoryPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                        {partner.logo_url ? (
                          <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <span className="text-2xl">🏢</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{partner.name}</p>
                        {partner.country && (
                          <p className="text-xs text-slate-500">{partner.country}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(partner)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {partners.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-500">등록된 파트너가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PartnerManager
