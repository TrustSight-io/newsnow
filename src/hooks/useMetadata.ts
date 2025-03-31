import { createMetadata } from '@shared/metadata'
import { Metadata, SourceID } from '@shared/types'
import { isSourceAvailableForLanguage, useTranslation } from '~/utils/i18n'
import { useMemo } from 'react'

export function useLocalizedMetadata(): Metadata {
  const { locale } = useTranslation()
  
  // Create metadata based on the current locale
  const localizedMetadata = useMemo(() => {
    // Create the base metadata with the current locale
    const baseMetadata = createMetadata(locale)
    
    // Filter sources based on language
    return Object.fromEntries(
      Object.entries(baseMetadata).map(([columnId, column]) => {
        // Filter sources available for the current language
        const filteredSources = column.sources.filter(
          (sourceId) => isSourceAvailableForLanguage(sourceId as string, locale)
        ) as SourceID[]
        
        return [
          columnId, 
          { 
            ...column, 
            sources: filteredSources 
          }
        ]
      })
    ) as Metadata
  }, [locale])
  
  return localizedMetadata
} 