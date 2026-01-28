import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Hero from '../components/Hero'
import Contact from '../components/Contact'
import { HreflangTags } from '../components/SEO'

const Home = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Helmet>
        <title>{t('seo.homeTitle', 'NB KOREA - 외국인 근로자 지원 서비스')}</title>
        <meta name="description" content={t('seo.homeDescription', '한국에서 일하는 외국인 근로자를 위한 종합 지원 서비스. 취업, 비자, 상담 서비스를 제공합니다.')} />
        <meta name="keywords" content={t('seo.homeKeywords', 'NB KOREA, 외국인 근로자, 비자 상담, 취업 지원, 한국 생활')} />
        <meta property="og:title" content={t('seo.homeOgTitle', 'NB KOREA - 외국인 근로자 지원')} />
        <meta property="og:description" content={t('seo.homeOgDescription', '외국인 근로자를 위한 종합 지원 서비스')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nbkorea.com" />
        <link rel="canonical" href="https://nbkorea.com" />
      </Helmet>
      <HreflangTags path="/" />
      <div className="min-h-screen">
        <Hero />
        <Contact />
      </div>
    </>
  )
}

export default Home
