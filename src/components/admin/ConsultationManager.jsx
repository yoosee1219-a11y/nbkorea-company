import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  DollarSign,
  FileText,
  HelpCircle,
  Calendar,
  User,
  Mail as MailIcon,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  X,
  Download,
  Trash2,
  AlertTriangle,
  Edit2,
  Save,
  Link as LinkIcon
} from 'lucide-react'
import {
  getConsultations,
  deleteConsultation,
  updateConsultationStatus,
  updateConsultation,
  getInfluencers
} from '../../services/dataService'

const ConsultationManager = () => {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, telecom, loan, visa, other
  const [statusFilter, setStatusFilter] = useState('all') // all, pending, contacted, completed
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [selectedIds, setSelectedIds] = useState([]) // 체크박스 선택된 ID들
  const [showBulkActions, setShowBulkActions] = useState(false) // 일괄 작업 모달
  const [influencers, setInfluencers] = useState({}) // 인플루언서 코드 -> 이름 매핑

  useEffect(() => {
    fetchConsultations()
    fetchInfluencers()
  }, [])

  const fetchConsultations = async () => {
    setLoading(true)
    const { data, error } = await getConsultations()
    if (error) {
      console.error('Error fetching consultations:', error)
      return
    }
    setConsultations(data || [])
    setLoading(false)
  }

  const fetchInfluencers = async () => {
    const { data, error } = await getInfluencers()
    if (error) {
      console.error('Error fetching influencers:', error)
      return
    }
    // 인플루언서 코드 -> 이름 매핑
    const influencerMap = {}
    data?.forEach(inf => {
      influencerMap[inf.code] = inf.name
    })
    setInfluencers(influencerMap)
  }

  // 유입 경로 표시 함수
  const getReferralDisplay = (referralSource) => {
    if (!referralSource || referralSource === 'organic') {
      return '오가닉'
    }
    // 인플루언서 이름이 있으면 이름 표시, 없으면 코드 표시
    return influencers[referralSource] || referralSource
  }

  const handleStatusChange = async (consultationId, newStatus) => {
    const { success, error } = await updateConsultationStatus(consultationId, newStatus)
    if (success) {
      // Update local state
      setConsultations(prev =>
        prev.map(c => (c.id === consultationId ? { ...c, status: newStatus } : c))
      )
      if (selectedConsultation?.id === consultationId) {
        setSelectedConsultation({ ...selectedConsultation, status: newStatus })
      }
    } else {
      alert('상태 변경 실패: ' + (error?.message || '알 수 없는 오류'))
    }
  }

  const handleDeleteClick = (consultationId) => {
    setDeletingId(consultationId)
    setShowDeleteModal(true)
    setDeletePassword('')
    setDeleteError('')
  }

  const handleDeleteConfirm = async () => {
    if (!deletePassword) {
      setDeleteError('비밀번호를 입력하세요.')
      return
    }

    const { success, error } = await deleteConsultation(deletingId, deletePassword)

    if (success) {
      // Remove from local state
      setConsultations(prev => prev.filter(c => c.id !== deletingId))
      setShowDeleteModal(false)
      setDeletePassword('')
      setDeleteError('')
      setDeletingId(null)
      if (selectedConsultation?.id === deletingId) {
        setSelectedConsultation(null)
      }
    } else {
      setDeleteError(error?.message || '삭제 실패')
    }
  }

  const handleEditClick = () => {
    setIsEditMode(true)
    setEditData({
      admin_notes: selectedConsultation.admin_notes || ''
    })
  }

  const handleEditCancel = () => {
    setIsEditMode(false)
    setEditData(null)
  }

  const handleEditSave = async () => {
    const { success, error } = await updateConsultation(selectedConsultation.id, editData)

    if (success) {
      // Update local state
      const updatedConsultation = { ...selectedConsultation, ...editData }
      setConsultations(prev =>
        prev.map(c => (c.id === selectedConsultation.id ? updatedConsultation : c))
      )
      setSelectedConsultation(updatedConsultation)
      setIsEditMode(false)
      setEditData(null)
      alert('저장되었습니다.')
    } else {
      alert('저장 실패: ' + (error?.message || '알 수 없는 오류'))
    }
  }

  // 체크박스 관련 핸들러
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredConsultations.map(c => c.id)
      setSelectedIds(allIds)
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return

    if (!confirm(`선택한 ${selectedIds.length}건의 상담 신청을 삭제하시겠습니까?`)) return

    if (!deletePassword) {
      setDeleteError('비밀번호를 입력하세요.')
      return
    }

    let successCount = 0
    let failCount = 0

    for (const id of selectedIds) {
      const { success } = await deleteConsultation(id, deletePassword)
      if (success) {
        successCount++
      } else {
        failCount++
      }
    }

    // 로컬 상태 업데이트
    setConsultations(prev => prev.filter(c => !selectedIds.includes(c.id)))
    setSelectedIds([])
    setShowBulkActions(false)
    setDeletePassword('')
    setDeleteError('')

    alert(`${successCount}건 삭제 완료${failCount > 0 ? `, ${failCount}건 실패` : ''}`)
  }

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedIds.length === 0) return

    if (!confirm(`선택한 ${selectedIds.length}건의 상태를 '${newStatus}'로 변경하시겠습니까?`)) return

    let successCount = 0
    let failCount = 0

    for (const id of selectedIds) {
      const { success } = await updateConsultationStatus(id, newStatus)
      if (success) {
        successCount++
      } else {
        failCount++
      }
    }

    // 로컬 상태 업데이트
    setConsultations(prev =>
      prev.map(c => selectedIds.includes(c.id) ? { ...c, status: newStatus } : c)
    )

    alert(`${successCount}건 상태 변경 완료${failCount > 0 ? `, ${failCount}건 실패` : ''}`)
    setSelectedIds([])
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'telecom':
        return <Phone className="w-5 h-5" />
      case 'loan':
        return <DollarSign className="w-5 h-5" />
      case 'visa':
        return <FileText className="w-5 h-5" />
      default:
        return <HelpCircle className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'telecom':
        return 'LGU+ 통신'
      case 'loan':
        return '전북은행 대출'
      case 'visa':
        return '비자 상담'
      case 'other':
        return '기타 문의'
      default:
        return type
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'telecom':
        return 'bg-pink-100 text-pink-700 border-pink-200'
      case 'loan':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'visa':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200">
            <Clock className="w-3 h-3" />
            대기중
          </span>
        )
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
            <MailIcon className="w-3 h-3" />
            처리중
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
            <CheckCircle className="w-3 h-3" />
            완료
          </span>
        )
      case 'needs_supplement':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
            <AlertTriangle className="w-3 h-3" />
            보완요청
          </span>
        )
      default:
        return <span className="text-slate-500">{status}</span>
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return ''
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const exportToCSV = () => {
    const headers = ['신청일시', '이름', '국적', '연락처', '이메일', '비자', '상담종류', '상태']
    const rows = filteredConsultations.map(c => [
      formatDate(c.created_at),
      c.form_data?.name || c.name || '-',
      c.form_data?.nationality || c.nationality || '-',
      c.form_data?.phone || c.phone || '-',
      c.form_data?.email || c.email || '-',
      c.form_data?.visa_type || c.visa_type || '-',
      getTypeLabel(c.consultation_type),
      c.status
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `consultations_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const filteredConsultations = consultations.filter(c => {
    const typeMatch = filter === 'all' || c.consultation_type === filter
    const statusMatch = statusFilter === 'all' || c.status === statusFilter
    return typeMatch && statusMatch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nb-pink-600 mx-auto mb-4"></div>
          <p className="text-slate-600">상담 신청 목록을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">상담 신청 관리</h2>
            <p className="text-slate-600 text-sm mt-1">
              총 <span className="font-bold text-nb-pink-600">{consultations.length}</span>건의 상담 신청
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <>
                <button
                  onClick={() => setShowBulkActions(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  선택 삭제 ({selectedIds.length})
                </button>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleBulkStatusChange(e.target.value)
                      e.target.value = ''
                    }
                  }}
                  className="px-4 py-2 border border-slate-300 rounded-lg bg-white font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <option value="">상태 일괄 변경</option>
                  <option value="pending">대기중</option>
                  <option value="processing">처리중</option>
                  <option value="completed">완료</option>
                  <option value="needs_supplement">보완요청</option>
                </select>
              </>
            )}
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              CSV 다운로드
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">상담 종류</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="telecom">LGU+ 통신</option>
              <option value="loan">전북은행 대출</option>
              <option value="visa">비자 상담</option>
              <option value="other">기타 문의</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">처리 상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="pending">대기중</option>
              <option value="processing">처리중</option>
              <option value="completed">완료</option>
              <option value="needs_supplement">보완요청</option>
            </select>
          </div>
        </div>
      </div>

      {/* Consultations List */}
      {filteredConsultations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">상담 신청이 없습니다</h3>
          <p className="text-slate-600">필터를 조정하거나 새로운 신청을 기다려주세요.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredConsultations.length && filteredConsultations.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-nb-pink-600 rounded focus:ring-nb-pink-600"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    신청일시
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    유입 경로
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    고객 정보
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    상담 종류
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredConsultations.map((consultation) => (
                  <motion.tr
                    key={consultation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(consultation.id)}
                        onChange={() => handleSelectOne(consultation.id)}
                        className="w-4 h-4 text-nb-pink-600 rounded focus:ring-nb-pink-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {formatDate(consultation.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                        consultation.referral_source === 'organic' || !consultation.referral_source
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        <LinkIcon className="w-3 h-3" />
                        {getReferralDisplay(consultation.referral_source)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="font-semibold text-slate-900">
                            {consultation.form_data?.name || consultation.name || '-'}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          {consultation.form_data?.nationality || consultation.nationality || '-'} · {consultation.form_data?.phone || consultation.phone || '-'}
                        </div>
                        {(consultation.form_data?.visa_type || consultation.visa_type) && (
                          <div className="text-xs text-slate-500 mt-1">
                            비자: {consultation.form_data?.visa_type || consultation.visa_type}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getTypeColor(consultation.consultation_type)}`}>
                        {getTypeIcon(consultation.consultation_type)}
                        {getTypeLabel(consultation.consultation_type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(consultation.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedConsultation(consultation)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-nb-pink-600 hover:bg-nb-pink-700 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        상세보기
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedConsultation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedConsultation(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-nb-pink-600 to-rose-600 px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {isEditMode ? '상담 신청 수정' : '상담 신청 상세'}
                  </h3>
                  <p className="text-white/90 text-sm mt-1">
                    {formatDate(selectedConsultation.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditMode && (
                    <button
                      onClick={handleEditClick}
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedConsultation(null)
                      setIsEditMode(false)
                      setEditData(null)
                    }}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
                {/* Consultation Type */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">상담 종류</h4>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getTypeColor(selectedConsultation.consultation_type)}`}>
                      {getTypeIcon(selectedConsultation.consultation_type)}
                      {getTypeLabel(selectedConsultation.consultation_type)}
                    </span>
                  </div>
                </div>

                {/* Referral Source */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-green-600" />
                      유입 경로
                    </h4>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedConsultation.referral_source === 'organic' || !selectedConsultation.referral_source
                        ? 'bg-slate-100 text-slate-700 border border-slate-300'
                        : 'bg-green-100 text-green-700 border border-green-300'
                    }`}>
                      {getReferralDisplay(selectedConsultation.referral_source)}
                    </span>
                  </div>
                </div>

                {/* Service-Specific Data */}
                {selectedConsultation.form_data && Object.keys(selectedConsultation.form_data).length > 0 && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-bold text-slate-900 mb-4">상세 정보</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedConsultation.form_data).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-sm text-slate-600 mb-1">{key}</p>
                          <p className="font-semibold text-slate-900">{value || '-'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attached Files */}
                {(() => {
                  // Parse file_urls if it's a string
                  let fileUrls = []
                  console.log('Raw file_urls from Firestore:', selectedConsultation.file_urls)
                  console.log('Type:', typeof selectedConsultation.file_urls)

                  if (selectedConsultation.file_urls) {
                    if (typeof selectedConsultation.file_urls === 'string') {
                      try {
                        fileUrls = JSON.parse(selectedConsultation.file_urls)
                        console.log('Parsed file_urls:', fileUrls)
                      } catch (e) {
                        console.error('Failed to parse file_urls:', e)
                      }
                    } else if (Array.isArray(selectedConsultation.file_urls)) {
                      fileUrls = selectedConsultation.file_urls
                      console.log('file_urls is already array:', fileUrls)
                    }
                  }

                  console.log('Final fileUrls count:', fileUrls.length)

                  const isImageFile = (url) => {
                    return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url)
                  }

                  if (fileUrls.length === 0) return null

                  return (
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        첨부 서류 ({fileUrls.length})
                      </h4>
                      <div className="space-y-3">
                        {fileUrls.map((file, index) => {
                          const isImage = isImageFile(file.url || file.name || '')
                          return (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-4 border border-purple-200 hover:border-purple-300 transition-colors"
                            >
                              {/* Image Preview */}
                              {isImage && (
                                <div className="mb-3">
                                  <img
                                    src={file.url}
                                    alt={file.name || `첨부 이미지 ${index + 1}`}
                                    className="w-full max-h-96 object-contain rounded-lg border border-slate-200"
                                    onError={(e) => {
                                      e.target.style.display = 'none'
                                    }}
                                  />
                                </div>
                              )}

                              {/* File Info and Actions */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-slate-900 truncate">{file.name || '첨부 파일'}</p>
                                    {file.size && (
                                      <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                                    )}
                                  </div>
                                </div>
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  다운로드
                                </a>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })()}

                {/* Status */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4">처리 상태</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {getStatusBadge(selectedConsultation.status)}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        상태 변경
                      </label>
                      <select
                        value={selectedConsultation.status}
                        onChange={(e) => handleStatusChange(selectedConsultation.id, e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                      >
                        <option value="pending">대기중</option>
                        <option value="processing">처리중</option>
                        <option value="completed">완료</option>
                        <option value="needs_supplement">보완요청</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="bg-amber-50 rounded-xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4">관리자 메모</h4>
                  {isEditMode ? (
                    <textarea
                      value={editData.admin_notes}
                      onChange={(e) => setEditData({ ...editData, admin_notes: e.target.value })}
                      rows={4}
                      placeholder="관리자 메모를 입력하세요..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {selectedConsultation.admin_notes || '메모 없음'}
                    </p>
                  )}
                </div>

                {/* Edit Mode Buttons */}
                {isEditMode ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleEditCancel}
                      className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleEditSave}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      저장
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Contact Actions */}
                    <div className="flex gap-3">
                      <a
                        href={`tel:${selectedConsultation.phone}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        전화 걸기
                      </a>
                      {selectedConsultation.email && (
                        <a
                          href={`mailto:${selectedConsultation.email}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          <MailIcon className="w-5 h-5" />
                          이메일 보내기
                        </a>
                      )}
                    </div>

                    {/* Delete Button */}
                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={() => handleDeleteClick(selectedConsultation.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors border-2 border-red-200"
                      >
                        <Trash2 className="w-5 h-5" />
                        상담 신청 삭제
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Password Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">상담 신청 삭제</h3>
                  <p className="text-sm text-slate-600">삭제하려면 비밀번호를 입력하세요</p>
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  관리자 비밀번호
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleDeleteConfirm()
                    }
                  }}
                  placeholder="비밀번호 입력"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  autoFocus
                />
                {deleteError && (
                  <p className="text-red-600 text-sm mt-2">{deleteError}</p>
                )}
              </div>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  <strong>경고:</strong> 이 작업은 취소할 수 없습니다. 상담 신청이 영구적으로 삭제됩니다.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Delete Modal */}
      <AnimatePresence>
        {showBulkActions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBulkActions(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">일괄 삭제</h3>
                  <p className="text-sm text-slate-600">선택한 {selectedIds.length}건을 삭제합니다</p>
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  관리자 비밀번호
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleBulkDelete()
                    }
                  }}
                  placeholder="비밀번호 입력"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  autoFocus
                />
                {deleteError && (
                  <p className="text-red-600 text-sm mt-2">{deleteError}</p>
                )}
              </div>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  <strong>경고:</strong> 이 작업은 취소할 수 없습니다. 선택한 {selectedIds.length}건이 영구적으로 삭제됩니다.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowBulkActions(false)
                    setDeletePassword('')
                    setDeleteError('')
                  }}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ConsultationManager
