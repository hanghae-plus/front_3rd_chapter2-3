import { useLocation } from 'react-router-dom'
import { filterStore } from '../stores'
import { useEffect } from 'react'

export const useUrlSync = () => {
  const { setSortBy, setSortOrder, setLimit, setSkip, setSearchQuery, setSelectedTag } = filterStore()
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
