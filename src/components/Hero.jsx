import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Users, Building2, CheckCircle, Rocket, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 22, 34, 0.6), rgba(16, 22, 34, 0.8)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000")`,
          }}
        />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 max-w-[860px] mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex justify-center"
            >
              <img
                src="/nb-logo.png"
                alt="NB KOREA"
                className="h-24 sm:h-32 w-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Partnership Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex mx-auto items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <span className="size-2 rounded-full bg-nb-pink-500 animate-pulse"></span>
              <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                LGU+ x 전북은행 공식 파트너
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight drop-shadow-lg">
              한국과 세계를{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">
                연결하다
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-200 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-[640px] mx-auto opacity-90">
              유학(D2,D4 Visa), 근로자(E7,E9) 글로벌 비즈니스 파트너십 전문
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
              <Link to="/partners">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center rounded-xl h-14 px-8 bg-nb-pink-600 hover:bg-nb-pink-700 text-white text-base font-bold tracking-wide transition-all shadow-xl shadow-nb-pink-600/25 hover:shadow-nb-pink-600/40"
                >
                  파트너 보기
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>
              </Link>
              <a href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center rounded-xl h-14 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-base font-bold tracking-wide transition-all"
                >
                  제휴 문의
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-white dark:bg-slate-900 py-12 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <span className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-nb-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                2015
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                설립년도
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <span className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-nb-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                1000+
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                비자 지원
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <span className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-nb-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                50+
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                글로벌 파트너
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <span className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-nb-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                100%
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                만족도
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full bg-rose-50/50 dark:bg-slate-800 py-20 relative overflow-hidden">
        {/* Pattern Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#e11d48 0.5px, transparent 0.5px), radial-gradient(#e11d48 0.5px, #fff1f2 0.5px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[960px] mx-auto"
          >
            <span className="text-nb-pink-600 font-bold tracking-widest uppercase text-xs mb-4 block">
              Who We Are
            </span>
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-8">
              미래를 향한 <br className="hidden md:block" />
              글로벌 파트너
            </h2>
            <div className="bg-white dark:bg-slate-700 p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-600">
              <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
                2015년 설립된 NB KOREA는 외국인 유학생과 근로자를 위한 최상의 솔루션을 제공합니다.
                우리는{' '}
                <span className="text-nb-pink-600 font-bold">지속 가능한 성장</span>을 믿으며,
                우수한 글로벌 파트너들과 함께 복잡한 비자 문제를 정확하게 해결합니다.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 mb-16 text-center items-center">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
              Our Services
            </span>
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              전문 서비스
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-normal max-w-[600px]">
              각 분야의 전문가들이 최상의 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="flex flex-col gap-6 rounded-2xl border-2 border-nb-pink-300 bg-white dark:bg-slate-800 p-8 shadow-lg hover:shadow-2xl hover:border-nb-pink-500 transition-all duration-300 group"
            >
              <div className="size-14 rounded-2xl bg-nb-pink-100 dark:bg-nb-pink-900 flex items-center justify-center text-nb-pink-600 group-hover:bg-nb-pink-600 group-hover:text-white transition-colors duration-300">
                <Globe className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                  유학 컨설팅
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  키르기스스탄 및 해외 유학 전문 컨설팅. D2, D4 비자 지원부터 입학까지 원스톱 서비스.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="flex flex-col gap-6 rounded-2xl border-2 border-amber-300 bg-white dark:bg-slate-800 p-8 shadow-lg hover:shadow-2xl hover:border-amber-500 transition-all duration-300 group"
            >
              <div className="size-14 rounded-2xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                  근로자(E7,E9 Visa)
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  근로자 송출 및 비자 전문 서비스. E7, E9 비자 취득부터 정착까지 전문 지원.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="flex flex-col gap-6 rounded-2xl border-2 border-nb-pink-300 bg-white dark:bg-slate-800 p-8 shadow-lg hover:shadow-2xl hover:border-nb-pink-500 transition-all duration-300 group"
            >
              <div className="size-14 rounded-2xl bg-nb-pink-100 dark:bg-nb-pink-900 flex items-center justify-center text-nb-pink-600 group-hover:bg-nb-pink-600 group-hover:text-white transition-colors duration-300">
                <Building2 className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                  글로벌 파트너십
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  LGU+, 전북은행 등 국내외 우수 기관과의 협력 네트워크를 통한 최상의 서비스.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full bg-slate-50 dark:bg-slate-800 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="absolute -inset-4 bg-nb-gold-500/20 rounded-2xl rotate-3 blur-md opacity-50 group-hover:rotate-2 transition-all duration-500"></div>
              <div
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10 border-4 border-white dark:border-slate-700 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000")'
                }}
              >
                <div className="absolute inset-0 bg-nb-pink-600/10 mix-blend-overlay"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-nb-pink-100 dark:bg-nb-pink-900 flex items-center justify-center text-nb-pink-600">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold tracking-wider uppercase text-sm text-nb-pink-600">
                    Our Vision
                  </h3>
                </div>
                <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight">
                  글로벌 표준이 되는{' '}
                  <span className="text-nb-pink-600">혁신 기업</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  우리는 기술과 인간의 창의성이 융합하여 가장 중요한 문제를 해결하는 세상을 꿈꿉니다.
                  품질과 혁신의 기준을 설정하는 것이 우리의 목표입니다.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: CheckCircle, text: '지속 가능한 발전 목표' },
                  { icon: Globe, text: '글로벌 기술 리더십' },
                  { icon: Users, text: '커뮤니티 중심 영향력' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-700 border border-nb-pink-100 dark:border-nb-pink-900 hover:border-nb-pink-300 dark:hover:border-nb-pink-700 transition-colors"
                  >
                    <div className="size-10 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center text-nb-pink-600 shadow-sm flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-white dark:bg-slate-900 py-20 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold tracking-wider uppercase text-sm text-amber-600">
                    Our Mission
                  </h3>
                </div>
                <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight">
                  진정성을 통한{' '}
                  <span className="text-amber-600">탁월한 가치 제공</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  고객에게 효과적이고 윤리적인 최첨단 솔루션을 제공하여 역량을 강화하는 것이 우리의 사명입니다.
                  지속적인 개선을 통해 모든 프로젝트가 실질적인 결과를 제공하도록 합니다.
                </p>
              </div>

              <div className="flex flex-col gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-amber-500 shadow-md">
                <p className="italic text-slate-600 dark:text-slate-300 font-medium">
                  "성공은 우리가 무엇을 만드느냐가 아니라, 어떻게 만드느냐에 달려있습니다."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="absolute -inset-4 bg-nb-pink-500/10 rounded-2xl -rotate-3 blur-md opacity-50 group-hover:-rotate-2 transition-all duration-500"></div>
              <div
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10 border-4 border-white dark:border-slate-700 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000")'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-nb-pink-600 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-nb-gold-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[960px]"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm mb-6">
              여정을 시작할 준비가 되셨나요?
            </h2>
            <p className="text-white/90 text-xl max-w-[640px] mx-auto font-medium">
              함께 미래를 만들어갑니다. 지금 바로 문의하여 목표 달성을 위한 방법을 알아보세요.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
            <a href="#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-nb-pink-600 hover:bg-slate-50 font-bold py-4 px-10 rounded-xl shadow-lg transition-colors"
              >
                문의하기
              </motion.button>
            </a>
            <Link to="/partners">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-nb-pink-600 border-2 border-white/40 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-xl transition-colors hover:border-white"
              >
                파트너 보기
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
