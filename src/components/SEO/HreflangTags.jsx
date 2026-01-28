import { Helmet } from 'react-helmet-async'

// Supported languages for hreflang tags
const SUPPORTED_LANGUAGES = [
  { code: 'ko', hreflang: 'ko' },
  { code: 'en', hreflang: 'en' },
  { code: 'vi', hreflang: 'vi' },
  { code: 'th', hreflang: 'th' },
  { code: 'fil', hreflang: 'fil' },
  { code: 'uz', hreflang: 'uz' },
  { code: 'ne', hreflang: 'ne' },
  { code: 'mn', hreflang: 'mn' },
  { code: 'id', hreflang: 'id' },
  { code: 'my', hreflang: 'my' },
  { code: 'zh-CN', hreflang: 'zh-Hans' },
  { code: 'ru', hreflang: 'ru' }
]

const BASE_URL = 'https://nbkorea.com'

/**
 * HreflangTags component for multi-language SEO
 * @param {string} path - Current page path (e.g., '/jobs', '/universities/123')
 */
const HreflangTags = ({ path = '' }) => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return (
    <Helmet>
      {/* hreflang tags for each supported language */}
      {SUPPORTED_LANGUAGES.map(({ code, hreflang }) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={hreflang}
          href={`${BASE_URL}${normalizedPath}?lang=${code}`}
        />
      ))}
      {/* x-default for language selection page or default */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}${normalizedPath}`}
      />
    </Helmet>
  )
}

export { SUPPORTED_LANGUAGES, BASE_URL }
export default HreflangTags
