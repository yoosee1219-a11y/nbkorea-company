// 브라우저 콘솔에서 실행할 마이그레이션 스크립트
//
// 사용 방법:
// 1. https://info-nbkorea.com/admin/login 접속 후 로그인
// 2. F12 눌러서 개발자 도구 열기
// 3. Console 탭에서 이 파일의 내용을 복사해서 붙여넣고 Enter

(async function migrate() {
  console.log('🔄 마이그레이션 시작...')

  const { collection, getDocs, updateDoc, doc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js')
  const { db } = await import('./src/lib/firebase.js')

  // 파트너 마이그레이션
  console.log('\n📦 파트너 마이그레이션...')
  const partnersRef = collection(db, 'partners')
  const partnersSnapshot = await getDocs(partnersRef)

  let partnersUpdated = 0
  for (const docSnap of partnersSnapshot.docs) {
    const data = docSnap.data()
    if (!data.site_origin) {
      await updateDoc(doc(db, 'partners', docSnap.id), { site_origin: 'ko' })
      console.log(`✅ ${data.name} -> site_origin: ko`)
      partnersUpdated++
    }
  }
  console.log(`파트너 ${partnersUpdated}개 업데이트 완료`)

  // 블로그 포스트 마이그레이션
  console.log('\n📝 블로그 포스트 마이그레이션...')
  const postsRef = collection(db, 'blog_posts')
  const postsSnapshot = await getDocs(postsRef)

  let postsUpdated = 0
  for (const docSnap of postsSnapshot.docs) {
    const data = docSnap.data()
    if (!data.site_origin) {
      await updateDoc(doc(db, 'blog_posts', docSnap.id), { site_origin: 'ko' })
      console.log(`✅ ${data.title} -> site_origin: ko`)
      postsUpdated++
    }
  }
  console.log(`블로그 포스트 ${postsUpdated}개 업데이트 완료`)

  console.log('\n✨ 마이그레이션 완료!')
})()
