import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Globe, Briefcase } from 'lucide-react'

const companyValues = [
  {
    title: "비전",
    description: "글로벌 시장을 선도하는 혁신적인 비즈니스 솔루션 기업",
    icon: Globe,
  },
  {
    title: "미션",
    description: "고객의 성공을 위한 최적화된 솔루션 제공",
    icon: Briefcase,
  },
  {
    title: "핵심가치",
    description: "혁신, 신뢰, 협력을 통한 지속 가능한 성장",
    icon: GraduationCap,
  },
]

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden pt-20">
      {/* Abstract Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-blue-600/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-indigo-600/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <span className="text-blue-400 font-semibold text-sm tracking-wide uppercase">글로벌 파트너</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-300">
            한국과 세계를 연결하다
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            NBKOREA는 유학 컨설팅, E-9 비자 지원, 글로벌 비즈니스 파트너십을 전문으로 합니다
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/partners">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 flex items-center justify-center gap-2">
                파트너 보기 <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="/blog">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 rounded-xl font-bold text-lg transition-all flex items-center justify-center">
                블로그 보기
              </button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {companyValues.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-10 h-10 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-slate-300 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Hero
