import { useEffect } from 'react'
import { recordVisit } from '../services/dataService'

/**
 * 리퍼럴 트래킹 훅
 * URL의 ref 파라미터를 감지하고 방문 기록을 저장합니다.
 */
const useReferralTracking = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // 1. URL에서 ref 파라미터 가져오기
        const urlParams = new URLSearchParams(window.location.search)
        const refParam = urlParams.get('ref')

        // 2. localStorage에서 기존 데이터 확인
        const existingRef = localStorage.getItem('referral_source')
        const existingSession = localStorage.getItem('session_id')
        const isTracked = localStorage.getItem('visit_tracked')

        // 3. 세션 ID 생성 또는 기존 것 사용
        let sessionId = existingSession
        if (!sessionId) {
          // UUID v4 생성
          sessionId = crypto.randomUUID()
          localStorage.setItem('session_id', sessionId)
        }

        // 4. 현재 방문의 referral_source 결정
        // ref 파라미터가 있으면 그 값, 없으면 무조건 organic
        const currentReferralSource = refParam || 'organic'

        // 5. localStorage에 현재 referral_source 저장 (상담 신청 시 사용)
        localStorage.setItem('referral_source', currentReferralSource)

        // 6. 첫 방문인 경우에만 방문 기록
        if (!isTracked) {
          // Firestore에 방문 기록 저장
          await recordVisit(currentReferralSource, sessionId)

          // 방문 추적 완료 표시
          localStorage.setItem('visit_tracked', 'true')

          console.log('Visit tracked:', { referralSource: currentReferralSource, sessionId })
        } else {
          console.log('Already tracked, but updated referral source:', currentReferralSource)
        }
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    trackVisit()
  }, []) // 컴포넌트 마운트 시 한 번만 실행
}

export default useReferralTracking
