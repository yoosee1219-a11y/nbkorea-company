const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          NBKOREA
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
          혁신적인 비즈니스 솔루션으로 미래를 만들어갑니다
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">비전</h3>
            <p className="text-slate-600">
              글로벌 시장을 선도하는 혁신 기업
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">미션</h3>
            <p className="text-slate-600">
              고객 가치 창출을 통한 지속 가능한 성장
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">핵심가치</h3>
            <p className="text-slate-600">
              혁신, 신뢰, 협력
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
