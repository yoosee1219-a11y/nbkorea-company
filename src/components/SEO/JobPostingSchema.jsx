import { Helmet } from 'react-helmet-async'

/**
 * JSON-LD Schema for Job Posting (Google Rich Snippets)
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
const JobPostingSchema = ({ job }) => {
  if (!job) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || job.title,
    datePosted: job.created_at ? new Date(job.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: 'https://nbkorea.com'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location || 'Korea',
        addressCountry: 'KR'
      }
    },
    employmentType: 'FULL_TIME',
    directApply: !!job.apply_url
  }

  // Add salary if available
  if (job.salary) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'MONTH'
      }
    }
  }

  // Add valid through date (30 days from posting)
  if (job.created_at) {
    const validThrough = new Date(job.created_at)
    validThrough.setDate(validThrough.getDate() + 90)
    schema.validThrough = validThrough.toISOString().split('T')[0]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default JobPostingSchema
