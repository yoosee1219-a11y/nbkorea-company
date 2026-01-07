// 기존 파트너와 블로그 포스트에 site_origin 필드 추가
// 실행 방법: node migrate-existing-data.js

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA85rDp_mcvIeTr5Zo4XXwvTRHezZsfgyk",
  authDomain: "nbkorea-company.firebaseapp.com",
  projectId: "nbkorea-company",
  storageBucket: "nbkorea-company.firebasestorage.app",
  messagingSenderId: "838432217163",
  appId: "1:838432217163:web:7e2d2f03e3b7db1f0a1f4b"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function migratePartners() {
  console.log('🔄 파트너 마이그레이션 시작...')

  const partnersRef = collection(db, 'partners')
  const snapshot = await getDocs(partnersRef)

  let updated = 0
  let skipped = 0

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()

    // site_origin이 없는 경우에만 업데이트
    if (!data.site_origin) {
      await updateDoc(doc(db, 'partners', docSnap.id), {
        site_origin: 'ko'
      })
      console.log(`✅ 파트너 업데이트: ${data.name} -> site_origin: ko`)
      updated++
    } else {
      console.log(`⏭️  건너뜀: ${data.name} (이미 site_origin 있음: ${data.site_origin})`)
      skipped++
    }
  }

  console.log(`\n파트너 마이그레이션 완료: ${updated}개 업데이트, ${skipped}개 건너뜀\n`)
}

async function migrateBlogPosts() {
  console.log('🔄 블로그 포스트 마이그레이션 시작...')

  const postsRef = collection(db, 'blog_posts')
  const snapshot = await getDocs(postsRef)

  let updated = 0
  let skipped = 0

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()

    // site_origin이 없는 경우에만 업데이트
    if (!data.site_origin) {
      await updateDoc(doc(db, 'blog_posts', docSnap.id), {
        site_origin: 'ko'
      })
      console.log(`✅ 블로그 업데이트: ${data.title} -> site_origin: ko`)
      updated++
    } else {
      console.log(`⏭️  건너뜀: ${data.title} (이미 site_origin 있음: ${data.site_origin})`)
      skipped++
    }
  }

  console.log(`\n블로그 포스트 마이그레이션 완료: ${updated}개 업데이트, ${skipped}개 건너뜀\n`)
}

async function migrate() {
  try {
    await migratePartners()
    await migrateBlogPosts()
    console.log('✨ 모든 마이그레이션 완료!')
    process.exit(0)
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error)
    process.exit(1)
  }
}

migrate()
