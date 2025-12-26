# NBKOREA Company Website

회사 소개 페이지 - React + Vite + Tailwind CSS

## 프로젝트 구조

```
src/
├── components/
│   ├── Hero.jsx         # 회사/사업 소개 섹션
│   ├── Partners.jsx     # 제휴 파트너사 섹션
│   └── Blog.jsx         # 블로그 섹션
├── data/                # JSON 데이터 (임시, 백엔드 전환 전까지)
│   ├── partners.json
│   └── blogPosts.json
├── services/
│   └── dataService.js   # 데이터 추상화 레이어 (백엔드 교체 시 여기만 수정)
├── lib/
│   └── supabase.js      # Supabase 클라이언트 (선택사항)
└── App.jsx              # 메인 앱 컴포넌트
```

## 시작하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

현재는 JSON 데이터를 사용하므로 별도의 백엔드 설정이 필요 없습니다!

## 데이터 관리

### 현재: JSON 파일 사용
- `src/data/partners.json` - 파트너사 데이터
- `src/data/blogPosts.json` - 블로그 포스트 데이터

데이터를 수정하려면 해당 JSON 파일을 직접 수정하세요.

### 백엔드로 전환하기

`src/services/dataService.js` 파일에서 `DATA_SOURCE`만 변경하면 됩니다!

#### ✅ Supabase로 전환

1. `src/services/dataService.js`에서 `DATA_SOURCE`를 `'supabase'`로 변경
2. `.env` 파일 생성 및 환경 변수 설정:
   ```bash
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Supabase 테이블 생성:

**partners 테이블**
```sql
create table partners (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

**blog_posts 테이블**
```sql
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  excerpt text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

4. `src/services/dataService.js`에서 Supabase 관련 주석 해제

#### 🔥 Firebase로 전환

1. Firebase SDK 설치: `npm install firebase`
2. `src/services/dataService.js`에서 `DATA_SOURCE`를 `'firebase'`로 변경
3. Firebase 설정 파일 생성 및 Firebase 코드 구현

#### 🍃 MongoDB로 전환

1. MongoDB SDK 설치
2. `src/services/dataService.js`에서 `DATA_SOURCE`를 `'mongodb'`로 변경
3. MongoDB 연결 코드 구현

**중요:** 컴포넌트는 수정할 필요 없음! `dataService.js`만 수정하면 됩니다.

## 빌드 및 배포

### Vercel 배포
```bash
vercel
```

환경 변수는 Vercel 대시보드에서 설정 가능합니다.

## 기술 스택
- React 19
- Vite 7
- Tailwind CSS 4
- JSON (현재) / Supabase / Firebase / MongoDB (선택 가능)
- Vercel (배포)

## 라이브 사이트
https://nbkorea-company-le8tp0m31-yoosee1219-3402s-projects.vercel.app
