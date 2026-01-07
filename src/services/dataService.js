// 데이터 소스 설정
// 'json' | 'supabase' | 'firebase' | 'mongodb'
const DATA_SOURCE = 'firebase'

// JSON 데이터 import
import partnersData from '../data/partners.json'
import blogPostsData from '../data/blogPosts.json'

// Firebase import
import { db, storage } from '../lib/firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Supabase 클라이언트 (나중에 사용)
// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// )

// ==========================================
// Partners API
// ==========================================

export const getPartners = async () => {
  switch (DATA_SOURCE) {
    case 'json':
      // JSON 데이터 반환
      return {
        data: partnersData,
        error: null
      }

    case 'firebase':
      try {
        const partnersRef = collection(db, 'partners')

        // 사이트 구분으로 필터링
        const siteOrigin = import.meta.env.VITE_DEFAULT_LANGUAGE || 'ko'
        const q = query(partnersRef, where('site_origin', '==', siteOrigin))
        const querySnapshot = await getDocs(q)

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        console.log(`Loaded ${data.length} partners for site: ${siteOrigin}`)

        return { data, error: null }
      } catch (error) {
        console.error('Firebase error:', error)
        return { data: [], error }
      }

    case 'supabase':
      // Supabase로 전환 시 주석 해제
      // const { data, error } = await supabase
      //   .from('partners')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      // return { data, error }
      break

    case 'mongodb':
      // MongoDB로 전환 시 구현
      break

    default:
      return { data: [], error: new Error('Invalid data source') }
  }
}

// ==========================================
// Blog Posts API
// ==========================================

export const getBlogPosts = async (limit = 6) => {
  switch (DATA_SOURCE) {
    case 'json':
      // JSON 데이터 반환 (최신순 정렬 및 limit 적용)
      const sortedPosts = [...blogPostsData]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, limit)

      return {
        data: sortedPosts,
        error: null
      }

    case 'firebase':
      try {
        const postsRef = collection(db, 'blog_posts')

        // 사이트 구분으로 필터링
        const siteOrigin = import.meta.env.VITE_DEFAULT_LANGUAGE || 'ko'
        const q = query(
          postsRef,
          where('site_origin', '==', siteOrigin),
          orderBy('created_at', 'desc'),
          firestoreLimit(limit)
        )
        const querySnapshot = await getDocs(q)

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        console.log(`Loaded ${data.length} blog posts for site: ${siteOrigin}`)

        return { data, error: null }
      } catch (error) {
        console.error('Firebase error:', error)
        return { data: [], error }
      }

    case 'supabase':
      // Supabase로 전환 시 주석 해제
      // const { data, error } = await supabase
      //   .from('blog_posts')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      //   .limit(limit)
      // return { data, error }
      break

    case 'mongodb':
      // MongoDB로 전환 시 구현
      break

    default:
      return { data: [], error: new Error('Invalid data source') }
  }
}

// ==========================================
// 백엔드 전환 가이드
// ==========================================
/*

  1. Firebase (현재 사용 중):
     - Firestore 컬렉션: partners, blog_posts
     - 자동으로 created_at 필드 기준 정렬

  2. JSON으로 전환:
     - DATA_SOURCE를 'json'으로 변경

  3. Supabase로 전환:
     - DATA_SOURCE를 'supabase'로 변경
     - Supabase 관련 주석 해제
     - .env 파일에 Supabase 환경 변수 설정

  4. MongoDB로 전환:
     - DATA_SOURCE를 'mongodb'로 변경
     - MongoDB SDK 설치
     - MongoDB 관련 코드 구현

  컴포넌트는 수정할 필요 없음! 이 파일만 수정하면 됩니다.

*/

// ==========================================
// Consultations API
// ==========================================

/**
 * 상담 신청 생성
 * @param {Object} consultationData - 상담 신청 데이터
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createConsultation = async (consultationData) => {
  try {
    const consultationsRef = collection(db, 'consultations')
    const docRef = await addDoc(consultationsRef, {
      ...consultationData,
      status: 'pending',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    })

    return {
      data: { id: docRef.id, ...consultationData },
      error: null
    }
  } catch (error) {
    console.error('Error creating consultation:', error)
    return { data: null, error }
  }
}

/**
 * 모든 상담 신청 조회 (관리자용)
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getConsultations = async () => {
  try {
    const consultationsRef = collection(db, 'consultations')

    // 사이트 구분으로 필터링 (환경 변수 기반)
    const siteOrigin = import.meta.env.VITE_DEFAULT_LANGUAGE || 'ko'
    const q = query(
      consultationsRef,
      where('site_origin', '==', siteOrigin),
      orderBy('created_at', 'desc')
    )

    const querySnapshot = await getDocs(q)

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Firestore Timestamp를 ISO string으로 변환
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || null,
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || null
    }))

    console.log(`Loaded ${data.length} consultations for site: ${siteOrigin}`)

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching consultations:', error)
    return { data: [], error }
  }
}

/**
 * 파일을 Firebase Storage에 업로드
 * @param {File} file - 업로드할 파일
 * @param {string} consultationId - 상담 신청 ID
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export const uploadConsultationFile = async (file, consultationId) => {
  try {
    // 파일 크기 검증 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('파일 크기는 10MB를 초과할 수 없습니다.')
    }

    // 파일 확장자 추출
    const fileExtension = file.name.split('.').pop()
    const timestamp = Date.now()
    const fileName = `${timestamp}_${Math.random().toString(36).substring(7)}.${fileExtension}`

    // Storage 경로: consultations/{consultationId}/{fileName}
    const storageRef = ref(storage, `consultations/${consultationId}/${fileName}`)

    // 파일 업로드
    await uploadBytes(storageRef, file)

    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(storageRef)

    return { url: downloadURL, error: null }
  } catch (error) {
    console.error('Error uploading file:', error)
    return { url: null, error }
  }
}

/**
 * 상담 신청에 파일 URL 업데이트
 * @param {string} consultationId - 상담 신청 ID
 * @param {Array} fileUrls - 파일 URL 배열
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const updateConsultationFiles = async (consultationId, fileUrls) => {
  try {
    const consultationRef = doc(db, 'consultations', consultationId)
    await updateDoc(consultationRef, {
      file_urls: fileUrls,
      updated_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating consultation files:', error)
    return { success: false, error }
  }
}

/**
 * 상담 신청 상태 업데이트
 * @param {string} consultationId - 상담 신청 ID
 * @param {string} status - 새로운 상태 (pending, processing, completed, needs_supplement)
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const updateConsultationStatus = async (consultationId, status) => {
  try {
    const consultationRef = doc(db, 'consultations', consultationId)
    await updateDoc(consultationRef, {
      status: status,
      updated_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating consultation status:', error)
    return { success: false, error }
  }
}

/**
 * 상담 신청 전체 정보 업데이트
 * @param {string} consultationId - 상담 신청 ID
 * @param {Object} data - 업데이트할 데이터
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const updateConsultation = async (consultationId, data) => {
  try {
    const consultationRef = doc(db, 'consultations', consultationId)
    await updateDoc(consultationRef, {
      ...data,
      updated_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating consultation:', error)
    return { success: false, error }
  }
}

/**
 * 상담 신청 삭제 (비밀번호 검증 필요)
 * @param {string} consultationId - 상담 신청 ID
 * @param {string} password - 관리자 비밀번호
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const deleteConsultation = async (consultationId, password) => {
  try {
    // 비밀번호 검증
    const ADMIN_DELETE_PASSWORD = 'dpsql03608!'
    if (password !== ADMIN_DELETE_PASSWORD) {
      return { success: false, error: new Error('비밀번호가 올바르지 않습니다.') }
    }

    const consultationRef = doc(db, 'consultations', consultationId)
    await deleteDoc(consultationRef)
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting consultation:', error)
    return { success: false, error }
  }
}

// ==========================================
// Form Configuration API
// ==========================================

/**
 * 폼 설정 가져오기
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getFormConfig = async () => {
  try {
    const formConfigRef = doc(db, 'settings', 'consultation_form')
    const docSnap = await getDoc(formConfigRef)

    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null }
    } else {
      // 기본 설정 반환
      return { data: getDefaultFormConfig(), error: null }
    }
  } catch (error) {
    console.error('Error fetching form config:', error)
    return { data: getDefaultFormConfig(), error }
  }
}

/**
 * 폼 설정 업데이트
 * @param {Object} config - 폼 설정 객체
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const updateFormConfig = async (config) => {
  try {
    const formConfigRef = doc(db, 'settings', 'consultation_form')
    await setDoc(formConfigRef, {
      ...config,
      updated_at: serverTimestamp()
    }, { merge: true })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating form config:', error)
    return { success: false, error }
  }
}

/**
 * 기본 폼 설정 반환
 */
function getDefaultFormConfig() {
  return {
    common: {
      // 모든 타입 공통 필드
      fields: [
        { id: 'name', label: '이름', type: 'text', required: true, order: 1 },
        { id: 'phone', label: '연락처', type: 'tel', required: true, order: 2 },
        { id: 'email', label: '이메일', type: 'email', required: false, order: 3 },
        { id: 'nationality', label: '국적', type: 'text', required: true, order: 4 },
        { id: 'visa_type', label: '비자 종류', type: 'text', required: false, order: 5 }
      ]
    },
    telecom: {
      // LGU+ 통신 전용 필드
      fields: [
        { id: 'current_carrier', label: '현재 통신사', type: 'text', required: false, order: 1 },
        { id: 'desired_plan', label: '희망 요금제', type: 'text', required: false, order: 2 },
        { id: 'phone_model', label: '휴대폰 기종', type: 'text', required: false, order: 3 }
      ]
    },
    loan: {
      // 대출 전용 필드
      fields: [
        { id: 'loan_amount', label: '대출 희망 금액', type: 'text', required: false, order: 1 },
        { id: 'loan_purpose', label: '대출 용도', type: 'text', required: false, order: 2 },
        { id: 'employment_status', label: '재직 상태', type: 'text', required: false, order: 3 },
        { id: 'monthly_income', label: '월 소득', type: 'text', required: false, order: 4 }
      ]
    },
    visa: {
      // 비자 상담 전용 필드
      fields: [
        { id: 'visa_type_detail', label: '비자 종류', type: 'text', required: false, order: 1 },
        { id: 'stay_period', label: '체류 예정 기간', type: 'text', required: false, order: 2 },
        { id: 'visa_purpose', label: '비자 목적', type: 'text', required: false, order: 3 }
      ]
    },
    other: {
      // 기타 문의 전용 필드
      fields: [
        { id: 'inquiry_subject', label: '문의 제목', type: 'text', required: false, order: 1 },
        { id: 'inquiry_detail', label: '문의 내용', type: 'textarea', required: false, order: 2 }
      ]
    }
  }
}

// ==========================================
// Influencer API
// ==========================================

/**
 * 모든 인플루언서 조회
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getInfluencers = async () => {
  try {
    const influencersRef = collection(db, 'influencers')
    const q = query(influencersRef, orderBy('created_at', 'desc'))
    const querySnapshot = await getDocs(q)

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || null,
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || null
    }))

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return { data: [], error }
  }
}

/**
 * 코드로 인플루언서 조회
 * @param {string} code - 인플루언서 코드
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getInfluencerByCode = async (code) => {
  try {
    const influencersRef = collection(db, 'influencers')
    const q = query(influencersRef, where('code', '==', code))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return { data: null, error: null }
    }

    const doc = querySnapshot.docs[0]
    return {
      data: {
        id: doc.id,
        ...doc.data()
      },
      error: null
    }
  } catch (error) {
    console.error('Error fetching influencer by code:', error)
    return { data: null, error }
  }
}

/**
 * 인플루언서 생성
 * @param {Object} influencerData - 인플루언서 데이터 {code, name, description}
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createInfluencer = async (influencerData) => {
  try {
    // 코드 중복 검증
    const influencersRef = collection(db, 'influencers')
    const q = query(influencersRef)
    const querySnapshot = await getDocs(q)

    const existingCodes = querySnapshot.docs.map(doc => doc.data().code)
    if (existingCodes.includes(influencerData.code)) {
      return {
        data: null,
        error: new Error('이미 존재하는 인플루언서 코드입니다.')
      }
    }

    const docRef = await addDoc(influencersRef, {
      ...influencerData,
      is_active: influencerData.is_active !== undefined ? influencerData.is_active : true,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    })

    return {
      data: { id: docRef.id, ...influencerData },
      error: null
    }
  } catch (error) {
    console.error('Error creating influencer:', error)
    return { data: null, error }
  }
}

/**
 * 인플루언서 정보 수정
 * @param {string} influencerId - 인플루언서 ID
 * @param {Object} data - 수정할 데이터
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const updateInfluencer = async (influencerId, data) => {
  try {
    const influencerRef = doc(db, 'influencers', influencerId)
    await updateDoc(influencerRef, {
      ...data,
      updated_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating influencer:', error)
    return { success: false, error }
  }
}

/**
 * 인플루언서 삭제
 * @param {string} influencerId - 인플루언서 ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const deleteInfluencer = async (influencerId) => {
  try {
    const influencerRef = doc(db, 'influencers', influencerId)
    await deleteDoc(influencerRef)
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting influencer:', error)
    return { success: false, error }
  }
}

// ==========================================
// Referral Tracking API
// ==========================================

/**
 * 방문 기록 저장
 * @param {string} influencerCode - 인플루언서 코드 (또는 "organic")
 * @param {string} sessionId - 세션 ID (UUID)
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const recordVisit = async (influencerCode, sessionId) => {
  try {
    const visitsRef = collection(db, 'referral_visits')
    await addDoc(visitsRef, {
      influencer_code: influencerCode,
      session_id: sessionId,
      visited_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error recording visit:', error)
    return { success: false, error }
  }
}

/**
 * 인플루언서별 통계 조회
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getInfluencerStats = async () => {
  try {
    // 1. 모든 인플루언서 조회
    const { data: influencers } = await getInfluencers()

    // 2. 모든 방문 기록 조회
    const visitsRef = collection(db, 'referral_visits')
    const visitsSnapshot = await getDocs(visitsRef)
    const visits = visitsSnapshot.docs.map(doc => doc.data())

    // 3. 모든 상담 신청 조회
    const { data: consultations } = await getConsultations()

    // 4. 인플루언서별 집계
    const stats = {}

    // 오가닉 유입 초기화
    stats['organic'] = {
      code: 'organic',
      name: '오가닉',
      visits: 0,
      conversions: 0,
      conversionRate: 0
    }

    // 각 인플루언서별 초기화
    influencers?.forEach(inf => {
      stats[inf.code] = {
        id: inf.id,
        code: inf.code,
        name: inf.name,
        visits: 0,
        conversions: 0,
        conversionRate: 0,
        is_active: inf.is_active
      }
    })

    // 방문 수 집계
    visits.forEach(visit => {
      const code = visit.influencer_code || 'organic'
      if (stats[code]) {
        stats[code].visits++
      } else {
        // 인플루언서 목록에 없는 코드는 오가닉으로 처리
        stats['organic'].visits++
      }
    })

    // 전환 수 집계
    consultations?.forEach(consultation => {
      const code = consultation.referral_source || 'organic'
      if (stats[code]) {
        stats[code].conversions++
      } else {
        stats['organic'].conversions++
      }
    })

    // 전환율 계산
    Object.keys(stats).forEach(code => {
      const { visits, conversions } = stats[code]
      stats[code].conversionRate = visits > 0 ? (conversions / visits) * 100 : 0
    })

    // 전체 통계 계산
    const totalVisits = Object.values(stats).reduce((sum, s) => sum + s.visits, 0)
    const totalConversions = Object.values(stats).reduce((sum, s) => sum + s.conversions, 0)
    const totalConversionRate = totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0

    return {
      data: {
        total: {
          visits: totalVisits,
          conversions: totalConversions,
          conversionRate: totalConversionRate
        },
        byInfluencer: Object.values(stats)
      },
      error: null
    }
  } catch (error) {
    console.error('Error fetching influencer stats:', error)
    return { data: null, error }
  }
}
