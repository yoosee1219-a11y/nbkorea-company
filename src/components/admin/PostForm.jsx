import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Loader2 } from 'lucide-react'

const PostForm = ({ type, post, onSave, onCancel, loading }) => {
  const isJob = type === 'job'
  const isEdit = !!post

  // Job 필드
  const [formData, setFormData] = useState({
    // Jobs fields
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    apply_url: '',
    tags: [],
    visa_types: [],

    // Universities fields
    university_name: '',
    department: '',
    degree: '',
    tuition_per_semester: '',
    scholarships: '',
    admission_period: '',
    info_url: '',
    contact_info: '',

    // Common
    source: 'admin',
    expires_at: null
  })

  const [tagInput, setTagInput] = useState('')
  const [visaInput, setVisaInput] = useState('')

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        tags: post.tags || [],
        visa_types: post.visa_types || []
      })
    }
  }, [post])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleAddVisa = (e) => {
    e.preventDefault()
    if (visaInput.trim() && !formData.visa_types.includes(visaInput.trim())) {
      setFormData(prev => ({
        ...prev,
        visa_types: [...prev.visa_types, visaInput.trim()]
      }))
      setVisaInput('')
    }
  }

  const handleRemoveVisa = (visa) => {
    setFormData(prev => ({
      ...prev,
      visa_types: prev.visa_types.filter(v => v !== visa)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {isEdit ? '게시물 수정' : '새 게시물 작성'} - {isJob ? '일자리' : '대학교'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {isJob ? (
            <>
              {/* Job Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    제목 (직무) *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                    placeholder="예: 공장 생산직 모집"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    회사명 *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                    placeholder="예: 삼성전자"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    위치 *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                    placeholder="예: 서울시 강남구"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    급여
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                    placeholder="예: 월 250만원"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  직무 설명 *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                  placeholder="직무에 대한 상세 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  지원 자격 *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                  placeholder="필요한 자격 요건을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  지원 링크 *
                </label>
                <input
                  type="url"
                  name="apply_url"
                  value={formData.apply_url}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                  placeholder="https://example.com/apply"
                />
              </div>

              {/* Visa Types */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  비자 종류
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={visaInput}
                    onChange={(e) => setVisaInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                    placeholder="예: E-9, H-2"
                  />
                  <button
                    onClick={handleAddVisa}
                    className="px-4 py-2 bg-nb-pink-600 text-white rounded-lg hover:bg-nb-pink-700"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.visa_types.map((visa) => (
                    <span
                      key={visa}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {visa}
                      <button
                        type="button"
                        onClick={() => handleRemoveVisa(visa)}
                        className="hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* University Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    대학교 이름 *
                  </label>
                  <input
                    type="text"
                    name="university_name"
                    value={formData.university_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: 서울대학교"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    학과 *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: 컴퓨터공학과"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    학위 *
                  </label>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    <option value="학사">학사</option>
                    <option value="석사">석사</option>
                    <option value="박사">박사</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    학기당 학비
                  </label>
                  <input
                    type="text"
                    name="tuition_per_semester"
                    value={formData.tuition_per_semester}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: 400만원"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  장학금 정보
                </label>
                <textarea
                  name="scholarships"
                  value={formData.scholarships}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="장학금 정보를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  입학 요강 *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="입학 요강을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    모집 기간
                  </label>
                  <input
                    type="text"
                    name="admission_period"
                    value={formData.admission_period}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: 2025년 3월"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="text"
                    name="contact_info"
                    value={formData.contact_info}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: admissions@university.ac.kr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  정보 링크 *
                </label>
                <input
                  type="url"
                  name="info_url"
                  value={formData.info_url}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://university.ac.kr/admission"
                />
              </div>
            </>
          )}

          {/* Tags (Common) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              태그
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent"
                placeholder="태그 입력 후 추가 버튼 클릭"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-slate-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-nb-pink-600 text-white font-medium rounded-lg hover:bg-nb-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  저장 중...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {isEdit ? '수정하기' : '저장하기'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default PostForm
