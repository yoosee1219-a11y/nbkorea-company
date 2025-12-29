import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Users, Building2 } from 'lucide-react'

const services = [
  {
    title: "유학 컨설팅",
    description: "키르기스스탄 및 해외 유학 전문 컨설팅",
    icon: Globe,
    color: "pink"
  },
  {
    title: "근로자(E7,E9 Visa)",
    description: "근로자 송출 및 비자 전문 서비스",
    icon: Users,
    color: "gold"
  },
  {
    title: "글로벌 파트너십",
    description: "국내외 우수 기관과의 협력 네트워크",
    icon: Building2,
    color: "pink"
  },
]

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white opacity-60" />

      {/* Decorative Elements - Minimal */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-nb-pink-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-nb-gold-100/30 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Logo Display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <div className="relative">
                <img
                  src="/nb-logo.png"
                  alt="NB KOREA"
                  className="h-32 sm:h-40 w-auto"
                />
              </div>
            </motion.div>

            {/* Partnership Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-nb-pink-50 to-nb-gold-50 border-2 border-nb-pink-200 rounded-full">
                <span className="text-sm sm:text-base font-bold text-nb-pink-600">
                  LGU+ x 전북은행 공식 파트너
                </span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                한국과 세계를 연결하다
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                유학(D2,D4 Visa), 근로자(E7,E9) 글로벌 비즈니스 파트너십 전문
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to="/partners">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-nb-pink-600 hover:bg-nb-pink-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-nb-pink-600/20 hover:shadow-nb-pink-600/30 flex items-center gap-2 justify-center min-w-[200px]"
                >
                  파트너 보기
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <a href="#contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-semibold text-lg transition-all border-2 border-slate-200 hover:border-nb-pink-300 shadow-sm flex items-center gap-2 justify-center min-w-[200px]"
                >
                  제휴 문의
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              const isPink = service.color === "pink"

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 shadow-sm hover:shadow-xl ${
                    isPink
                      ? 'border-nb-pink-200 hover:border-nb-pink-400'
                      : 'border-nb-gold-200 hover:border-nb-gold-400'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                      isPink ? 'bg-nb-pink-100' : 'bg-nb-gold-100'
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${
                      isPink ? 'text-nb-pink-600' : 'text-nb-gold-600'
                    }`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
