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
  Save
} from 'lucide-react'
import {
  getConsultations,
  deleteConsultation,
  updateConsultationStatus,
  updateConsultation
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

  useEffect(() => {
    fetchConsultations()
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

          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            CSV 다운로드
          </button>
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
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    신청일시
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {formatDate(consultation.created_at)}
                      </div>
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
                {selectedConsultation.file_urls && selectedConsultation.file_urls.length > 0 && (
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      첨부 서류 ({selectedConsultation.file_urls.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedConsultation.file_urls.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white rounded-lg p-3 border border-purple-200 hover:border-purple-300 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-slate-900 truncate">{file.name}</p>
                              {file.size && (
                                <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                              )}
                            </div>
                          </div>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            다운로드
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
    </div>
  )
}

export default ConsultationManager
