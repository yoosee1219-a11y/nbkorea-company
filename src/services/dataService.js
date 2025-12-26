// 데이터 소스 설정
// 'json' | 'supabase' | 'firebase' | 'mongodb'
const DATA_SOURCE = 'firebase'

// JSON 데이터 import
import partnersData from '../data/partners.json'
import blogPostsData from '../data/blogPosts.json'

// Firebase import
import { db } from '../lib/firebase'
import { collection, getDocs, query, orderBy, limit as firestoreLimit } from 'firebase/firestore'

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
        const q = query(partnersRef, orderBy('created_at', 'desc'))
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
