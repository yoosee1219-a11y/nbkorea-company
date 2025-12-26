const companyValues = [
  {
    title: "비전",
    description: "글로벌 시장을 선도하는 혁신적인 비즈니스 솔루션 기업",
  },
  {
    title: "미션",
    description: "고객의 성공을 위한 최적화된 솔루션 제공",
  },
  {
    title: "핵심가치",
    description: "혁신, 신뢰, 협력을 통한 지속 가능한 성장",
  },
]

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            NBKOREA
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium">
            혁신적인 비즈니스 솔루션으로
            <br />
            미래를 만들어갑니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {companyValues.map((value, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
              <p className="text-slate-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
