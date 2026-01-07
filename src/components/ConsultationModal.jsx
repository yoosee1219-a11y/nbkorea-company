import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, DollarSign, FileText, HelpCircle, Check, Loader2, Upload, File as FileIcon, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { createConsultation, uploadConsultationFile, getFormConfig } from '../services/dataService'

const ConsultationModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation('consultation')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [formConfig, setFormConfig] = useState(null)
  const [dynamicFormData, setDynamicFormData] = useState({})

  // Load form configuration when modal opens
  useEffect(() => {
    if (isOpen) {
      loadFormConfiguration()
    }
  }, [isOpen])

  const loadFormConfiguration = async () => {
    const { data } = await getFormConfig()
    if (data) {
      setFormConfig(data)
    }
  }

  const [formData, setFormData] = useState({
    consultation_type: '',
    privacy_consent: false
  })

  const [errors, setErrors] = useState({})

  const consultationTypes = [
    { id: 'telecom', label: t('typeTelecom'), icon: Phone, color: 'from-nb-pink-500 to-rose-600' },
    { id: 'loan', label: t('typeLoan'), icon: DollarSign, color: 'from-blue-500 to-indigo-600' },
    { id: 'visa', label: t('typeVisa'), icon: FileText, color: 'from-purple-500 to-pink-600' },
    { id: 'other', label: t('typeOther'), icon: HelpCircle, color: 'from-slate-500 to-slate-700' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleDynamicFieldChange = (fieldId, value) => {
    setDynamicFormData(prev => ({ ...prev, [fieldId]: value }))
    // Clear error when user types
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }))
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)

    // 최대 5개 파일 제한
    if (selectedFiles.length + files.length > 5) {
      alert(t('fileMaxError'))
      return
    }

    // 각 파일 크기 검증 (10MB)
    const invalidFiles = files.filter(file => file.size > 10 * 1024 * 1024)
    if (invalidFiles.length > 0) {
      alert(t('fileSizeError'))
      return
    }

    setSelectedFiles(prev => [...prev, ...files])
  }

  const handleFileRemove = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  // Dynamic field renderer
  const renderDynamicField = (field) => {
    const value = dynamicFormData[field.id] || ''

    // Translate field label using field ID as key
    const fieldLabelKey = `field${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`
    const fieldLabel = t(fieldLabelKey, { defaultValue: field.label })

    return (
      <div key={field.id}>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {fieldLabel} {field.required && <span className="text-red-600">*</span>}
        </label>

        {field.type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
            rows={4}
            placeholder={t('fieldPlaceholder', { field: fieldLabel })}
          />
        ) : field.type === 'file' ? (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-semibold mb-1">
                  {t('fileSelectButton')}
                </p>
                <p className="text-xs text-slate-500">
                  {t('fileUploadMaxSize')}
                </p>
              </div>
            </label>
          </div>
        ) : field.type === 'select' ? (
          <select
            value={value}
            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
          >
            <option value="">{t('selectPlaceholder')}</option>
            {(field.options || '').split(',').filter(opt => opt.trim()).map((option, i) => (
              <option key={i} value={option.trim()}>{option.trim()}</option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
            placeholder={t('fieldPlaceholder', { field: fieldLabel })}
          />
        )}

        {errors[field.id] && (
          <p className="text-red-600 text-sm mt-1">{errors[field.id]}</p>
        )}
      </div>
    )
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.consultation_type) newErrors.consultation_type = t('errorSelectType')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    // Helper function to get translated field label
    const getFieldLabel = (field) => {
      const fieldLabelKey = `field${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`
      return t(fieldLabelKey, { defaultValue: field.label })
    }

    // Validate dynamic common fields
    if (formConfig?.common?.fields) {
      formConfig.common.fields.forEach(field => {
        if (field.required) {
          const value = dynamicFormData[field.id]
          if (!value || (typeof value === 'string' && !value.trim())) {
            newErrors[field.id] = t('fieldRequired', { field: getFieldLabel(field) })
          }
        }
      })
    }

    // Validate dynamic type-specific fields
    if (formData.consultation_type && formConfig?.[formData.consultation_type]?.fields) {
      formConfig[formData.consultation_type].fields.forEach(field => {
        if (field.required) {
          const value = dynamicFormData[field.id]
          if (!value || (typeof value === 'string' && !value.trim())) {
            newErrors[field.id] = t('fieldRequired', { field: getFieldLabel(field) })
          }
        }
      })
    }

    // Privacy consent is always required
    if (!formData.privacy_consent) {
      newErrors.privacy_consent = t('privacyConsentError')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep2()) return

    setLoading(true)

    // 유입 경로 가져오기
    const referralSource = localStorage.getItem('referral_source') || 'organic'

    // 인플루언서 이름 가져오기 (Google Sheets용)
    let referralDisplay = referralSource
    if (referralSource !== 'organic') {
      try {
        const { getInfluencerByCode } = await import('../services/dataService')
        const { data: influencer } = await getInfluencerByCode(referralSource)
        if (influencer) {
          referralDisplay = `${referralSource} / ${influencer.name}`
        }
      } catch (error) {
        console.error('Error fetching influencer name:', error)
      }
    }

    // 동적 폼 데이터를 consultation data로 구성
    const consultationData = {
      consultation_type: formData.consultation_type,
      form_data: dynamicFormData, // 모든 동적 필드 데이터
      privacy_consent: formData.privacy_consent,
      referral_source: referralSource, // 유입 경로 추가
      file_urls: [] // 파일 URL들을 저장할 배열
    }

    // 먼저 상담 신청 생성
    const { data, error } = await createConsultation(consultationData)

    if (error) {
      setLoading(false)
      alert(t('submitError'))
      console.error(error)
      return
    }

    // 파일이 있으면 업로드
    const fileUrls = []
    if (selectedFiles.length > 0 && data?.id) {
      for (let i = 0; i < selectedFiles.length; i++) {
        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100))
        const { url, error: uploadError } = await uploadConsultationFile(selectedFiles[i], data.id)
        if (url) {
          fileUrls.push({
            name: selectedFiles[i].name,
            url: url,
            size: selectedFiles[i].size
          })
        } else {
          console.error('File upload error:', uploadError)
        }
      }
    }

    // Google Sheets로 전송
    try {
      const sheetData = {
        referral_source: referralDisplay, // 유입 경로 (코드 / 이름 형식)
        consultation_type: consultationData.consultation_type,
        status: 'pending',
        form_data: JSON.stringify(consultationData.form_data),
        file_urls: fileUrls.length > 0 ? JSON.stringify(fileUrls) : ''
      }

      // Use no-cors mode to avoid CORS preflight issues with Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbxYJPK_s4bhYs80rjGSFt22qeSkS3zYlP8XSx75dQkbaZJ8zgJfy5n63Z3wKlaNTw4ulQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData)
      })

      // no-cors mode doesn't allow reading response, but request is sent
      console.log('Google Sheets request sent (no-cors mode)')
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError)
      // Google Sheets 전송 실패해도 계속 진행
    }

    setLoading(false)

    setSuccess(true)
    setTimeout(() => {
      onClose()
      // Reset form
      setStep(1)
      setSuccess(false)
      setSelectedFiles([])
      setUploadProgress(0)
      setDynamicFormData({})
      setFormData({
        consultation_type: '',
        privacy_consent: false
      })
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-nb-pink-600 to-rose-600 px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{t('modalTitle')}</h2>
              <p className="text-white/90 text-sm mt-1">{t('step', { current: step, total: 2 })}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('successTitle')}</h3>
                <p className="text-slate-600">{t('successMessage')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{t('step1Title')}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {consultationTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleInputChange('consultation_type', type.id)}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              formData.consultation_type === type.id
                                ? 'border-nb-pink-600 bg-nb-pink-50 shadow-lg scale-105'
                                : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-3`}>
                              <type.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-bold text-slate-900">{type.label}</p>
                          </button>
                        ))}
                      </div>
                      {errors.consultation_type && (
                        <p className="text-red-600 text-sm mt-2">{errors.consultation_type}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full px-6 py-3 bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      {t('buttonNext')}
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    {/* 공통 필드 (동적) */}
                    {formConfig?.common?.fields && formConfig.common.fields.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t('step2TitleBasic')}</h3>
                        <div className="space-y-4">
                          {formConfig.common.fields
                            .sort((a, b) => a.order - b.order)
                            .map(field => renderDynamicField(field))}
                        </div>
                      </div>
                    )}

                    {/* 서비스별 필드 (동적) */}
                    {formData.consultation_type &&
                     formConfig?.[formData.consultation_type]?.fields &&
                     formConfig[formData.consultation_type].fields.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          {t('step2TitleService', {
                            service: consultationTypes.find(type => type.id === formData.consultation_type)?.label
                          })}
                        </h3>
                        <div className="space-y-4">
                          {formConfig[formData.consultation_type].fields
                            .sort((a, b) => a.order - b.order)
                            .map(field => renderDynamicField(field))}
                        </div>
                      </div>
                    )}

                    {/* File Upload */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{t('fileUploadTitle')}</h3>
                      <div className="bg-blue-50 rounded-xl p-6 border-2 border-dashed border-blue-200">
                        <div className="text-center mb-4">
                          <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                          <p className="text-sm text-slate-700 font-semibold mb-1">
                            {t('fileUploadDesc')}
                          </p>
                          <p className="text-xs text-slate-500">
                            {t('fileUploadLimit')}
                          </p>
                        </div>

                        <label className="block">
                          <input
                            type="file"
                            multiple
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <div className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center cursor-pointer transition-colors">
                            {t('fileSelectButton')}
                          </div>
                        </label>

                        {/* Selected Files List */}
                        {selectedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {selectedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <FileIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-slate-900 truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleFileRemove(index)}
                                  className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Privacy Consent */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacy_consent}
                          onChange={(e) => handleInputChange('privacy_consent', e.target.checked)}
                          className="w-5 h-5 text-nb-pink-600 rounded mt-0.5"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">
                            <span className="font-bold text-red-600">*</span> {t('privacyConsentLabel')}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {t('privacyConsentDesc')}
                          </p>
                        </div>
                      </label>
                      {errors.privacy_consent && (
                        <p className="text-red-600 text-sm mt-2">{errors.privacy_consent}</p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300"
                      >
                        {t('buttonPrevious')}
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t('buttonSubmitting')}
                          </>
                        ) : (
                          t('buttonSubmit')
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ConsultationModal
