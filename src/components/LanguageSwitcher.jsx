import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { clsx } from 'clsx'

const LANGUAGES = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
  { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
  { code: 'mn', name: 'Монгол', flag: '🇲🇳' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
]

const LanguageSwitcher = ({ className, isMobile = false }) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "inline-flex items-center gap-2 font-semibold transition-all duration-300 focus:outline-none cursor-pointer",
          isMobile
            ? "w-full px-4 py-3 rounded-xl text-base text-slate-700 hover:bg-slate-50 active:bg-slate-100"
            : "px-3 lg:px-4 py-2 lg:py-2.5 text-sm rounded-lg text-slate-700 hover:bg-slate-100 hover:text-nb-pink-600",
          className
        )}
        aria-label="언어 변경"
      >
        <Globe className={clsx(isMobile ? "size-5" : "size-4")} />
        <span className="flex items-center gap-1.5">
          <span>{currentLanguage.flag}</span>
          <span>{currentLanguage.code.toUpperCase()}</span>
        </span>
        <ChevronDown className={clsx("transition-transform", isOpen && "rotate-180", isMobile ? "size-4" : "size-3")} />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute z-50 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
            isMobile
              ? "left-0 right-0 mt-2"
              : "right-0 mt-2 w-56"
          )}
        >
          <div className="py-2 max-h-96 overflow-y-auto">
            {LANGUAGES.map((lang) => {
              const isSelected = i18n.language === lang.code
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={clsx(
                    "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                    isSelected
                      ? "bg-nb-pink-50 text-nb-pink-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {isSelected && (
                    <Check className="size-4 text-nb-pink-600" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
