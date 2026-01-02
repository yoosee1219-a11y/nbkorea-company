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
        const querySnapshot = await getDocs(partnersRef)

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

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
        const q = query(
          postsRef,
          orderBy('created_at', 'desc'),
          firestoreLimit(limit)
        )
        const querySnapshot = await getDocs(q)

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

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
    const q = query(consultationsRef, orderBy('created_at', 'desc'))
    const querySnapshot = await getDocs(q)

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Firestore Timestamp를 ISO string으로 변환
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || null,
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || null
    }))

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
