import { motion } from 'framer-motion'
import { MapPin, DollarSign, Calendar, Eye, Briefcase, GraduationCap } from 'lucide-react'

const PostCard = ({ post, type, index, onClick }) => {
  const isJob = type === 'job'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
        isJob ? 'bg-blue-100' : 'bg-purple-100'
      }`}>
        {isJob ? (
          <Briefcase className={`w-6 h-6 ${isJob ? 'text-blue-600' : 'text-purple-600'}`} />
        ) : (
          <GraduationCap className="w-6 h-6 text-purple-600" />
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
        {isJob ? post.title : post.university_name}
      </h3>

      {/* Company or Department */}
      <p className="text-slate-600 mb-4">
        {isJob ? post.company : post.department}
      </p>

      {/* Details */}
      <div className="space-y-2 text-sm text-slate-500">
        {isJob ? (
          <>
            {post.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{post.location}</span>
              </div>
            )}
            {post.salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{post.salary}</span>
              </div>
            )}
          </>
        ) : (
          <>
            {post.degree && (
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{post.degree}</span>
              </div>
            )}
            {post.tuition_per_semester && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{post.tuition_per_semester}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Views */}
      {post.views > 0 && (
        <div className="flex items-center gap-1 mt-4 text-xs text-slate-400">
          <Eye className="w-3 h-3" />
          <span>{post.views} views</span>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default PostCard
