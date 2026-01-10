// 분석 추적 훅
import { useEffect } from 'react'

/**
 * 페이지 조회 추적 훅
 * @param {Function} trackFunction - 추적 함수 (예: incrementJobViews)
 * @param {string} id - 게시물 ID
 */
export const useAnalytics = (trackFunction, id) => {
  useEffect(() => {
    if (!trackFunction || !id) return

    // Track view
    trackFunction(id).catch(error => {
      console.error('Analytics tracking error:', error)
    })
  }, [trackFunction, id])
}

export default useAnalytics
