import { useState } from 'react'
import { Upload, X, Loader2, CheckCircle } from 'lucide-react'

const ImageUpload = ({ onUploadComplete, currentUrl = '' }) => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(currentUrl)
  const [error, setError] = useState('')

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다')
      return
    }

    // 파일 크기 확인 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      setError('파일 크기는 5MB 이하여야 합니다')
      return
    }

    setError('')
    setUploading(true)
    setProgress(30)

    try {
      // ImgBB API를 사용한 무료 이미지 업로드
      const formData = new FormData()
      formData.append('image', file)

      // ImgBB API Key (무료, 제한: 월 5000개 업로드)
      const API_KEY = '8b6fc7d76331357e4772131a11c283a9'

      setProgress(50)

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: 'POST',
        body: formData
      })

      setProgress(80)

      if (!response.ok) {
        throw new Error('업로드 실패')
      }

      const data = await response.json()

      if (data.success) {
        const downloadURL = data.data.display_url
        setPreviewUrl(downloadURL)
        setProgress(100)

        // 부모 컴포넌트에 URL 전달
        if (onUploadComplete) {
          onUploadComplete(downloadURL)
        }

        setTimeout(() => {
          setUploading(false)
          setProgress(0)
        }, 500)
      } else {
        throw new Error('업로드 실패')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('업로드 중 오류가 발생했습니다. 다시 시도해주세요.')
      setUploading(false)
      setProgress(0)
    }
  }

  const handleRemove = () => {
    setPreviewUrl('')
    setProgress(0)
    if (onUploadComplete) {
      onUploadComplete('')
    }
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {previewUrl && (
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border-2 border-slate-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload Button */}
      {!previewUrl && (
        <div>
          <label
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              uploading
                ? 'border-nb-pink-400 bg-nb-pink-50'
                : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-nb-pink-400'
            }`}
          >
            <div className="flex flex-col items-center justify-center py-6">
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-nb-pink-600 animate-spin mb-2" />
                  <p className="text-sm text-nb-pink-600 font-medium">{progress}% 업로드 중...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-nb-pink-600">클릭하여 업로드</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF (최대 5MB)</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {previewUrl && !uploading && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <p className="text-sm text-green-800">이미지가 업로드되었습니다</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
