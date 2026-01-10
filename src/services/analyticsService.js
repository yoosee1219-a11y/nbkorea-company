// 분석 데이터 서비스
import { db } from '../lib/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit
} from 'firebase/firestore'

/**
 * 인기 게시물 조회 (조회수 기준)
 * @param {string} type - 'jobs' | 'universities' | 'all'
 * @param {number} limit - 결과 개수
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getPopularPosts = async (type = 'all', limit = 10) => {
  try {
    const results = { jobs: [], universities: [] }

    if (type === 'jobs' || type === 'all') {
      const jobsRef = collection(db, 'jobs')
      const q = query(
        jobsRef,
        orderBy('views', 'desc'),
        firestoreLimit(limit)
      )
      const snapshot = await getDocs(q)
      results.jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.()?.toISOString() || null
      }))
    }

    if (type === 'universities' || type === 'all') {
      const universitiesRef = collection(db, 'universities')
      const q = query(
        universitiesRef,
        orderBy('views', 'desc'),
        firestoreLimit(limit)
      )
      const snapshot = await getDocs(q)
      results.universities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.()?.toISOString() || null
      }))
    }

    return { data: results, error: null }
  } catch (error) {
    console.error('Error fetching popular posts:', error)
    return { data: { jobs: [], universities: [] }, error }
  }
}

/**
 * 전체 통계 조회
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getOverallStats = async () => {
  try {
    const jobsRef = collection(db, 'jobs')
    const universitiesRef = collection(db, 'universities')

    const [jobsSnapshot, universitiesSnapshot] = await Promise.all([
      getDocs(jobsRef),
      getDocs(universitiesRef)
    ])

    const jobs = jobsSnapshot.docs.map(doc => doc.data())
    const universities = universitiesSnapshot.docs.map(doc => doc.data())

    const stats = {
      totalJobs: jobs.length,
      totalUniversities: universities.length,
      totalViews: {
        jobs: jobs.reduce((sum, job) => sum + (job.views || 0), 0),
        universities: universities.reduce((sum, uni) => sum + (uni.views || 0), 0)
      },
      totalClicks: {
        jobs: jobs.reduce((sum, job) => sum + (job.apply_clicks || 0), 0),
        universities: universities.reduce((sum, uni) => sum + (uni.info_clicks || 0), 0)
      },
      clickThroughRate: {
        jobs: 0,
        universities: 0
      }
    }

    // Calculate CTR
    if (stats.totalViews.jobs > 0) {
      stats.clickThroughRate.jobs = (stats.totalClicks.jobs / stats.totalViews.jobs * 100).toFixed(2)
    }
    if (stats.totalViews.universities > 0) {
      stats.clickThroughRate.universities = (stats.totalClicks.universities / stats.totalViews.universities * 100).toFixed(2)
    }

    return { data: stats, error: null }
  } catch (error) {
    console.error('Error fetching overall stats:', error)
    return { data: null, error }
  }
}

/**
 * 최근 게시물 조회
 * @param {number} days - 최근 며칠
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getRecentPosts = async (days = 7) => {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const jobsRef = collection(db, 'jobs')
    const universitiesRef = collection(db, 'universities')

    const [jobsSnapshot, universitiesSnapshot] = await Promise.all([
      getDocs(query(jobsRef, orderBy('created_at', 'desc'), firestoreLimit(20))),
      getDocs(query(universitiesRef, orderBy('created_at', 'desc'), firestoreLimit(20)))
    ])

    const recentJobs = jobsSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.() || null
      }))
      .filter(job => job.created_at && job.created_at >= cutoffDate)

    const recentUniversities = universitiesSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.() || null
      }))
      .filter(uni => uni.created_at && uni.created_at >= cutoffDate)

    return {
      data: {
        jobs: recentJobs,
        universities: recentUniversities,
        count: {
          jobs: recentJobs.length,
          universities: recentUniversities.length
        }
      },
      error: null
    }
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    return { data: null, error }
  }
}
