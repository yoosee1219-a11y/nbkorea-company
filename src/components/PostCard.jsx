import { motion } from 'framer-motion'
import { MapPin, DollarSign, Eye, Briefcase, GraduationCap, BadgeCheck, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const PostCard = ({ post, type, index, onClick }) => {
  const isJob = type === 'job'
  const { t } = useTranslation('jobs')

  // Check if university has scholarships
  const hasScholarship = !isJob && post.scholarships

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`relative bg-white border-2 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group ${
        isJob ? 'border-blue-100 hover:border-blue-300' : 'border-purple-100 hover:border-purple-300'
      }`}
    >
      {/* Top Color Bar */}
      <div className={`h-1.5 ${isJob ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'}`} />

      {/* Badge for Scholarship or Visa */}
      {(hasScholarship || (isJob && post.visa_types?.length > 0)) && (
        <div className="absolute top-4 right-4">
          {hasScholarship ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              <BadgeCheck className="w-3.5 h-3.5" />
              {t('universities.scholarships')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {post.visa_types?.[0] || 'VISA'}
            </span>
          )}
        </div>
      )}

      <div className="p-5">
        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
            isJob ? 'bg-blue-50' : 'bg-purple-50'
          }`}>
            {isJob ? (
              <Briefcase className="w-6 h-6 text-blue-600" />
            ) : (
              <GraduationCap className="w-6 h-6 text-purple-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className={`text-lg font-bold text-slate-900 mb-1 line-clamp-2 group-hover:${isJob ? 'text-blue-600' : 'text-purple-600'} transition-colors`}>
              {isJob ? post.title : post.university_name}
            </h3>

            {/* Company or Department */}
            <p className="text-sm text-slate-600 font-medium truncate">
              {isJob ? post.company : post.department}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {isJob ? (
            <>
              {post.location && (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-700 truncate">{post.location}</span>
                </div>
              )}
              {post.salary && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-green-700 font-medium truncate">{post.salary}</span>
                </div>
              )}
            </>
          ) : (
            <>
              {post.degree && (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-700 truncate">{post.degree}</span>
                </div>
              )}
              {post.tuition_per_semester && (
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg">
                  <DollarSign className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-amber-700 font-medium truncate">{post.tuition_per_semester}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-xs rounded-md ${
                  isJob
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-purple-50 text-purple-600'
                }`}
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-slate-400">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer: Views & Date */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {post.views > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{post.views}</span>
              </div>
            )}
            {post.created_at && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <span className={`text-xs font-medium ${isJob ? 'text-blue-600' : 'text-purple-600'}`}>
            {isJob ? t('jobs.apply') : t('universities.moreInfo')} →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard
