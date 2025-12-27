/**
 * 관리자 권한 설정 스크립트
 *
 * 사용법:
 * 1. Firebase Console에서 서비스 계정 키를 다운로드하여 firebase-admin-key.json으로 저장
 * 2. 아래 YOUR_USER_UID_HERE를 실제 UID로 변경
 * 3. 터미널에서 실행: node setup-admin.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 여기에 사용자 UID를 입력하세요
const USER_UID = 'HhyjOV047UOWitlcSNlhNA3oGfs2'; // ⬅️ 관리자 UID

// 관리자 권한 설정
admin.auth().setCustomUserClaims(USER_UID, { admin: true })
  .then(() => {
    console.log('✅ 관리자 권한이 성공적으로 설정되었습니다!');
    console.log(`   사용자 UID: ${USER_UID}`);
    console.log('\n이제 로그인 페이지에서 로그인하세요:');
    console.log('https://nbkorea-company-b1tcpwgec-yoosee1219-3402s-projects.vercel.app/admin/login');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  });
