import { useState, useEffect } from 'react'
import { Eye, MousePointerClick, TrendingUp, Briefcase, GraduationCap } from 'lucide-react'
import { getPopularPosts, getOverallStats } from '../../services/analyticsService'

const AnalyticsDashboard = () => {
  const [popularPosts, setPopularPosts] = useState({ jobs: [], universities: [] })
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const [postsResult, statsResult] = await Promise.all([
        getPopularPosts('all', 10),
        getOverallStats()
      ])

      if (postsResult.data) {
        setPopularPosts(postsResult.data)
      }
      if (statsResult.data) {
        setStats(statsResult.data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">로딩 중...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">분석 대시보드</h2>
        <p className="text-slate-600 mt-2">일자리 및 대학교 게시판의 성과를 확인하세요</p>
      </div>

      {/* Overall Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Jobs */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">전체 일자리</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalJobs}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">조회수</span>
                <span className="font-semibold text-slate-900">{stats.totalViews.jobs.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-600">클릭수</span>
                <span className="font-semibold text-slate-900">{stats.totalClicks.jobs.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-600">클릭률</span>
                <span className="font-semibold text-green-600">{stats.clickThroughRate.jobs}%</span>
              </div>
            </div>
          </div>

          {/* Total Universities */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">전체 대학교</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalUniversities}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">조회수</span>
                <span className="font-semibold text-slate-900">{stats.totalViews.universities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-600">클릭수</span>
                <span className="font-semibold text-slate-900">{stats.totalClicks.universities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-600">클릭률</span>
                <span className="font-semibold text-green-600">{stats.clickThroughRate.universities}%</span>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">총 조회수</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {(stats.totalViews.jobs + stats.totalViews.universities).toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>데이터 기반 개선 가능</span>
              </div>
            </div>
          </div>

          {/* Total Clicks */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">총 클릭수</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {(stats.totalClicks.jobs + stats.totalClicks.universities).toLocaleString()}
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <MousePointerClick className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-sm text-slate-600">
                사용자 참여도 측정
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Jobs */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              인기 일자리 Top 10
            </h3>
            <p className="text-sm text-slate-600 mt-1">조회수 기준</p>
          </div>
          <div className="p-4">
            {popularPosts.jobs.length > 0 ? (
              <div className="space-y-3">
                {popularPosts.jobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-lg font-bold text-slate-400 min-w-[2rem]">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{job.title}</h4>
                        <p className="text-sm text-slate-600">{job.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Eye className="w-4 h-4" />
                        <span className="font-semibold">{job.views || 0}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {job.apply_clicks || 0} clicks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-slate-500">데이터가 없습니다</p>
            )}
          </div>
        </div>

        {/* Popular Universities */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              인기 대학교 Top 10
            </h3>
            <p className="text-sm text-slate-600 mt-1">조회수 기준</p>
          </div>
          <div className="p-4">
            {popularPosts.universities.length > 0 ? (
              <div className="space-y-3">
                {popularPosts.universities.map((uni, index) => (
                  <div
                    key={uni.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-lg font-bold text-slate-400 min-w-[2rem]">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{uni.university_name}</h4>
                        <p className="text-sm text-slate-600">{uni.department} • {uni.degree}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Eye className="w-4 h-4" />
                        <span className="font-semibold">{uni.views || 0}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {uni.info_clicks || 0} clicks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-slate-500">데이터가 없습니다</p>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4">📊 인사이트</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-900">💡 어떤 콘텐츠가 효과적인지</p>
            <p className="text-sm text-slate-600 mt-2">
              조회수가 높은 게시물의 패턴을 분석하여 유사한 콘텐츠를 추가하세요.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-900">🎯 클릭률 개선</p>
            <p className="text-sm text-slate-600 mt-2">
              클릭률이 낮은 게시물은 제목이나 설명을 개선하여 사용자 참여를 높이세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
