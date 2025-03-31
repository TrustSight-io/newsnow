import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Define supported languages
export type Language = 'en' | 'zh'

// Locale storage atom
export const localeAtom = atomWithStorage<Language>('locale', 'en')

// Dictionary of translations
export const translations = {
  en: {
    // Menu items
    'theme.dark': 'Dark Mode',
    'theme.light': 'Light Mode',
    'login': 'Login with Github',
    'logout': 'Logout',
    'starOnGithub': 'Star on Github',
    'more': 'More',
    
    // Columns
    'column.china': 'China',
    'column.world': 'World',
    'column.tech': 'Technology',
    'column.finance': 'Finance',
    'column.focus': 'Focus',
    'column.realtime': 'Realtime',
    'column.hottest': 'Hottest',
  },
  zh: {
    // Menu items
    'theme.dark': '深色模式',
    'theme.light': '浅色模式',
    'login': 'Github 账号登录',
    'logout': '退出登录',
    'starOnGithub': 'Star on Github',
    'more': '更多',
    
    // Columns
    'column.china': '国内',
    'column.world': '国际',
    'column.tech': '科技',
    'column.finance': '财经',
    'column.focus': '关注',
    'column.realtime': '实时',
    'column.hottest': '最热',
  },
} as const

// List of English-language sources
export const englishSources = [
  // Hacker News - popular English tech news aggregator
  'hackernews',
  
  // Product Hunt - English product discovery platform
  'producthunt',
  
  // GitHub - global code repository platform (primarily English)
  'github',
  'github-trending-today',
  
  // Kaopu News - has some English content
  'kaopu',
  
  // Linux.do - may have English content
  'linuxdo',
  'linuxdo-latest',
  'linuxdo-hot',
]

// List of Chinese-language sources (to be shown only when Chinese is selected)
export const chineseSources = [
  // Chinese tech platforms
  'v2ex', 'v2ex-share',
  'solidot',
  'ithome',
  'coolapk',
  
  // Chinese social media
  'zhihu',
  'weibo',
  'douyin',
  'tieba',
  'bilibili', 'bilibili-hot-search',
  'kuaishou',
  
  // Chinese news sites
  'toutiao',
  'thepaper',
  'zaobao',
  'sputniknewscn',
  'cankaoxiaoxi',
  
  // Chinese finance sites
  'wallstreetcn', 'wallstreetcn-quick', 'wallstreetcn-news', 'wallstreetcn-hot',
  'cls', 'cls-telegraph', 'cls-depth', 'cls-hot',
  'xueqiu', 'xueqiu-hotstock',
  'gelonghui',
  'fastbull', 'fastbull-express', 'fastbull-news',
  
  // Chinese tech company news
  '36kr', '36kr-quick',
]

// Check if a source is available for a specific language
export function isSourceAvailableForLanguage(sourceId: string, language: Language): boolean {
  if (language === 'zh') {
    // When Chinese is selected, show all sources
    return true
  } else if (language === 'en') {
    // When English is selected, only show English sources
    return englishSources.includes(sourceId) || !chineseSources.includes(sourceId)
  }
  
  // Default to true for unknown languages
  return true
}

// Translation hook
export function useTranslation() {
  const [locale, setLocale] = useAtom(localeAtom)
  
  // Type-safe translation function
  const t = (key: keyof typeof translations['en']) => {
    return translations[locale][key] || key
  }
  
  // Switch language function
  const changeLanguage = (lang: Language) => {
    setLocale(lang)
  }
  
  return {
    t,
    locale,
    changeLanguage,
    isSourceAvailable: (sourceId: string) => isSourceAvailableForLanguage(sourceId, locale)
  }
}

// Language switcher component props
export interface LanguageSwitcherProps {
  className?: string
} 