# NB KOREA Design System

## Overview
이 문서는 NB KOREA 웹사이트의 통합 디자인 시스템을 정의합니다. 일관성 있고 전문적인 사용자 경험을 제공하기 위한 가이드라인입니다.

---

## 1. Color Palette

### Primary Colors
```
nb-pink-600: #e91e63   // Primary brand color (Rose/Pink)
nb-gold-500: #f59e0b   // Secondary brand color (Gold)
```

### Neutral Colors
```
slate-50:  #f8fafc    // Lightest background
slate-100: #f1f5f9    // Light background
slate-200: #e2e8f0    // Border, divider
slate-300: #cbd5e1    // Disabled text
slate-400: #94a3b8    // Secondary text
slate-500: #64748b    // Body text
slate-600: #475569    // Heading text
slate-700: #334155    // Dark heading
slate-800: #1e293b    // Very dark text
slate-900: #0f172a    // Footer, dark sections
```

### Semantic Colors
```
white:     #ffffff    // Card backgrounds, main content
rose-50:   #fff1f2    // Light accent backgrounds
rose-100:  #ffe4e6    // Hover states
rose-600:  #e11d48    // Error, important CTAs
```

### Gradient Combinations
```
Hero Background: linear-gradient(rgba(16, 22, 34, 0.6), rgba(16, 22, 34, 0.8))
Pink-Rose Gradient: from-pink-400 to-rose-600
Slate Background: from-slate-100 to-slate-200
Rose Background: from-rose-50 to-rose-100
```

---

## 2. Typography

### Font Family
```
Primary: system-ui, -apple-system, "Segoe UI", sans-serif
Korean: "Malgun Gothic", "Apple SD Gothic Neo", sans-serif
```

### Font Scale
```
text-xs:   0.75rem  (12px)  // Small labels, captions
text-sm:   0.875rem (14px)  // Body small, secondary text
text-base: 1rem     (16px)  // Body text, paragraphs
text-lg:   1.125rem (18px)  // Large body, sub-headings
text-xl:   1.25rem  (20px)  // Card headings
text-2xl:  1.5rem   (24px)  // Section sub-headings
text-3xl:  1.875rem (30px)  // Section headings
text-4xl:  2.25rem  (36px)  // Page headings (mobile)
text-5xl:  3rem     (48px)  // Page headings (tablet)
text-6xl:  3.75rem  (60px)  // Hero headings (desktop)
text-7xl:  4.5rem   (72px)  // Main hero heading (large)
```

### Font Weights
```
font-normal:  400   // Body text
font-medium:  500   // Emphasized text
font-semibold: 600  // Headings
font-bold:    700   // Important headings
font-black:   900   // Hero headings, CTAs
```

### Line Heights
```
leading-tight:   1.25   // Headings
leading-snug:    1.375  // Sub-headings
leading-normal:  1.5    // Body text
leading-relaxed: 1.625  // Long-form content
leading-loose:   2      // Special spacing
```

---

## 3. Spacing System

### Base Scale (Tailwind Default)
```
0:   0px
1:   0.25rem  (4px)
2:   0.5rem   (8px)
3:   0.75rem  (12px)
4:   1rem     (16px)
6:   1.5rem   (24px)
8:   2rem     (32px)
12:  3rem     (48px)
16:  4rem     (64px)
20:  5rem     (80px)
24:  6rem     (96px)
32:  8rem     (128px)
```

### Component Spacing Standards
```
Card Padding:        p-6 sm:p-8          (24px / 32px)
Section Padding Y:   py-12 sm:py-16      (48px / 64px)
Section Padding X:   px-4 sm:px-6 lg:px-8 (16px / 24px / 32px)
Container Max:       max-w-7xl mx-auto   (1280px centered)
Card Gap:            gap-6 sm:gap-8      (24px / 32px)
```

---

## 4. Component Patterns

### Buttons

#### Primary CTA Button
```jsx
<button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-bold text-sm sm:text-base rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
  버튼 텍스트
  <ArrowRight className="size-5" />
</button>
```

#### Secondary Button
```jsx
<button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 font-semibold text-sm sm:text-base rounded-lg border-2 border-slate-200 hover:border-nb-pink-600 hover:text-nb-pink-600 transition-all duration-300">
  버튼 텍스트
</button>
```

### Cards

#### Standard Card
```jsx
<div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
  {/* Content */}
</div>
```

#### Featured Card
```jsx
<div className="bg-gradient-to-br from-white to-rose-50/30 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-rose-100">
  {/* Content */}
</div>
```

### Badges

#### Status Badge
```jsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
  <span className="size-2 rounded-full bg-nb-pink-500 animate-pulse"></span>
  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
    배지 텍스트
  </span>
</div>
```

### Icons

#### Standard Icon Size
```
size-4:  16px (inline text icons)
size-5:  20px (button icons)
size-6:  24px (card icons)
size-8:  32px (section icons)
size-12: 48px (feature icons)
size-16: 64px (hero icons)
```

---

## 5. Animation Standards

### Transitions
```
Default:        transition-all duration-300
Slow/Smooth:    transition-all duration-500
Hover Scale:    hover:scale-105
Hover Shadow:   hover:shadow-xl
```

### Motion Variants (Framer Motion)
```jsx
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

### Animations
```
animate-pulse:      Pulsing effect for live indicators
animate-bounce:     Attention grabber
animate-spin:       Loading states
```

---

## 6. Layout Patterns

### Section Structure
```jsx
<section className="w-full bg-white py-12 sm:py-16 lg:py-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Section heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
        섹션 제목
      </h2>
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
        섹션 설명
      </p>
    </div>

    {/* Section content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {/* Cards or content */}
    </div>
  </div>
</section>
```

### Grid Patterns
```
1 Column:     grid-cols-1
2 Columns:    grid-cols-1 md:grid-cols-2
3 Columns:    grid-cols-1 md:grid-cols-2 lg:grid-cols-3
4 Columns:    grid-cols-2 md:grid-cols-4
Auto-fit:     grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
```

---

## 7. Responsive Breakpoints

```
sm:   640px   // Small tablets, large phones
md:   768px   // Tablets
lg:   1024px  // Laptops, small desktops
xl:   1280px  // Desktops
2xl:  1536px  // Large desktops
```

### Mobile-First Approach
항상 모바일 디자인을 먼저 작성하고, 브레이크포인트를 추가하여 확장합니다.

```jsx
// Good
<div className="text-sm sm:text-base lg:text-lg">

// Bad
<div className="text-lg sm:text-sm">
```

---

## 8. Accessibility

### Color Contrast
- 일반 텍스트: 최소 4.5:1 대비
- 큰 텍스트 (18px+): 최소 3:1 대비
- UI 요소: 최소 3:1 대비

### Focus States
```
focus:outline-none focus:ring-2 focus:ring-nb-pink-500 focus:ring-offset-2
```

### Alt Text
모든 이미지에 의미 있는 alt 텍스트를 제공합니다.

---

## 9. Image Standards

### Aspect Ratios
```
Partner Logos:    aspect-[3/2]  (300x200px)
Blog Cards:       aspect-video  (16:9)
Hero Background:  Full viewport height
Team Photos:      aspect-square (1:1)
```

### Optimization
- WebP 포맷 우선 사용
- Lazy loading 적용
- 최대 파일 크기: 5MB
- Unsplash 이미지 품질: q=80&w=2000

---

## 10. Best Practices

### DRY Principle
반복되는 스타일은 컴포넌트로 추출합니다.

### Semantic HTML
```jsx
// Good
<header>, <nav>, <main>, <section>, <article>, <footer>

// Bad
<div className="header">, <div className="nav">
```

### Consistent Naming
- 컴포넌트: PascalCase (Hero, Navigation)
- 파일: PascalCase (Hero.jsx, Navigation.jsx)
- 변수: camelCase (isLoading, userData)
- CSS 클래스: kebab-case (Tailwind 기본)

---

## 11. Component Checklist

새 컴포넌트 생성 시 확인사항:
- [ ] 모바일 반응형 디자인 구현
- [ ] 호버 상태 정의
- [ ] 포커스 상태 정의 (접근성)
- [ ] 로딩 상태 처리
- [ ] 에러 상태 처리
- [ ] 애니메이션 적용 (적절한 경우)
- [ ] Alt 텍스트 제공 (이미지)
- [ ] Semantic HTML 사용
- [ ] 색상 대비 확인
- [ ] 디자인 시스템 준수

---

## 12. Resources

### Unsplash Collections
- Business: `photo-1497366216548-37526070297c`
- Global: `photo-1451187580459-43490279c0fa`
- Partnership: `photo-1521737711867-e3b97375f902`
- Success: `photo-1556761175-b413da4baf72`

### Icon Library
Lucide React - https://lucide.dev/

### Color Tools
- Tailwind Color Palette: https://tailwindcss.com/docs/customizing-colors
- Contrast Checker: https://webaim.org/resources/contrastchecker/
