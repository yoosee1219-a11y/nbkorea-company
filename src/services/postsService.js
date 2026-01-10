// 게시판 데이터 서비스 (일자리 + 대학교)
import { db } from '../lib/firebase'
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
  increment
} from 'firebase/firestore'

// ==========================================
// Jobs API
// ==========================================

/**
 * 모든 일자리 정보 조회
 * @param {Object} options - 필터 옵션
 * @param {number} options.limit - 결과 개수 제한
 * @param {Array<string>} options.tags - 태그 필터
 * @param {Array<string>} options.visaTypes - 비자 종류 필터
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getJobs = async (options = {}) => {
  try {
    const jobsRef = collection(db, 'jobs')
    let q = query(jobsRef, orderBy('created_at', 'desc'))

    // 필터 적용
    if (options.tags && options.tags.length > 0) {
      q = query(q, where('tags', 'array-contains-any', options.tags))
    }

    if (options.limit) {
      q = query(q, firestoreLimit(options.limit))
    }

    const querySnapshot = await getDocs(q)

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || null,
      expires_at: doc.data().expires_at?.toDate?.()?.toISOString() || null,
      last_viewed_at: doc.data().last_viewed_at?.toDate?.()?.toISOString() || null
    }))

    console.log(`Loaded ${data.length} jobs`)

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return { data: [], error }
  }
}

/**
 * 일자리 상세 정보 조회
 * @param {string} jobId - 일자리 ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getJobById = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobs', jobId)
    const docSnap = await getDoc(jobRef)

    if (!docSnap.exists()) {
      return { data: null, error: new Error('Job not found') }
    }

    const data = {
      id: docSnap.id,
      ...docSnap.data(),
      created_at: docSnap.data().created_at?.toDate?.()?.toISOString() || null,
      expires_at: docSnap.data().expires_at?.toDate?.()?.toISOString() || null,
      last_viewed_at: docSnap.data().last_viewed_at?.toDate?.()?.toISOString() || null
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching job:', error)
    return { data: null, error }
  }
}

/**
 * 일자리 정보 생성
 * @param {Object} jobData - 일자리 데이터
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createJob = async (jobData) => {
  try {
    const jobsRef = collection(db, 'jobs')
    const docRef = await addDoc(jobsRef, {
      ...jobData,
      source: 'admin',
      views: 0,
      apply_clicks: 0,
      created_at: serverTimestamp(),
      last_viewed_at: null
    })

    return {
      data: { id: docRef.id, ...jobData },
      error: null
    }
  } catch (error) {
    console.error('Error creating job:', error)
    return { data: null, error }
  }
}

/**
 * 일자리 정보 수정
 * @param {string} jobId - 일자리 ID
 * @param {Object} data - 수정할 데이터
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const updateJob = async (jobId, data) => {
  try {
    const jobRef = doc(db, 'jobs', jobId)
    await updateDoc(jobRef, {
      ...data,
      updated_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating job:', error)
    return { success: false, error }
  }
}

/**
 * 일자리 정보 삭제
 * @param {string} jobId - 일자리 ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const deleteJob = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobs', jobId)
    await deleteDoc(jobRef)
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting job:', error)
    return { success: false, error }
  }
}

/**
 * 일자리 조회수 증가
 * @param {string} jobId - 일자리 ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const incrementJobViews = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobs', jobId)
    await updateDoc(jobRef, {
      views: increment(1),
      last_viewed_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error incrementing job views:', error)
    return { success: false, error }
  }
}

/**
 * 일자리 지원 클릭 증가
 * @param {string} jobId - 일자리 ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const incrementJobApplyClicks = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobs', jobId)
    await updateDoc(jobRef, {
      apply_clicks: increment(1)
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error incrementing apply clicks:', error)
    return { success: false, error }
  }
}

// ==========================================
// Universities API
// ==========================================

/**
 * 모든 대학교 정보 조회
 * @param {Object} options - 필터 옵션
 * @param {number} options.limit - 결과 개수 제한
 * @param {Array<string>} options.tags - 태그 필터
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getUniversities = async (options = {}) => {
  try {
    const universitiesRef = collection(db, 'universities')
    let q = query(universitiesRef, orderBy('created_at', 'desc'))

    // 필터 적용
    if (options.tags && options.tags.length > 0) {
      q = query(q, where('tags', 'array-contains-any', options.tags))
    }

    if (options.limit) {
      q = query(q, firestoreLimit(options.limit))
    }

    const querySnapshot = await getDocs(q)

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || null,
      last_viewed_at: doc.data().last_viewed_at?.toDate?.()?.toISOString() || null
    }))

    console.log(`Loaded ${data.length} universities`)

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching universities:', error)
    return { data: [], error }
  }
}

/**
 * 대학교 상세 정보 조회
 * @param {string} universityId - 대학교 ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getUniversityById = async (universityId) => {
  try {
    const universityRef = doc(db, 'universities', universityId)
    const docSnap = await getDoc(universityRef)

    if (!docSnap.exists()) {
      return { data: null, error: new Error('University not found') }
    }

    const data = {
      id: docSnap.id,
      ...docSnap.data(),
      created_at: docSnap.data().created_at?.toDate?.()?.toISOString() || null,
      last_viewed_at: docSnap.data().last_viewed_at?.toDate?.()?.toISOString() || null
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching university:', error)
    return { data: null, error }
  }
}

/**
 * 대학교 정보 생성
 * @param {Object} universityData - 대학교 데이터
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createUniversity = async (universityData) => {
  try {
    const universitiesRef = collection(db, 'universities')
    const docRef = await addDoc(universitiesRef, {
      ...universityData,
      source: 'admin',
      views: 0,
      info_clicks: 0,
      created_at: serverTimestamp(),
      last_viewed_at: null
    })

    return {
      data: { id: docRef.id, ...universityData },
      error: null
    }
  } catch (error) {
    console.error('Error creating university:', error)
    return { data: null, error }
  }
}

/**
 * 대학교 정보 수정
 * @param {string} universityId - 대학교 ID
 * @param {Object} data - 수정할 데이터
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const updateUniversity = async (universityId, data) => {
  try {
    const universityRef = doc(db, 'universities', universityId)
    await updateDoc(universityRef, {
      ...data,
      updated_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating university:', error)
    return { success: false, error }
  }
}

/**
 * 대학교 정보 삭제
 * @param {string} universityId - 대학교 ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const deleteUniversity = async (universityId) => {
  try {
    const universityRef = doc(db, 'universities', universityId)
    await deleteDoc(universityRef)
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting university:', error)
    return { success: false, error }
  }
}

/**
 * 대학교 조회수 증가
 * @param {string} universityId - 대학교 ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const incrementUniversityViews = async (universityId) => {
  try {
    const universityRef = doc(db, 'universities', universityId)
    await updateDoc(universityRef, {
      views: increment(1),
      last_viewed_at: serverTimestamp()
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error incrementing university views:', error)
    return { success: false, error }
  }
}

/**
 * 대학교 정보 클릭 증가
 * @param {string} universityId - 대학교 ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const incrementUniversityInfoClicks = async (universityId) => {
  try {
    const universityRef = doc(db, 'universities', universityId)
    await updateDoc(universityRef, {
      info_clicks: increment(1)
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error incrementing info clicks:', error)
    return { success: false, error }
  }
}

// ==========================================
// Search API
// ==========================================

/**
 * 게시물 검색 (일자리 + 대학교)
 * @param {string} searchTerm - 검색어
 * @param {string} type - 'jobs' | 'universities' | 'all'
 * @returns {Promise<{data: Object, error: Error|null}>}
 */
export const searchPosts = async (searchTerm, type = 'all') => {
  try {
    const results = { jobs: [], universities: [] }

    // Note: Firestore는 전체 텍스트 검색을 지원하지 않으므로
    // 클라이언트 측에서 필터링하거나, Algolia 같은 서비스 사용 권장
    // 여기서는 간단히 모든 데이터를 가져와서 클라이언트에서 필터링

    if (type === 'jobs' || type === 'all') {
      const { data: jobs } = await getJobs()
      results.jobs = jobs || []
    }

    if (type === 'universities' || type === 'all') {
      const { data: universities } = await getUniversities()
      results.universities = universities || []
    }

    // 클라이언트 측 필터링 (간단한 구현)
    const searchLower = searchTerm.toLowerCase()

    results.jobs = results.jobs.filter(job =>
      job.title?.toLowerCase().includes(searchLower) ||
      job.company?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.description?.toLowerCase().includes(searchLower)
    )

    results.universities = results.universities.filter(uni =>
      uni.university_name?.toLowerCase().includes(searchLower) ||
      uni.department?.toLowerCase().includes(searchLower) ||
      uni.requirements?.toLowerCase().includes(searchLower)
    )

    return { data: results, error: null }
  } catch (error) {
    console.error('Error searching posts:', error)
    return { data: { jobs: [], universities: [] }, error }
  }
}
