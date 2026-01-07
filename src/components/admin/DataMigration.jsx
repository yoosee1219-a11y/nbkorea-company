import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const DataMigration = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const runMigration = async () => {
    if (!confirm('기존 파트너와 블로그 포스트에 site_origin 필드를 추가합니다.\n\n이미 site_origin이 있는 데이터는 건너뜁니다.\n계속하시겠습니까?')) {
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const results = {
        partners: { updated: 0, skipped: 0 },
        blogPosts: { updated: 0, skipped: 0 }
      }

      // 파트너 마이그레이션
      console.log('🔄 파트너 마이그레이션 시작...')
      const partnersRef = collection(db, 'partners')
      const partnersSnapshot = await getDocs(partnersRef)

      for (const docSnap of partnersSnapshot.docs) {
        const data = docSnap.data()
        if (!data.site_origin) {
          await updateDoc(doc(db, 'partners', docSnap.id), {
            site_origin: 'ko'
          })
          console.log(`✅ 파트너 업데이트: ${data.name}`)
          results.partners.updated++
        } else {
          results.partners.skipped++
        }
      }

      // 블로그 포스트 마이그레이션
      console.log('🔄 블로그 포스트 마이그레이션 시작...')
      const postsRef = collection(db, 'blog_posts')
      const postsSnapshot = await getDocs(postsRef)

      for (const docSnap of postsSnapshot.docs) {
        const data = docSnap.data()
        if (!data.site_origin) {
          await updateDoc(doc(db, 'blog_posts', docSnap.id), {
            site_origin: 'ko'
          })
          console.log(`✅ 블로그 업데이트: ${data.title}`)
          results.blogPosts.updated++
        } else {
          results.blogPosts.skipped++
        }
      }

      console.log('✨ 마이그레이션 완료!')
      setResult({ success: true, ...results })
    } catch (error) {
      console.error('❌ 마이그레이션 실패:', error)
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">데이터 마이그레이션</h2>
        <p className="text-slate-600">
          기존 파트너와 블로그 포스트에 site_origin 필드를 추가합니다.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">마이그레이션 안내</p>
              <ul className="space-y-1 text-blue-800">
                <li>• 기존 파트너와 블로그 포스트에 <code className="bg-blue-100 px-1 rounded">site_origin: 'ko'</code> 필드를 추가합니다</li>
                <li>• 이미 site_origin이 있는 데이터는 건너뜁니다</li>
                <li>• 한 번만 실행하면 됩니다</li>
              </ul>
            </div>
          </div>

          <button
            onClick={runMigration}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                마이그레이션 진행 중...
              </>
            ) : (
              <>
                <Database className="w-5 h-5" />
                마이그레이션 실행
              </>
            )}
          </button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                result.success
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  {result.success ? (
                    <>
                      <p className="font-semibold text-green-900 mb-2">마이그레이션 완료!</p>
                      <div className="text-sm text-green-800 space-y-1">
                        <p>파트너: {result.partners.updated}개 업데이트, {result.partners.skipped}개 건너뜀</p>
                        <p>블로그 포스트: {result.blogPosts.updated}개 업데이트, {result.blogPosts.skipped}개 건너뜀</p>
                      </div>
                      <p className="text-sm text-green-700 mt-3">
                        이제 페이지를 새로고침하면 파트너와 블로그가 정상적으로 표시됩니다.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-red-900 mb-1">마이그레이션 실패</p>
                      <p className="text-sm text-red-800">{result.error}</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataMigration
