import { sources } from "./sources"
import { typeSafeObjectEntries, typeSafeObjectFromEntries } from "./type.util"
import type { ColumnID, HiddenColumnID, Metadata, SourceID } from "./types"

export const columns = {
  china: {
    zh: "国内",
    en: "China",
  },
  world: {
    zh: "国际",
    en: "World",
  },
  tech: {
    zh: "科技",
    en: "Technology",
  },
  finance: {
    zh: "财经",
    en: "Finance",
  },
  focus: {
    zh: "关注",
    en: "Focus",
  },
  realtime: {
    zh: "实时",
    en: "Realtime",
  },
  hottest: {
    zh: "最热",
    en: "Hottest",
  },
} as const

export const fixedColumnIds = ["focus", "hottest", "realtime"] as const satisfies Partial<ColumnID>[]
export const hiddenColumns = Object.keys(columns).filter(id => !fixedColumnIds.includes(id as any)) as HiddenColumnID[]

// Create metadata with a specific locale
export function createMetadata(locale: 'en' | 'zh' = 'en'): Metadata {
  return typeSafeObjectFromEntries(typeSafeObjectEntries(columns).map(([k, v]) => {
    switch (k) {
      case "focus":
        return [k, {
          name: v[locale],
          sources: [] as SourceID[],
        }]
      case "hottest":
        return [k, {
          name: v[locale],
          sources: typeSafeObjectEntries(sources).filter(([, v]) => v.type === "hottest" && !v.redirect).map(([k]) => k),
        }]
      case "realtime":
        return [k, {
          name: v[locale],
          sources: typeSafeObjectEntries(sources).filter(([, v]) => v.type === "realtime" && !v.redirect).map(([k]) => k),
        }]
      default:
        return [k, {
          name: v[locale],
          sources: typeSafeObjectEntries(sources).filter(([, v]) => v.column === k && !v.redirect).map(([k]) => k),
        }]
    }
  }))
}

// Default metadata with English locale
export const metadata: Metadata = createMetadata('en')
