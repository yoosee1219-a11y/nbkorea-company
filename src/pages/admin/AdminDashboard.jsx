import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { motion } from 'framer-motion'
import {
  LogOut,
  FileText,
  Users,
  BarChart3,
  PlusCircle,
  List,
  MessageSquare,
  Settings
} from 'lucide-react'
import BlogManager from '../../components/admin/BlogManager'
import PartnerManager from '../../components/admin/PartnerManager'
import ConsultationManager from '../../components/admin/ConsultationManager'
import FormBuilder from '../../components/admin/FormBuilder'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('consultations')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const tabs = [
    { id: 'consultations', label: '상담 신청', icon: MessageSquare },
    { id: 'formBuilder', label: '폼 설정', icon: Settings },
    { id: 'blog', label: '블로그 관리', icon: FileText },
    { id: 'partners', label: '파트너 관리', icon: Users },
    { id: 'stats', label: '통계', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-nb-pink-600 text-white p-2 rounded-lg">
                <BarChart3 size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">NB KOREA Admin</h1>
                <p className="text-xs text-slate-500">관리자 대시보드</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                <p className="text-xs text-slate-500">관리자</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">로그아웃</span>
              </motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-t border-slate-100 py-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-nb-pink-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'consultations' && <ConsultationManager />}
        {activeTab === 'formBuilder' && <FormBuilder />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'partners' && <PartnerManager />}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
            <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">통계 (준비 중)</h3>
            <p className="text-slate-600">통계 기능이 곧 추가됩니다.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
