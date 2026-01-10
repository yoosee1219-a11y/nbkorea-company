import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  PlusCircle,
  Edit,
  Trash2,
  GraduationCap,
  Eye,
  MousePointerClick,
  Search,
  Loader2
} from 'lucide-react'
import { getUniversities, createUniversity, updateUniversity, deleteUniversity } from '../../services/postsService'
import PostForm from './PostForm'

const UniversitiesManager = () => {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUniversity, setEditingUniversity] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      setLoading(true)
      const { data, error } = await getUniversities()
      if (error) throw error
      setUniversities(data || [])
    } catch (error) {
      console.error('Error fetching universities:', error)
      alert('대학교 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingUniversity(null)
    setShowForm(true)
  }

  const handleEdit = (university) => {
    setEditingUniversity(university)
    setShowForm(true)
  }

  const handleSave = async (formData) => {
    try {
      setFormLoading(true)

      if (editingUniversity) {
        // Update
        const { error } = await updateUniversity(editingUniversity.id, formData)
        if (error) throw error
        alert('대학교 정보가 수정되었습니다.')
      } else {
        // Create
        const { error } = await createUniversity(formData)
        if (error) throw error
        alert('새 대학교가 등록되었습니다.')
      }

      setShowForm(false)
      setEditingUniversity(null)
      fetchUniversities()
    } catch (error) {
      console.error('Error saving university:', error)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (universityId) => {
    if (!confirm('정말로 이 대학교 정보를 삭제하시겠습니까?')) return

    try {
      const { error } = await deleteUniversity(universityId)
      if (error) throw error
      alert('대학교 정보가 삭제되었습니다.')
      fetchUniversities()
    } catch (error) {
      console.error('Error deleting university:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const filteredUniversities = universities.filter(uni =>
    uni.university_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.degree?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">대학교 관리</h2>
            <p className="text-sm text-slate-500">총 {universities.length}개의 대학교</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
        >
          <PlusCircle size={20} />
          새 대학교 등록
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="대학교, 학과, 학위로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Universities List */}
      {filteredUniversities.length === 0 ? (
        <div className="text-center py-20">
          <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 대학교가 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredUniversities.map((uni) => (
            <motion.div
              key={uni.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {uni.university_name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="font-medium">{uni.department}</span>
                      <span>•</span>
                      <span>{uni.degree}</span>
                      {uni.tuition_per_semester && (
                        <>
                          <span>•</span>
                          <span className="text-purple-600 font-medium">{uni.tuition_per_semester}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {uni.tags && uni.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uni.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{uni.views || 0} 조회</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MousePointerClick size={16} />
                      <span>{uni.info_clicks || 0} 클릭</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(uni)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit size={18} />
                    수정
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(uni.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} />
                    삭제
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <PostForm
          type="university"
          post={editingUniversity}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingUniversity(null)
          }}
          loading={formLoading}
        />
      )}
    </div>
  )
}

export default UniversitiesManager
