import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Loader2, MapPin, DollarSign, ExternalLink, Eye } from 'lucide-react'
import { getJobById, getUniversityById, incrementJobViews, incrementUniversityViews, incrementJobApplyClicks, incrementUniversityInfoClicks } from '../services/postsService'
import { useTranslation } from 'react-i18next'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('jobs')
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Determine post type from URL
  const isJob = location.pathname.includes('/jobs/')

  // Parse scholarships text into structured items
  const parseScholarships = (text) => {
    if (!text) return []

    // Split by numbered items (1. 2. 3.) or symbols (※, •, -, *)
    const items = text
      .split(/(?=\d+\.\s|※\s|•\s|-\s|\*\s)/)
      .map(item => item.trim())
      .filter(item => item.length > 0)

    return items.length > 1 ? items : [text]
  }

  const fetchPost = useCallback(async () => {
    try {
      const { data, error } = isJob
        ? await getJobById(id)
        : await getUniversityById(id)

      if (error) throw error
      setPost(data)

      // Increment views
      if (data) {
        if (isJob) {
          await incrementJobViews(id)
        } else {
          await incrementUniversityViews(id)
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }, [id, isJob])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const handleLinkClick = async (url) => {
    // Increment click counter
    if (isJob) {
      await incrementJobApplyClicks(id)
    } else {
      await incrementUniversityInfoClicks(id)
    }

    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <section className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-nb-pink-600 animate-spin" />
      </section>
    )
  }

  if (!post) {
    return (
      <section className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">{t('not_found')}</p>
          <button
            onClick={() => navigate(isJob ? '/jobs' : '/universities')}
            className="text-nb-pink-600 hover:underline"
          >
            {t('back')}
          </button>
        </div>
      </section>
    )
  }

  // Generate SEO meta tags
  const pageTitle = isJob
    ? `${post.title} - ${post.company} | NB KOREA`
    : `${post.university_name} - ${post.department} | NB KOREA`

  const pageDescription = isJob
    ? `${post.company}에서 ${post.title} 채용. ${post.location || '위치 정보 없음'}. ${post.salary || '급여 정보 확인'}`
    : `${post.university_name} ${post.department} ${post.degree || ''} 프로그램. 학비: ${post.tuition_per_semester || '문의'}. ${post.scholarships ? '장학금 지원' : ''}`

  const keywords = isJob
    ? `${post.title}, ${post.company}, ${post.location}, 외국인 채용, ${post.visa_types?.join(', ') || 'E-9 비자'}`
    : `${post.university_name}, ${post.department}, ${post.degree}, 외국인 유학생, 장학금`

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://nbkorea.com/${isJob ? 'jobs' : 'universities'}/${id}`} />
        <link rel="canonical" href={`https://nbkorea.com/${isJob ? 'jobs' : 'universities'}/${id}`} />
      </Helmet>
      <section className="min-h-screen pt-20 pb-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(isJob ? '/jobs' : '/universities')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        {/* Content */}
        <div className="bg-white">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            {isJob ? post.title : post.university_name}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-8 text-slate-600">
            {isJob ? (
              <>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{post.company}</span>
                </div>
                {post.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{post.location}</span>
                  </div>
                )}
                {post.salary && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span>{post.salary}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{post.department}</span>
                </div>
                {post.degree && (
                  <div className="flex items-center gap-2">
                    <span>{post.degree}</span>
                  </div>
                )}
                {post.tuition_per_semester && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span>{post.tuition_per_semester}</span>
                  </div>
                )}
              </>
            )}

            {/* Views */}
            <div className="flex items-center gap-2 text-slate-400">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{post.views || 0} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {isJob ? t('jobs.description') : t('overview')}
            </h2>
            <p className="text-slate-700 whitespace-pre-wrap">
              {isJob ? post.description : post.requirements}
            </p>
          </div>

          {/* Requirements (Jobs only) */}
          {isJob && post.requirements && (
            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t('jobs.requirements')}
              </h2>
              <p className="text-slate-700 whitespace-pre-wrap">{post.requirements}</p>
            </div>
          )}

          {/* Scholarships (Universities only) */}
          {!isJob && post.scholarships && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                {t('universities.scholarships')}
              </h3>
              <div className="space-y-3">
                {parseScholarships(post.scholarships).map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-green-100 shadow-sm"
                  >
                    <p className="text-green-800 whitespace-pre-wrap">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button */}
          {(isJob ? post.apply_url : post.info_url) && (
            <button
              onClick={() => handleLinkClick(isJob ? post.apply_url : post.info_url)}
              className="w-full sm:w-auto px-8 py-3 bg-nb-pink-600 text-white rounded-lg hover:bg-nb-pink-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>{isJob ? t('apply_now') : t('learn_more')}</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          )}

          {/* Contact Info (Universities only) */}
          {!isJob && post.contact_info && (
            <div className="mt-8 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">{t('universities.contact')}:</span>
                {post.contact_info}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  )
}

export default PostDetail
