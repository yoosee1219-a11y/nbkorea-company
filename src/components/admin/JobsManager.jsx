import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  PlusCircle,
  Edit,
  Trash2,
  Briefcase,
  Eye,
  MousePointerClick,
  Search,
  Loader2
} from 'lucide-react'
import { getJobs, createJob, updateJob, deleteJob } from '../../services/postsService'
import PostForm from './PostForm'

const JobsManager = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const { data, error } = await getJobs()
      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
      alert('일자리 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingJob(null)
    setShowForm(true)
  }

  const handleEdit = (job) => {
    setEditingJob(job)
    setShowForm(true)
  }

  const handleSave = async (formData) => {
    try {
      setFormLoading(true)

      if (editingJob) {
        // Update
        const { error } = await updateJob(editingJob.id, formData)
        if (error) throw error
        alert('일자리 정보가 수정되었습니다.')
      } else {
        // Create
        const { error } = await createJob(formData)
        if (error) throw error
        alert('새 일자리가 등록되었습니다.')
      }

      setShowForm(false)
      setEditingJob(null)
      fetchJobs()
    } catch (error) {
      console.error('Error saving job:', error)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (jobId) => {
    if (!confirm('정말로 이 일자리를 삭제하시겠습니까?')) return

    try {
      const { error } = await deleteJob(jobId)
      if (error) throw error
      alert('일자리가 삭제되었습니다.')
      fetchJobs()
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-nb-pink-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-nb-pink-100 rounded-lg">
            <Briefcase className="w-6 h-6 text-nb-pink-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">일자리 관리</h2>
            <p className="text-sm text-slate-500">총 {jobs.length}개의 일자리</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-nb-pink-600 text-white font-medium rounded-lg hover:bg-nb-pink-700 transition-colors shadow-lg"
        >
          <PlusCircle size={20} />
          새 일자리 등록
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="회사, 직무, 위치로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
        />
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-20">
          <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 일자리가 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="font-medium">{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      {job.salary && (
                        <>
                          <span>•</span>
                          <span className="text-nb-pink-600 font-medium">{job.salary}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.visa_types?.map((visa) => (
                      <span
                        key={visa}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                      >
                        {visa}
                      </span>
                    ))}
                    {job.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{job.views || 0} 조회</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MousePointerClick size={16} />
                      <span>{job.apply_clicks || 0} 클릭</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(job)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit size={18} />
                    수정
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(job.id)}
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
          type="job"
          post={editingJob}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingJob(null)
          }}
          loading={formLoading}
        />
      )}
    </div>
  )
}

export default JobsManager
