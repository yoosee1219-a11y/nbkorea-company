import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Loader2, MapPin, DollarSign, ExternalLink, Eye, Building2, GraduationCap, Calendar, BadgeCheck, Phone, Award, Briefcase, FileText, CheckCircle2 } from 'lucide-react'
import { getJobById, getUniversityById, incrementJobViews, incrementUniversityViews, incrementJobApplyClicks, incrementUniversityInfoClicks } from '../services/postsService'
import { useTranslation } from 'react-i18next'
import { HreflangTags, JobPostingSchema, UniversitySchema } from '../components/SEO'

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

  // Generate SEO meta tags with i18n support
  const pageTitle = isJob
    ? `${post.title} - ${post.company} | NB KOREA`
    : `${post.university_name} - ${post.department} | NB KOREA`

  const pageDescription = isJob
    ? t('seo.jobDescription', {
        company: post.company,
        title: post.title,
        location: post.location || t('seo.noLocation'),
        salary: post.salary || t('seo.checkSalary')
      })
    : t('seo.universityDescription', {
        university: post.university_name,
        department: post.department,
        degree: post.degree || '',
        tuition: post.tuition_per_semester || t('seo.contact'),
        scholarship: post.scholarships ? t('seo.scholarshipAvailable') : ''
      })

  const keywords = isJob
    ? t('seo.jobKeywords', {
        title: post.title,
        company: post.company,
        location: post.location || '',
        visaTypes: post.visa_types?.join(', ') || 'E-9'
      })
    : t('seo.universityKeywords', {
        university: post.university_name,
        department: post.department,
        degree: post.degree || ''
      })

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
      <HreflangTags path={`/${isJob ? 'jobs' : 'universities'}/${id}`} />
      {isJob ? <JobPostingSchema job={post} /> : <UniversitySchema university={post} />}
      <section className={`min-h-screen pt-20 pb-16 ${isJob ? 'bg-gradient-to-b from-blue-50/50 to-white' : 'bg-gradient-to-b from-purple-50/50 to-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(isJob ? '/jobs' : '/universities')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors mb-6 ${
            isJob
              ? 'text-blue-600 hover:bg-blue-100'
              : 'text-purple-600 hover:bg-purple-100'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('back')}</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className={`px-6 py-8 sm:px-8 ${isJob ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-purple-600 to-purple-700'}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                {isJob ? (
                  <Briefcase className="w-8 h-8 text-white" />
                ) : (
                  <GraduationCap className="w-8 h-8 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {isJob ? post.title : post.university_name}
                </h1>
                <p className="text-white/90 text-lg">
                  {isJob ? post.company : post.department}
                </p>
              </div>
            </div>

            {/* Views Badge */}
            <div className="flex items-center gap-2 mt-4 text-white/70">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{post.views || 0} views</span>
              {post.created_at && (
                <>
                  <span className="mx-2">·</span>
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Quick Info Cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${isJob ? '3' : '4'} gap-4 mb-8`}>
              {isJob ? (
                <>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{t('jobs.company')}</p>
                      <p className="font-semibold text-slate-900">{post.company}</p>
                    </div>
                  </div>
                  {post.location && (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{t('jobs.location')}</p>
                        <p className="font-semibold text-slate-900">{post.location}</p>
                      </div>
                    </div>
                  )}
                  {post.salary && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{t('jobs.salary')}</p>
                        <p className="font-semibold text-green-700">{post.salary}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{t('universities.department')}</p>
                      <p className="font-semibold text-slate-900">{post.department}</p>
                    </div>
                  </div>
                  {post.degree && (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{t('universities.degree')}</p>
                        <p className="font-semibold text-slate-900">{post.degree}</p>
                      </div>
                    </div>
                  )}
                  {post.tuition_per_semester && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{t('universities.tuition')}</p>
                        <p className="font-semibold text-amber-700">{post.tuition_per_semester}</p>
                      </div>
                    </div>
                  )}
                  {post.admission_period && (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{t('universities.admissionPeriod')}</p>
                        <p className="font-semibold text-slate-900">{post.admission_period}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Visa Types (Jobs) */}
            {isJob && post.visa_types && post.visa_types.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-blue-50 rounded-xl">
                <span className="text-sm font-medium text-blue-700">{t('jobs.visaTypes')}:</span>
                {post.visa_types.map((visa, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full"
                  >
                    <BadgeCheck className="w-4 h-4" />
                    {visa}
                  </span>
                ))}
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      isJob
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-purple-50 text-purple-700'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description Section */}
            <div className="mb-8">
              <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${isJob ? 'border-blue-200' : 'border-purple-200'}`}>
                <FileText className={`w-5 h-5 ${isJob ? 'text-blue-600' : 'text-purple-600'}`} />
                <h2 className="text-xl font-bold text-slate-900">
                  {isJob ? t('jobs.description') : t('overview')}
                </h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {isJob ? post.description : post.requirements}
                </p>
              </div>
            </div>

            {/* Requirements (Jobs only) */}
            {isJob && post.requirements && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-blue-200">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">
                    {t('jobs.requirements')}
                  </h2>
                </div>
                <div className="prose max-w-none">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{post.requirements}</p>
                </div>
              </div>
            )}

            {/* Scholarships (Universities only) */}
            {!isJob && post.scholarships && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-green-300">
                  <Award className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-bold text-slate-900">
                    {t('universities.scholarships')}
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="space-y-3">
                    {parseScholarships(post.scholarships).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-white rounded-lg p-4 border border-green-100 shadow-sm"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-green-800 whitespace-pre-wrap flex-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info (Universities only) */}
            {!isJob && post.contact_info && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mb-8">
                <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t('universities.contact')}</p>
                  <p className="font-medium text-slate-900">{post.contact_info}</p>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {(isJob ? post.apply_url : post.info_url) && (
              <button
                onClick={() => handleLinkClick(isJob ? post.apply_url : post.info_url)}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isJob
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                }`}
              >
                <span className="text-lg">{isJob ? t('apply_now') : t('learn_more')}</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default PostDetail
