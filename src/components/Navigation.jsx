const Navigation = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">NBKOREA</h1>

          <div className="flex gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              회사소개
            </button>
            <button
              onClick={() => scrollToSection('partners')}
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              제휴 파트너사
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              블로그
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
