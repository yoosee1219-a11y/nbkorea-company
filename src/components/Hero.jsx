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
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-nb-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-nb-gold-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-nb-pink-300/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 rounded-full bg-nb-pink-500/10 border border-nb-pink-500/20 backdrop-blur-sm"
          >
            <span className="text-nb-pink-300 font-semibold text-xs sm:text-sm tracking-wide uppercase">글로벌 파트너</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-nb-pink-100 to-nb-gold-200">
              한국과 세계를
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nb-pink-200 via-white to-nb-gold-300">
              연결하다
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            NBKOREA는 유학 컨설팅, E비자 지원, 글로벌 비즈니스 파트너십을 전문으로 합니다
          </p>

          <div className="flex flex-row gap-2 sm:gap-4 justify-center px-4">
            <Link to="/partners" className="flex-1 sm:flex-none">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-nb-pink-600 hover:bg-nb-pink-700 text-white rounded-xl font-bold text-sm sm:text-lg transition-all shadow-lg shadow-nb-pink-600/30 hover:shadow-nb-pink-600/50 flex items-center justify-center gap-2"
              >
                파트너 보기 <ArrowRight size={18} className="hidden sm:inline" />
              </motion.button>
            </Link>
            <Link to="/blog" className="flex-1 sm:flex-none">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-nb-gold-500/20 hover:bg-nb-gold-500/30 backdrop-blur-md text-white border border-nb-gold-500/30 rounded-xl font-bold text-sm sm:text-lg transition-all flex items-center justify-center"
              >
                블로그 보기
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
          {companyValues.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-nb-gold-400 mb-3 sm:mb-4 mx-auto" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Hero
