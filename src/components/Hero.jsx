import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Users, Building2, CheckCircle, Mail, Phone, Zap, Award, TrendingUp } from 'lucide-react'
import ConsultationModal from './ConsultationModal'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Hero Section - Rich Visual Design */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-32 pb-24 overflow-hidden">
        {/* Animated Geometric Shapes */}
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
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-nb-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-3xl blur-2xl rotate-45"
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                {/* Decorative Element */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-1.5 bg-gradient-to-r from-nb-pink-600 to-rose-600 rounded-full mb-8"
                />

                {/* Partnership Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white shadow-lg shadow-nb-pink-600/10 border border-nb-pink-100 mb-8"
                >
                  <div className="relative">
                    <span className="size-3 rounded-full bg-nb-pink-600 animate-ping absolute"></span>
                    <span className="size-3 rounded-full bg-nb-pink-600"></span>
                  </div>
                  <span className="text-slate-800 text-sm font-bold uppercase tracking-wider">
                    🏆 LGU+ x 전북은행 공식 파트너
                  </span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-slate-900 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
                  한국과 세계를<br />
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-nb-pink-600 via-rose-600 to-purple-600">
                      연결하는 파트너
                    </span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute bottom-2 left-0 h-3 bg-nb-pink-200/50 -z-0"
                    />
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  LGU+ 통신 · 전북은행 금융 솔루션
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-nb-pink-600 to-rose-600 hover:from-nb-pink-700 hover:to-rose-700 text-white text-base font-bold rounded-2xl shadow-xl shadow-nb-pink-600/30 transition-all cursor-pointer"
                  >
                    <Mail className="w-5 h-5" />
                    무료 상담 신청
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <Link to="/partners">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 text-base font-bold rounded-2xl border-2 border-slate-200 hover:border-nb-pink-300 shadow-lg transition-all"
                    >
                      파트너사 보기
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Main Image Card */}
                <div className="relative">
                  {/* Decorative Background Elements */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-nb-pink-400/30 to-purple-400/30 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-2xl"
                  />

                  {/* Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200"
                      alt="글로벌 비즈니스"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - 3D Icons */}
      <section className="relative w-full bg-gradient-to-b from-white to-slate-50 py-24 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-nb-pink-50/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-50/50 to-transparent"></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-nb-pink-100 to-rose-100 border border-nb-pink-200 mb-6"
            >
              <span className="text-2xl">✨</span>
              <span className="text-nb-pink-700 text-sm font-bold uppercase tracking-wider">Our Services</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              제공 서비스
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              외국인의 성공적인 한국 정착을 위한 <span className="text-nb-pink-600 font-bold">토탈 솔루션</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Service 1 - 3D Icon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-nb-pink-600 to-rose-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative bg-white p-8 rounded-3xl border-2 border-nb-pink-100 group-hover:border-nb-pink-300 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* 3D Icon - Phone/Signal */}
                <div className="mb-6 relative flex justify-center">
                  <div className="w-24 h-24 relative">
                    {/* Custom 3D-style SVG Icon */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                      {/* Base */}
                      <ellipse cx="50" cy="85" rx="35" ry="8" fill="#e11d48" opacity="0.2"/>
                      {/* Phone Body - Isometric */}
                      <path d="M35 25 L35 75 L65 75 L65 25 Z" fill="url(#phoneGradient)" stroke="#be123c" strokeWidth="2"/>
                      {/* Screen */}
                      <rect x="40" y="32" width="20" height="28" rx="2" fill="#fff" opacity="0.9"/>
                      {/* Signal bars */}
                      <rect x="42" y="50" width="3" height="6" fill="#10b981" rx="1"/>
                      <rect x="47" y="46" width="3" height="10" fill="#10b981" rx="1"/>
                      <rect x="52" y="42" width="3" height="14" fill="#10b981" rx="1"/>
                      {/* Shine effect */}
                      <path d="M38 28 L38 50 L42 50 L42 28 Z" fill="#fff" opacity="0.3"/>
                      <defs>
                        <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ec4899"/>
                          <stop offset="100%" stopColor="#be123c"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  LGU+ 외국인 전용 요금제
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  LGU+ 공식 파트너십을 통한 외국인 맞춤 통신 요금제 제공. 합리적인 가격과 안정적인 네트워크.
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-nb-pink-100 to-rose-100 text-nb-pink-700 text-sm font-bold rounded-xl">
                    ⚡ 직접 제공
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Service 2 - 3D Icon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative bg-white p-8 rounded-3xl border-2 border-blue-100 group-hover:border-blue-300 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* 3D Icon - Bank/Building */}
                <div className="mb-6 relative flex justify-center">
                  <div className="w-24 h-24 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                      {/* Shadow */}
                      <ellipse cx="50" cy="85" rx="35" ry="8" fill="#1d4ed8" opacity="0.2"/>
                      {/* Building - Isometric */}
                      <path d="M50 20 L70 30 L70 75 L30 75 L30 30 Z" fill="url(#buildingGradient)" stroke="#1e40af" strokeWidth="2"/>
                      {/* Roof */}
                      <path d="M50 20 L70 30 L50 35 L30 30 Z" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                      {/* Windows */}
                      <rect x="38" y="40" width="8" height="8" fill="#dbeafe" rx="1"/>
                      <rect x="54" y="40" width="8" height="8" fill="#dbeafe" rx="1"/>
                      <rect x="38" y="52" width="8" height="8" fill="#dbeafe" rx="1"/>
                      <rect x="54" y="52" width="8" height="8" fill="#dbeafe" rx="1"/>
                      {/* Door */}
                      <rect x="43" y="64" width="14" height="11" fill="#1e40af" rx="1"/>
                      {/* Dollar sign */}
                      <text x="50" y="30" fontSize="12" fill="#fbbf24" fontWeight="bold" textAnchor="middle">$</text>
                      <defs>
                        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#60a5fa"/>
                          <stop offset="100%" stopColor="#2563eb"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  1금융권 대출 연계
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  전북은행 협력을 통한 외국인 대출 서비스. 우대금리 적용으로 안정적인 정착 지원.
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-bold rounded-xl">
                    💰 직접 제공
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Service 3 - 3D Icon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative bg-white p-8 rounded-3xl border-2 border-purple-100 group-hover:border-purple-300 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* 3D Icon - People Network */}
                <div className="mb-6 relative flex justify-center">
                  <div className="w-24 h-24 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                      {/* Shadow */}
                      <ellipse cx="50" cy="85" rx="35" ry="8" fill="#a855f7" opacity="0.2"/>
                      {/* Center person */}
                      <circle cx="50" cy="45" r="8" fill="url(#peopleGradient1)"/>
                      <path d="M42 55 L42 70 L58 70 L58 55 Z" fill="url(#peopleGradient1)" stroke="#7c3aed" strokeWidth="2"/>
                      {/* Left person */}
                      <circle cx="28" cy="40" r="6" fill="url(#peopleGradient2)"/>
                      <path d="M22 48 L22 60 L34 60 L34 48 Z" fill="url(#peopleGradient2)" stroke="#9333ea" strokeWidth="1.5"/>
                      {/* Right person */}
                      <circle cx="72" cy="40" r="6" fill="url(#peopleGradient2)"/>
                      <path d="M66 48 L66 60 L78 60 L78 48 Z" fill="url(#peopleGradient2)" stroke="#9333ea" strokeWidth="1.5"/>
                      {/* Connection lines */}
                      <line x1="35" y1="50" x2="43" y2="55" stroke="#a855f7" strokeWidth="2" strokeDasharray="2,2"/>
                      <line x1="65" y1="50" x2="57" y2="55" stroke="#a855f7" strokeWidth="2" strokeDasharray="2,2"/>
                      <defs>
                        <linearGradient id="peopleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#c084fc"/>
                          <stop offset="100%" stopColor="#9333ea"/>
                        </linearGradient>
                        <linearGradient id="peopleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#e9d5ff"/>
                          <stop offset="100%" stopColor="#c084fc"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  파트너 네트워크
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  교육기관 및 근로자 송출업체 간 파트너십 연결. 윈윈 생태계 구축.
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-bold rounded-xl">
                    🤝 파트너 연계
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Colorful Section */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-nb-pink-600/30 to-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-full blur-3xl"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-white text-sm font-bold uppercase tracking-wider">Why Choose Us</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              NB KOREA를 선택해야 하는 이유
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              검증된 파트너십과 실질적인 혜택으로 <span className="text-nb-pink-400 font-bold">완벽한 정착</span>을 지원합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: '검증된 파트너십',
                description: 'LGU+, 전북은행 등 대한민국 주요 기업과의 공식 협력',
                gradient: 'from-nb-pink-500 to-rose-500'
              },
              {
                icon: "💎",
                title: '실질적인 혜택',
                description: '외국인 전용 통신 요금제와 우대금리 대출 지원',
                gradient: 'from-blue-500 to-indigo-500'
              },
              {
                icon: "🚀",
                title: '토탈 케어',
                description: '비자부터 통신·금융까지 원스톱 지원 서비스',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Colorful */}
      <section className="relative w-full bg-gradient-to-r from-nb-pink-600 via-rose-600 to-purple-600 text-white py-20 overflow-hidden">
        {/* Animated Circles */}
        <motion.div
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            >
              한국 정착의 첫 걸음,<br />
              <span className="text-yellow-300">지금 시작하세요! 🎉</span>
            </motion.h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              통신·금융 솔루션부터 비자 파트너 연결까지 <span className="font-bold underline decoration-yellow-300 decoration-4">원스톱 지원</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* For Foreigners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl"
            >
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-black mb-3">외국인 고객</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                LGU+ 요금제 및 대출 서비스 문의
              </p>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-nb-pink-600 to-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                무료 상담 신청
              </motion.button>
            </motion.div>

            {/* For Partners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md text-white p-8 rounded-3xl border-2 border-white/30 shadow-2xl"
            >
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-black mb-3">제휴 파트너</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                파트너십 네트워크 참여 문의
              </p>
              <Link to="/partners">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-nb-pink-600 font-bold py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  파트너사 보기
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Hero
