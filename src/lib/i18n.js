import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translation files
import navigationKo from '../locales/ko/navigation.json'
import navigationEn from '../locales/en/navigation.json'

const resources = {
  ko: {
    navigation: navigationKo,
  },
  en: {
    navigation: navigationEn,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
