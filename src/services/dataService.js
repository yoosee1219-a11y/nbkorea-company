// 데이터 소스 설정
// 'json' | 'supabase' | 'firebase' | 'mongodb'
const DATA_SOURCE = 'json'

// JSON 데이터 import
import partnersData from '../data/partners.json'
import blogPostsData from '../data/blogPosts.json'

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
      // JSON 데이터 반환 (Supabase 응답 형식과 동일하게)
      return {
        data: partnersData,
        error: null
      }

    case 'supabase':
      // Supabase로 전환 시 주석 해제
      // const { data, error } = await supabase
      //   .from('partners')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      // return { data, error }
      break

    case 'firebase':
      // Firebase로 전환 시 구현
      // const snapshot = await firebase.collection('partners').get()
      // return { data: snapshot.docs.map(doc => doc.data()), error: null }
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

    case 'supabase':
      // Supabase로 전환 시 주석 해제
      // const { data, error } = await supabase
      //   .from('blog_posts')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      //   .limit(limit)
      // return { data, error }
      break

    case 'firebase':
      // Firebase로 전환 시 구현
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

  1. Supabase로 전환:
     - DATA_SOURCE를 'supabase'로 변경
     - Supabase 관련 주석 해제
     - .env 파일에 Supabase 환경 변수 설정

  2. Firebase로 전환:
     - DATA_SOURCE를 'firebase'로 변경
     - Firebase SDK 설치: npm install firebase
     - Firebase 설정 파일 생성
     - Firebase 관련 코드 구현

  3. MongoDB로 전환:
     - DATA_SOURCE를 'mongodb'로 변경
     - MongoDB SDK 또는 REST API 클라이언트 설치
     - MongoDB 관련 코드 구현

  컴포넌트는 수정할 필요 없음! 이 파일만 수정하면 됩니다.

*/
