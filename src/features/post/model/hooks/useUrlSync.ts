import { useLocation } from 'react-router-dom'
import { useFilterStore } from '../stores'
import { useEffect } from 'react'

export const useUrlSync = () => {
  const { setSortBy, setSortOrder, setLimit, setSkip, setSearchQuery, setSelectedTag } = useFilterStore()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get('skip') || '0'))
    setLimit(parseInt(params.get('limit') || '10'))
    setSearchQuery(params.get('search') || '')
    setSortBy(params.get('sortBy') || '')
    setSortOrder((params.get('sortOrder') as 'asc' | 'desc') || 'asc')
    setSelectedTag(params.get('tag') || '')
  }, [location.search])
}
