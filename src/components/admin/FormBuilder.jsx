import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  GripVertical,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Settings,
  Upload,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { getFormConfig, updateFormConfig } from '../../services/dataService'

const CONSULTATION_TYPES = [
  { id: 'common', label: '공통 필드', description: '모든 상담에 공통으로 입력받는 필드' },
  { id: 'telecom', label: 'LGU+ 통신', description: 'LGU+ 통신 상담 전용 필드' },
  { id: 'loan', label: '전북은행 대출', description: '대출 상담 전용 필드' },
  { id: 'visa', label: '비자 상담', description: '비자 상담 전용 필드' },
  { id: 'other', label: '기타 문의', description: '기타 문의 전용 필드' }
]

const FormBuilder = () => {
  const [formConfig, setFormConfig] = useState({})
  const [activeType, setActiveType] = useState('common')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showFileUploadSettings, setShowFileUploadSettings] = useState(false)

  useEffect(() => {
    loadFormConfig()
  }, [])

  const loadFormConfig = async () => {
    setLoading(true)
    const { data } = await getFormConfig()
    if (data) {
      setFormConfig(data)
    }
    setLoading(false)
  }

  const getCurrentFields = () => {
    return formConfig[activeType]?.fields || []
  }

  const setCurrentFields = (fields) => {
    setFormConfig({
      ...formConfig,
      [activeType]: {
        ...formConfig[activeType],
        fields
      }
    })
  }

  // 파일 업로드 설정 가져오기 (common에서만 관리)
  const getFileUploadSettings = () => {
    return formConfig.common?.fileUploadSettings || {
      title: '',
      description: '',
      limitText: ''
    }
  }

  // 파일 업로드 설정 저장
  const setFileUploadSettings = (settings) => {
    setFormConfig({
      ...formConfig,
      common: {
        ...formConfig.common,
        fileUploadSettings: settings
      }
    })
  }

  const handleFileUploadSettingChange = (key, value) => {
    const currentSettings = getFileUploadSettings()
    setFileUploadSettings({
      ...currentSettings,
      [key]: value
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // 모든 타입의 필드 순서 재정렬
      const updatedConfig = {}
      Object.keys(formConfig).forEach(type => {
        const fields = formConfig[type]?.fields || []
        updatedConfig[type] = {
          ...formConfig[type], // 기존 설정 보존 (fileUploadSettings 등)
          fields: fields.map((field, index) => ({
            ...field,
            order: index + 1
          }))
        }
      })

      const { success } = await updateFormConfig(updatedConfig)

      if (success) {
        alert('폼 설정이 저장되었습니다!')
        setFormConfig(updatedConfig)
      } else {
        alert('저장 실패')
      }
    } catch (error) {
      console.error('Error saving form config:', error)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleAddField = () => {
    const currentFields = getCurrentFields()
    const newField = {
      id: `custom_${Date.now()}`,
      label: '새 필드',
      type: 'text',
      required: false,
      order: currentFields.length + 1
    }
    setCurrentFields([...currentFields, newField])
  }

  const handleRemoveField = (index) => {
    if (confirm('이 필드를 삭제하시겠습니까?')) {
      const currentFields = getCurrentFields()
      setCurrentFields(currentFields.filter((_, i) => i !== index))
    }
  }

  const handleMoveUp = (index) => {
    if (index === 0) return
    const currentFields = getCurrentFields()
    const newFields = [...currentFields]
    ;[newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]]
    setCurrentFields(newFields)
  }

  const handleMoveDown = (index) => {
    const currentFields = getCurrentFields()
    if (index === currentFields.length - 1) return
    const newFields = [...currentFields]
    ;[newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]]
    setCurrentFields(newFields)
  }

  const handleFieldChange = (index, key, value) => {
    const currentFields = getCurrentFields()
    const newFields = [...currentFields]
    newFields[index] = { ...newFields[index], [key]: value }
    setCurrentFields(newFields)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nb-pink-600 mx-auto mb-4"></div>
          <p className="text-slate-600">폼 설정을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const currentFields = getCurrentFields()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-nb-pink-600" />
              상담 신청 폼 설정
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              각 상담 타입별로 다른 입력 필드를 설정할 수 있습니다.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800">
            <strong>안내:</strong> 공통 필드는 모든 상담에 표시되고, 각 상담 타입별 필드는 해당 타입 선택 시에만 추가로 표시됩니다.
          </p>
        </div>

        {/* Type Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CONSULTATION_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeType === type.id
                  ? 'bg-nb-pink-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Type Description */}
        <div className="mt-3">
          <p className="text-sm text-slate-600">
            {CONSULTATION_TYPES.find(t => t.id === activeType)?.description}
          </p>
        </div>
      </div>

      {/* File Upload Settings (공통 설정) */}
      {activeType === 'common' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <button
            onClick={() => setShowFileUploadSettings(!showFileUploadSettings)}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-slate-900">서류 첨부 영역 설정</span>
              <span className="text-sm text-slate-500">(모든 상담에 공통 적용)</span>
            </div>
            {showFileUploadSettings ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showFileUploadSettings && (
            <div className="p-6 space-y-4 border-t border-slate-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>안내:</strong> 비워두면 기본 번역이 사용됩니다. 상담 유형에 맞는 맞춤 가이드를 입력하세요.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  타이틀 (예: 서류 첨부)
                </label>
                <input
                  type="text"
                  value={getFileUploadSettings().title}
                  onChange={(e) => handleFileUploadSettingChange('title', e.target.value)}
                  placeholder="비워두면 기본값: 서류 첨부 (선택)"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  설명 문구 (어떤 서류가 필요한지 안내)
                </label>
                <textarea
                  value={getFileUploadSettings().description}
                  onChange={(e) => handleFileUploadSettingChange('description', e.target.value)}
                  placeholder="비워두면 기본값: 신분증, 재직증명서, 소득증빙 등 서류를 첨부해주세요"
                  rows={2}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  파일 제한 안내 문구
                </label>
                <input
                  type="text"
                  value={getFileUploadSettings().limitText}
                  onChange={(e) => handleFileUploadSettingChange('limitText', e.target.value)}
                  placeholder="비워두면 기본값: 최대 5개 파일, 각 10MB 이하 (JPG, PNG, PDF 등)"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                />
              </div>

              {/* Preview */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-2">미리보기:</p>
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-dashed border-blue-200">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-sm text-slate-700 font-semibold mb-1 whitespace-pre-line">
                      {getFileUploadSettings().description || '신분증, 재직증명서, 소득증빙 등 서류를 첨부해주세요'}
                    </p>
                    <p className="text-xs text-slate-500 whitespace-pre-line">
                      {getFileUploadSettings().limitText || '최대 5개 파일, 각 10MB 이하 (JPG, PNG, PDF 등)'}
                    </p>
                  </div>
                  <div className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg text-center">
                    파일 선택
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form Fields */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            {CONSULTATION_TYPES.find(t => t.id === activeType)?.label} 필드 ({currentFields.length}개)
          </h3>
          <button
            onClick={handleAddField}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            필드 추가
          </button>
        </div>

        <div className="space-y-3">
          {currentFields.map((field, index) => (
            <motion.div
              key={field.id}
              layout
              className="bg-slate-50 rounded-lg p-4 border border-slate-200"
            >
              <div className="flex items-start gap-3">
                {/* Drag Handle */}
                <div className="flex flex-col gap-1 pt-2">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <GripVertical className="w-5 h-5 text-slate-400" />
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === currentFields.length - 1}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Field Settings */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      필드 ID
                    </label>
                    <input
                      type="text"
                      value={field.id}
                      disabled
                      className="w-full px-3 py-2 text-sm bg-slate-200 border border-slate-300 rounded-lg cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      레이블 (표시명)
                    </label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      타입
                    </label>
                    <select
                      value={field.type}
                      onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                    >
                      <option value="text">텍스트</option>
                      <option value="tel">전화번호</option>
                      <option value="email">이메일</option>
                      <option value="number">숫자</option>
                      <option value="select">드롭다운</option>
                      <option value="textarea">긴 텍스트</option>
                      <option value="file">파일 첨부</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                        className="w-4 h-4 text-nb-pink-600 rounded focus:ring-nb-pink-600"
                      />
                      <span className="font-semibold text-slate-700">필수</span>
                    </label>

                    <button
                      onClick={() => handleRemoveField(index)}
                      className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Select Options (only for select type) */}
                {field.type === 'select' && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      드롭다운 옵션 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      value={field.options || ''}
                      onChange={(e) => handleFieldChange(index, 'options', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-nb-pink-600 focus:border-transparent"
                      placeholder="예: 옵션1,옵션2,옵션3"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      각 옵션을 쉼표(,)로 구분해서 입력하세요
                    </p>
                  </div>
                )}
              </div>

              {/* Field Preview */}
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-1">미리보기:</p>
                <div className="bg-white p-3 rounded border border-slate-200">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      placeholder={`${field.label} 입력`}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
                      rows={3}
                    />
                  ) : field.type === 'file' ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
                      <p className="text-sm text-slate-500 text-center">파일 선택 (최대 10MB)</p>
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      disabled
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
                    >
                      <option value="">선택해주세요</option>
                      {(field.options || '').split(',').filter(opt => opt.trim()).map((option, i) => (
                        <option key={i} value={option.trim()}>{option.trim()}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={`${field.label} 입력`}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {currentFields.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">필드가 없습니다. "필드 추가" 버튼을 클릭하세요.</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button (Bottom) */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? '저장 중...' : '폼 설정 저장'}
        </button>
      </div>
    </div>
  )
}

export default FormBuilder
