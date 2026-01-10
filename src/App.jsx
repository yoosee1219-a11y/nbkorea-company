import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import PartnersPage from './pages/PartnersPage'
import BlogPage from './pages/BlogPage'
import JobsBoard from './pages/JobsBoard'
import UniversitiesBoard from './pages/UniversitiesBoard'
import PostDetail from './pages/PostDetail'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import useReferralTracking from './hooks/useReferralTracking'
import './i18n/config'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  // 리퍼럴 트래킹 (첫 방문 시 한 번만 기록)
  useReferralTracking()

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!isAdminRoute && <Navigation />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/jobs" element={<JobsBoard />} />
          <Route path="/jobs/:id" element={<PostDetail />} />
          <Route path="/universities" element={<UniversitiesBoard />} />
          <Route path="/universities/:id" element={<PostDetail />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  )
}

export default App
