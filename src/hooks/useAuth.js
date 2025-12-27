import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../lib/firebase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Firebase Auth 상태 변화 감지
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ID Token 결과 가져오기 (Custom Claims 포함)
        const tokenResult = await firebaseUser.getIdTokenResult()

        // 관리자 권한 확인
        if (tokenResult.claims.admin) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            admin: true
          })

          // ID Token을 localStorage에 저장
          const token = await firebaseUser.getIdToken()
          localStorage.setItem('admin_token', token)
        } else {
          // 관리자가 아니면 로그아웃
          await signOut(auth)
          setUser(null)
          localStorage.removeItem('admin_token')
          setError('관리자 권한이 필요합니다')
        }
      } else {
        setUser(null)
        localStorage.removeItem('admin_token')
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  /**
   * 로그인
   */
  const login = async (email, password) => {
    try {
      setError(null)
      setLoading(true)

      // Firebase Auth로 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // ID Token 결과 가져오기
      const tokenResult = await userCredential.user.getIdTokenResult()

      // 관리자 권한 확인
      if (!tokenResult.claims.admin) {
        await signOut(auth)
        throw new Error('관리자 권한이 없습니다')
      }

      // ID Token 가져오기
      const token = await userCredential.user.getIdToken()
      localStorage.setItem('admin_token', token)

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        admin: true
      })

      return { success: true }

    } catch (err) {
      console.error('Login error:', err)

      let errorMessage = '로그인 실패'

      if (err.code === 'auth/user-not-found') {
        errorMessage = '사용자를 찾을 수 없습니다'
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = '비밀번호가 틀렸습니다'
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = '이메일 형식이 올바르지 않습니다'
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다'
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
      return { success: false, error: errorMessage }

    } finally {
      setLoading(false)
    }
  }

  /**
   * 로그아웃
   */
  const logout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('admin_token')
      setUser(null)
      setError(null)
    } catch (err) {
      console.error('Logout error:', err)
      setError('로그아웃 실패')
    }
  }

  /**
   * 인증 여부 확인
   */
  const isAuthenticated = () => {
    return user !== null && user.admin === true
  }

  /**
   * 토큰 갱신
   */
  const refreshToken = async () => {
    try {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true) // force refresh
        localStorage.setItem('admin_token', token)
        return token
      }
      return null
    } catch (err) {
      console.error('Token refresh error:', err)
      return null
    }
  }

  /**
   * 현재 토큰 가져오기
   */
  const getToken = async () => {
    try {
      if (auth.currentUser) {
        return await auth.currentUser.getIdToken()
      }
      return localStorage.getItem('admin_token')
    } catch (err) {
      console.error('Get token error:', err)
      return null
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    refreshToken,
    getToken
  }
}
