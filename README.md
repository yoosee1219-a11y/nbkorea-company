# NBKOREA Company Website

회사 소개 페이지 - React + Vite + Tailwind CSS + Supabase

## 프로젝트 구조

```
src/
├── components/
│   ├── Hero.jsx       # 회사/사업 소개 섹션
│   ├── Partners.jsx   # 제휴 파트너사 섹션
│   └── Blog.jsx       # 블로그 섹션
├── lib/
│   └── supabase.js    # Supabase 클라이언트 설정
└── App.jsx            # 메인 앱 컴포넌트
```

## 시작하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 Supabase 정보를 입력하세요.

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Supabase 테이블 설정

#### partners 테이블
```sql
create table partners (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

#### blog_posts 테이블
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

### 4. 개발 서버 실행
```bash
npm run dev
```

## 빌드 및 배포

### Vercel 배포
1. Vercel CLI 설치: `npm i -g vercel`
2. 배포: `vercel`
3. 환경 변수는 Vercel 대시보드에서 설정

## 기술 스택
- React 19
- Vite 7
- Tailwind CSS 4
- Supabase
- Vercel (배포)
