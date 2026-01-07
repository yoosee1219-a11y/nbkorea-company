import { useState, useEffect } from 'react'
import { BarChart3, Users, FileText, TrendingUp, Eye, CheckCircle, Percent, RefreshCw } from 'lucide-react'
import { getInfluencerStats } from '../../services/dataService'

const StatsTab = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    const { data, error } = await getInfluencerStats()
    if (error) {
      console.error('Error loading stats:', error)
    } else {
      setStats(data)
      setLastUpdated(new Date())
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nb-pink-600"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">통계를 불러올 수 없습니다.</p>
        <button
          onClick={loadStats}
          className="mt-4 px-4 py-2 bg-nb-pink-600 text-white rounded-lg hover:bg-nb-pink-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    )
  }

  const { total, byInfluencer } = stats

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">리퍼럴 통계</h2>
            <p className="text-slate-600 text-sm">
              인플루언서별 방문자 및 전환 통계를 확인하세요
            </p>
          </div>
        </div>
        <button
          onClick={loadStats}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          새로고침
        </button>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <p className="text-sm text-slate-500">
          마지막 업데이트: {lastUpdated.toLocaleString('ko-KR')}
        </p>
      )}

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Visits */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-600 mb-1">총 방문자</p>
          <p className="text-3xl font-bold text-slate-900">{total.visits.toLocaleString()}</p>
        </div>

        {/* Total Conversions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-600 mb-1">총 상담 신청</p>
          <p className="text-3xl font-bold text-slate-900">{total.conversions.toLocaleString()}</p>
        </div>

        {/* Overall Conversion Rate */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-600 mb-1">전체 전환율</p>
          <p className="text-3xl font-bold text-slate-900">{total.conversionRate.toFixed(1)}%</p>
        </div>
      </div>

      {/* Influencer Stats Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">인플루언서별 상세 통계</h3>
        </div>

        {byInfluencer.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">아직 통계 데이터가 없습니다.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  인플루언서
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">코드</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                  방문자 수
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                  상담 신청
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                  전환율
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {byInfluencer
                .sort((a, b) => b.conversions - a.conversions) // 전환 수 많은 순으로 정렬
                .map((influencer) => (
                  <tr key={influencer.code} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {influencer.code === 'organic' ? (
                          <div className="p-2 bg-slate-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-slate-600" />
                          </div>
                        ) : (
                          <div className="p-2 bg-nb-pink-100 rounded-lg">
                            <Users className="w-5 h-5 text-nb-pink-600" />
                          </div>
                        )}
                        <span className="font-semibold text-slate-900">{influencer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                        {influencer.code}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          {influencer.visits.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <CheckCircle className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          {influencer.conversions.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex-1 max-w-[100px]">
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-nb-pink-500 to-rose-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(influencer.conversionRate, 100)}%` }}
                            />
                          </div>
                        </div>
                        <span className="font-semibold text-slate-900 w-12 text-right">
                          {influencer.conversionRate.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {influencer.code !== 'organic' && (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            influencer.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {influencer.is_active ? '활성' : '비활성'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performer */}
        {byInfluencer.length > 0 && (
          <div className="bg-gradient-to-br from-nb-pink-500 to-rose-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">최고 성과 인플루언서</h3>
            </div>
            {(() => {
              const topPerformer = byInfluencer
                .filter((i) => i.code !== 'organic')
                .sort((a, b) => b.conversions - a.conversions)[0]
              return topPerformer ? (
                <div>
                  <p className="text-2xl font-bold mb-2">{topPerformer.name}</p>
                  <p className="text-white/90">
                    {topPerformer.conversions}건의 상담 신청 ({topPerformer.conversionRate.toFixed(1)}
                    % 전환율)
                  </p>
                </div>
              ) : (
                <p className="text-white/90">데이터가 없습니다</p>
              )
            })()}
          </div>
        )}

        {/* Organic Traffic */}
        {byInfluencer.find((i) => i.code === 'organic') && (
          <div className="bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">오가닉 유입</h3>
            </div>
            {(() => {
              const organic = byInfluencer.find((i) => i.code === 'organic')
              return (
                <div>
                  <p className="text-2xl font-bold mb-2">
                    {organic.conversions}건의 상담 신청
                  </p>
                  <p className="text-white/90">
                    {organic.visits}명 방문 ({organic.conversionRate.toFixed(1)}% 전환율)
                  </p>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsTab
