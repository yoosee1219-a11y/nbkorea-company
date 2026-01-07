import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Copy, Check, Users, Link as LinkIcon } from 'lucide-react'
import {
  getInfluencers,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer
} from '../../services/dataService'

const InfluencerManager = () => {
  const [influencers, setInfluencers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingInfluencer, setEditingInfluencer] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    is_active: true
  })

  useEffect(() => {
    loadInfluencers()
  }, [])

  const loadInfluencers = async () => {
    setLoading(true)
    const { data, error } = await getInfluencers()
    if (error) {
      console.error('Error loading influencers:', error)
    } else {
      setInfluencers(data || [])
    }
    setLoading(false)
  }

  const handleOpenModal = (influencer = null) => {
    if (influencer) {
      setEditingInfluencer(influencer)
      setFormData({
        code: influencer.code,
        name: influencer.name,
        description: influencer.description || '',
        is_active: influencer.is_active !== undefined ? influencer.is_active : true
      })
    } else {
      setEditingInfluencer(null)
      setFormData({
        code: '',
        name: '',
        description: '',
        is_active: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingInfluencer(null)
    setFormData({
      code: '',
      name: '',
      description: '',
      is_active: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.code || !formData.name) {
      alert('코드와 이름은 필수 항목입니다.')
      return
    }

    if (editingInfluencer) {
      // 수정
      const { success, error } = await updateInfluencer(editingInfluencer.id, formData)
      if (error) {
        alert('수정 실패: ' + error.message)
      } else {
        await loadInfluencers()
        handleCloseModal()
      }
    } else {
      // 생성
      const { data, error } = await createInfluencer(formData)
      if (error) {
        alert('생성 실패: ' + error.message)
      } else {
        await loadInfluencers()
        handleCloseModal()
      }
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('정말로 이 인플루언서를 삭제하시겠습니까?')) return

    const { success, error } = await deleteInfluencer(id)
    if (error) {
      alert('삭제 실패: ' + error.message)
    } else {
      await loadInfluencers()
    }
  }

  const handleCopyUrl = (code) => {
    const url = `https://info-nbkorea.com/?ref=${code}`
    navigator.clipboard.writeText(url)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const generateCode = () => {
    const randomStr = Math.random().toString(36).substring(2, 8)
    setFormData({ ...formData, code: `inf_${randomStr}` })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nb-pink-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-nb-pink-500 to-rose-600 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">인플루언서 관리</h2>
            <p className="text-slate-600 text-sm">리퍼럴 링크를 생성하고 관리하세요</p>
          </div>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          새 인플루언서
        </button>
      </div>

      {/* Influencers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {influencers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">아직 등록된 인플루언서가 없습니다.</p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 text-nb-pink-600 hover:text-nb-pink-700 font-semibold"
            >
              첫 번째 인플루언서 추가하기
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">코드</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">이름</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">설명</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">상태</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">생성일</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {influencers.map((influencer) => (
                <tr key={influencer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                        {influencer.code}
                      </code>
                      <button
                        onClick={() => handleCopyUrl(influencer.code)}
                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                        title="URL 복사"
                      >
                        {copiedCode === influencer.code ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900">{influencer.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm">{influencer.description || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        influencer.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {influencer.is_active ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {influencer.created_at
                      ? new Date(influencer.created_at).toLocaleDateString('ko-KR')
                      : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(influencer)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="편집"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(influencer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {editingInfluencer ? '인플루언서 수정' : '새 인플루언서 추가'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Code */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    코드 <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                      placeholder="예: inf_abc123"
                      disabled={editingInfluencer} // 수정 시에는 코드 변경 불가
                      required
                    />
                    {!editingInfluencer && (
                      <button
                        type="button"
                        onClick={generateCode}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                      >
                        자동생성
                      </button>
                    )}
                  </div>
                  {editingInfluencer && (
                    <p className="text-xs text-slate-500 mt-1">코드는 수정할 수 없습니다.</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    이름 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                    placeholder="예: 김인플루언서"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    설명 (선택)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                    placeholder="예: 틱톡 크리에이터"
                    rows={3}
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5 text-nb-pink-600 rounded"
                  />
                  <label htmlFor="is_active" className="text-sm font-semibold text-slate-700">
                    활성 상태
                  </label>
                </div>

                {/* URL Preview */}
                {formData.code && (
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs text-slate-600 mb-1">리퍼럴 URL:</p>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <code className="text-sm text-slate-900 break-all">
                        https://info-nbkorea.com/?ref={formData.code}
                      </code>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    {editingInfluencer ? '수정' : '생성'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InfluencerManager
