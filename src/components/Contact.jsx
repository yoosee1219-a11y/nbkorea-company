import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxYJPK_s4bhYs80rjGSFt22qeSkS3zYlP8XSx75dQkbaZJ8zgJfy5n63Z3wKlaNTw4ulQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
      })

      const result = await response.json()

      if (result.success || response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })

        setTimeout(() => {
          setStatus('idle')
        }, 5000)
      } else {
        throw new Error(result.error || 'Failed to submit')
      }

    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')

      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-nb-pink-50 via-white to-nb-gold-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4"
            >
              제휴 문의
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4"
            >
              NB KOREA와 함께 성장할 파트너를 기다립니다
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-nb-pink-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">연락처 정보</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-nb-pink-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-nb-pink-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">이메일</p>
                      <a href="mailto:contact@nbkorea.com" className="text-nb-pink-600 hover:text-nb-pink-700 transition-colors">
                        contact@nbkorea.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-nb-gold-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-nb-gold-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">전화</p>
                      <a href="tel:+821012345678" className="text-slate-600 hover:text-nb-pink-600 transition-colors">
                        +82 10-1234-5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-nb-pink-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-nb-pink-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">주소</p>
                      <p className="text-slate-600">서울특별시, 대한민국</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-3">영업 시간</h4>
                  <p className="text-slate-600 text-sm">월-금: 09:00 - 18:00</p>
                  <p className="text-slate-600 text-sm">주말 및 공휴일 휴무</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-nb-gold-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">제휴 문의하기</h3>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 text-sm font-medium">문의가 성공적으로 전송되었습니다!</p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800 text-sm font-medium">전송 중 오류가 발생했습니다. 다시 시도해주세요.</p>
                </motion.div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    회사명 / 이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent transition-all"
                    placeholder="회사명 또는 성함을 입력해주세요"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent transition-all"
                    placeholder="010-0000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    문의 내용
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nb-pink-500 focus:border-transparent transition-all resize-none"
                    placeholder="제휴 문의 내용을 자세히 작성해주세요"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-nb-pink-600 hover:bg-nb-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-nb-pink-600/30 hover:shadow-nb-pink-600/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? '전송 중...' : '문의 보내기'} <Send size={20} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
