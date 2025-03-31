import { Language, useTranslation } from '~/utils/i18n'

export function LanguageSwitcher() {
  const { locale, changeLanguage } = useTranslation()
  
  const toggleLanguage = () => {
    changeLanguage(locale === 'en' ? 'zh' : 'en')
  }
  
  return (
    <li onClick={toggleLanguage} className="relative">
      <span className="i-ph-translate-duotone inline-block" />
      <span>
        {locale === 'en' ? '中文' : 'English'}
      </span>
      {locale === 'en' && (
        <span className="ml-1 text-xs op-70 color-primary">
          (More sources in Chinese)
        </span>
      )}
    </li>
  )
} 