import { Helmet } from 'react-helmet-async'

/**
 * JSON-LD Schema for University/Educational Organization (Google Rich Snippets)
 * @see https://developers.google.com/search/docs/appearance/structured-data/course
 */
const UniversitySchema = ({ university }) => {
  if (!university) return null

  // Course schema for specific programs
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${university.department} ${university.degree || ''}`.trim(),
    description: university.requirements || `${university.department} program at ${university.university_name}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: university.university_name,
      sameAs: university.info_url || 'https://nbkorea.com'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: university.degree || 'Full-time'
    }
  }

  // Add tuition if available
  if (university.tuition_per_semester) {
    courseSchema.offers = {
      '@type': 'Offer',
      category: 'Tuition',
      price: university.tuition_per_semester,
      priceCurrency: 'KRW'
    }
  }

  // Organization schema for the university
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: university.university_name,
    description: `${university.university_name} - ${university.department}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR'
    }
  }

  if (university.contact_info) {
    organizationSchema.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'Admissions',
      email: university.contact_info
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(courseSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  )
}

export default UniversitySchema
