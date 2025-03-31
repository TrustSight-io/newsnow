import type { FixedColumnID, SourceID } from "@shared/types"
import type { Update } from "./types"
import { isSourceAvailableForLanguage, localeAtom } from "~/utils/i18n"

export const focusSourcesAtom = atom((get) => {
  return get(primitiveMetadataAtom).data.focus
}, (get, set, update: Update<SourceID[]>) => {
  const _ = update instanceof Function ? update(get(focusSourcesAtom)) : update
  set(primitiveMetadataAtom, {
    updatedTime: Date.now(),
    action: "manual",
    data: {
      ...get(primitiveMetadataAtom).data,
      focus: _,
    },
  })
})

export const currentColumnIDAtom = atom<FixedColumnID>("focus")

// Filter sources based on language
export const localizedSourcesAtom = atom((get) => {
  const metadata = get(primitiveMetadataAtom)
  const locale = get(localeAtom)
  
  // Create a filtered copy of the data
  const filteredData: Record<FixedColumnID, SourceID[]> = {} as Record<FixedColumnID, SourceID[]>
  
  // For each column, filter the sources based on language
  Object.entries(metadata.data).forEach(([columnId, sources]) => {
    filteredData[columnId as FixedColumnID] = sources.filter(
      sourceId => isSourceAvailableForLanguage(sourceId as string, locale)
    ) as SourceID[]
  })
  
  return {
    ...metadata,
    data: filteredData
  }
})

export const currentSourcesAtom = atom((get) => {
  const id = get(currentColumnIDAtom)
  return get(localizedSourcesAtom).data[id]
}, (get, set, update: Update<SourceID[]>) => {
  const _ = update instanceof Function ? update(get(currentSourcesAtom)) : update
  set(primitiveMetadataAtom, {
    updatedTime: Date.now(),
    action: "manual",
    data: {
      ...get(primitiveMetadataAtom).data,
      [get(currentColumnIDAtom)]: _,
    },
  })
})

export const goToTopAtom = atom({
  ok: false,
  el: undefined as HTMLElement | undefined,
  fn: undefined as (() => void) | undefined,
})
