import { useEffect } from 'react'
import { primitiveMetadataAtom } from '~/atoms/primitiveMetadataAtom'
import { localeAtom, englishSources } from '~/utils/i18n'
import { useAtomValue, useSetAtom } from 'jotai'
import { metadata } from '@shared/metadata'
import { fixedColumnIds } from '@shared/metadata'
import { FixedColumnID, SourceID } from '@shared/types'

/**
 * This hook handles language changes and ensures the proper sources are loaded
 * when switching between English and Chinese.
 */
export function useSourceFiltering() {
  const locale = useAtomValue(localeAtom)
  const setPrimitiveMetadata = useSetAtom(primitiveMetadataAtom)
  
  // When language changes, ensure correct sources are loaded
  useEffect(() => {
    if (locale === 'en') {
      // When switching to English, filter out Chinese sources
      setPrimitiveMetadata((current) => {
        // Create a new filtered data object
        const filteredData: Record<FixedColumnID, SourceID[]> = {} as Record<FixedColumnID, SourceID[]>
        
        // For each fixed column, ensure at least the English sources are available
        fixedColumnIds.forEach((columnId) => {
          // Get current sources for this column
          const currentSources = current.data[columnId]
          
          // Get sources that should be available for this column in English
          const columnMetadata = metadata[columnId]
          const availableSources = columnMetadata.sources.filter(
            sourceId => englishSources.includes(sourceId as string)
          ) as SourceID[]
          
          // Use a Set to ensure no duplicates
          const sourceSet = new Set([...currentSources, ...availableSources])
          filteredData[columnId] = Array.from(sourceSet) as SourceID[]
        })
        
        // Return updated metadata
        return {
          ...current,
          data: filteredData,
          updatedTime: Date.now(),
          action: 'manual'
        }
      })
    }
  }, [locale, setPrimitiveMetadata])
} 