import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files - Korean (ko)
import koCommon from './locales/ko/common.json'
import koNavigation from './locales/ko/navigation.json'
import koHero from './locales/ko/hero.json'
import koServices from './locales/ko/services.json'
import koContact from './locales/ko/contact.json'
import koConsultation from './locales/ko/consultation.json'
import koFooter from './locales/ko/footer.json'
import koPartners from './locales/ko/partners.json'
import koBlog from './locales/ko/blog.json'

// English (en)
import enCommon from './locales/en/common.json'
import enNavigation from './locales/en/navigation.json'
import enHero from './locales/en/hero.json'
import enServices from './locales/en/services.json'
import enContact from './locales/en/contact.json'
import enConsultation from './locales/en/consultation.json'
import enFooter from './locales/en/footer.json'
import enPartners from './locales/en/partners.json'
import enBlog from './locales/en/blog.json'

// Vietnamese (vi)
import viCommon from './locales/vi/common.json'
import viNavigation from './locales/vi/navigation.json'
import viHero from './locales/vi/hero.json'
import viServices from './locales/vi/services.json'
import viContact from './locales/vi/contact.json'
import viConsultation from './locales/vi/consultation.json'
import viFooter from './locales/vi/footer.json'
import viPartners from './locales/vi/partners.json'
import viBlog from './locales/vi/blog.json'

// Thai (th)
import thCommon from './locales/th/common.json'
import thNavigation from './locales/th/navigation.json'
import thHero from './locales/th/hero.json'
import thServices from './locales/th/services.json'
import thContact from './locales/th/contact.json'
import thConsultation from './locales/th/consultation.json'
import thFooter from './locales/th/footer.json'
import thPartners from './locales/th/partners.json'
import thBlog from './locales/th/blog.json'

// Filipino (fil)
import filCommon from './locales/fil/common.json'
import filNavigation from './locales/fil/navigation.json'
import filHero from './locales/fil/hero.json'
import filServices from './locales/fil/services.json'
import filContact from './locales/fil/contact.json'
import filConsultation from './locales/fil/consultation.json'
import filFooter from './locales/fil/footer.json'
import filPartners from './locales/fil/partners.json'
import filBlog from './locales/fil/blog.json'

// Uzbek (uz)
import uzCommon from './locales/uz/common.json'
import uzNavigation from './locales/uz/navigation.json'
import uzHero from './locales/uz/hero.json'
import uzServices from './locales/uz/services.json'
import uzContact from './locales/uz/contact.json'
import uzConsultation from './locales/uz/consultation.json'
import uzFooter from './locales/uz/footer.json'
import uzPartners from './locales/uz/partners.json'
import uzBlog from './locales/uz/blog.json'

// Nepali (ne)
import neCommon from './locales/ne/common.json'
import neNavigation from './locales/ne/navigation.json'
import neHero from './locales/ne/hero.json'
import neServices from './locales/ne/services.json'
import neContact from './locales/ne/contact.json'
import neConsultation from './locales/ne/consultation.json'
import neFooter from './locales/ne/footer.json'
import nePartners from './locales/ne/partners.json'
import neBlog from './locales/ne/blog.json'

// Mongolian (mn)
import mnCommon from './locales/mn/common.json'
import mnNavigation from './locales/mn/navigation.json'
import mnHero from './locales/mn/hero.json'
import mnServices from './locales/mn/services.json'
import mnContact from './locales/mn/contact.json'
import mnConsultation from './locales/mn/consultation.json'
import mnFooter from './locales/mn/footer.json'
import mnPartners from './locales/mn/partners.json'
import mnBlog from './locales/mn/blog.json'

// Indonesian (id)
import idCommon from './locales/id/common.json'
import idNavigation from './locales/id/navigation.json'
import idHero from './locales/id/hero.json'
import idServices from './locales/id/services.json'
import idContact from './locales/id/contact.json'
import idConsultation from './locales/id/consultation.json'
import idFooter from './locales/id/footer.json'
import idPartners from './locales/id/partners.json'
import idBlog from './locales/id/blog.json'

// Myanmar (my)
import myCommon from './locales/my/common.json'
import myNavigation from './locales/my/navigation.json'
import myHero from './locales/my/hero.json'
import myServices from './locales/my/services.json'
import myContact from './locales/my/contact.json'
import myConsultation from './locales/my/consultation.json'
import myFooter from './locales/my/footer.json'
import myPartners from './locales/my/partners.json'
import myBlog from './locales/my/blog.json'

// Chinese Simplified (zh-CN)
import zhCNCommon from './locales/zh-CN/common.json'
import zhCNNavigation from './locales/zh-CN/navigation.json'
import zhCNHero from './locales/zh-CN/hero.json'
import zhCNServices from './locales/zh-CN/services.json'
import zhCNContact from './locales/zh-CN/contact.json'
import zhCNConsultation from './locales/zh-CN/consultation.json'
import zhCNFooter from './locales/zh-CN/footer.json'
import zhCNPartners from './locales/zh-CN/partners.json'
import zhCNBlog from './locales/zh-CN/blog.json'

// Russian (ru)
import ruCommon from './locales/ru/common.json'
import ruNavigation from './locales/ru/navigation.json'
import ruHero from './locales/ru/hero.json'
import ruServices from './locales/ru/services.json'
import ruContact from './locales/ru/contact.json'
import ruConsultation from './locales/ru/consultation.json'
import ruFooter from './locales/ru/footer.json'
import ruPartners from './locales/ru/partners.json'
import ruBlog from './locales/ru/blog.json'

// Translation resources
const resources = {
  ko: {
    common: koCommon,
    navigation: koNavigation,
    hero: koHero,
    services: koServices,
    contact: koContact,
    consultation: koConsultation,
    footer: koFooter,
    partners: koPartners,
    blog: koBlog
  },
  en: {
    common: enCommon,
    navigation: enNavigation,
    hero: enHero,
    services: enServices,
    contact: enContact,
    consultation: enConsultation,
    footer: enFooter,
    partners: enPartners,
    blog: enBlog
  },
  vi: {
    common: viCommon,
    navigation: viNavigation,
    hero: viHero,
    services: viServices,
    contact: viContact,
    consultation: viConsultation,
    footer: viFooter,
    partners: viPartners,
    blog: viBlog
  },
  th: {
    common: thCommon,
    navigation: thNavigation,
    hero: thHero,
    services: thServices,
    contact: thContact,
    consultation: thConsultation,
    footer: thFooter,
    partners: thPartners,
    blog: thBlog
  },
  fil: {
    common: filCommon,
    navigation: filNavigation,
    hero: filHero,
    services: filServices,
    contact: filContact,
    consultation: filConsultation,
    footer: filFooter,
    partners: filPartners,
    blog: filBlog
  },
  uz: {
    common: uzCommon,
    navigation: uzNavigation,
    hero: uzHero,
    services: uzServices,
    contact: uzContact,
    consultation: uzConsultation,
    footer: uzFooter,
    partners: uzPartners,
    blog: uzBlog
  },
  ne: {
    common: neCommon,
    navigation: neNavigation,
    hero: neHero,
    services: neServices,
    contact: neContact,
    consultation: neConsultation,
    footer: neFooter,
    partners: nePartners,
    blog: neBlog
  },
  mn: {
    common: mnCommon,
    navigation: mnNavigation,
    hero: mnHero,
    services: mnServices,
    contact: mnContact,
    consultation: mnConsultation,
    footer: mnFooter,
    partners: mnPartners,
    blog: mnBlog
  },
  id: {
    common: idCommon,
    navigation: idNavigation,
    hero: idHero,
    services: idServices,
    contact: idContact,
    consultation: idConsultation,
    footer: idFooter,
    partners: idPartners,
    blog: idBlog
  },
  my: {
    common: myCommon,
    navigation: myNavigation,
    hero: myHero,
    services: myServices,
    contact: myContact,
    consultation: myConsultation,
    footer: myFooter,
    partners: myPartners,
    blog: myBlog
  },
  'zh-CN': {
    common: zhCNCommon,
    navigation: zhCNNavigation,
    hero: zhCNHero,
    services: zhCNServices,
    contact: zhCNContact,
    consultation: zhCNConsultation,
    footer: zhCNFooter,
    partners: zhCNPartners,
    blog: zhCNBlog
  },
  ru: {
    common: ruCommon,
    navigation: ruNavigation,
    hero: ruHero,
    services: ruServices,
    contact: ruContact,
    consultation: ruConsultation,
    footer: ruFooter,
    partners: ruPartners,
    blog: ruBlog
  }
}

// Get default language from environment variable, fallback to 'ko'
const defaultLanguage = import.meta.env.VITE_DEFAULT_LANGUAGE || 'ko'

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: defaultLanguage, // Default language from env or 'ko'
    defaultNS: 'common',
    ns: ['common', 'navigation', 'hero', 'services', 'contact', 'consultation', 'footer', 'partners', 'blog'],

    interpolation: {
      escapeValue: false // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    react: {
      useSuspense: false
    }
  })

console.log('Default language:', defaultLanguage)

export default i18n
