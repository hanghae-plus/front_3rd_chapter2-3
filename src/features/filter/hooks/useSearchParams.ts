import { useCallback, useEffect, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAtom } from "jotai"

import { SearchParams, searchParamsAtom } from "@features/filter/model"

import { parseURLParams, updateURL } from "@features/filter/lib"

export const useSearchParams = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useAtom(searchParamsAtom)

  useEffect(() => {
    const newParams = parseURLParams(location.search)
    if (JSON.stringify(newParams) !== JSON.stringify(searchParams)) {
      setSearchParams(newParams)
      updateURL(navigate, newParams)
    }
  }, [location.search])

  const paginationValues = useMemo(() => {
    const { skip, limit } = searchParams
    return {
      currentPage: Math.floor(skip / limit) + 1,
      nextSkip: skip + limit,
      prevSkip: Math.max(0, skip - limit),
    }
  }, [searchParams.skip, searchParams.limit])

  const updateSearchParams = useCallback(
    (update: Partial<SearchParams>) => {
      setSearchParams(prev => {
        const newParams = { ...prev, ...update }
        updateURL(navigate, newParams)
        return newParams
      })
    },
    [navigate]
  )

  const pageActions = useMemo(() => ({
    goNextPage: () => updateSearchParams({ skip: paginationValues.nextSkip }),
    goPrevPage: () => updateSearchParams({ skip: paginationValues.prevSkip }),
    goToPage: (page: number) => updateSearchParams({ 
      skip: (page - 1) * searchParams.limit 
    }),
  }), [paginationValues, searchParams.limit, updateSearchParams])

  return {
    searchParams,
    currentPage: paginationValues.currentPage,
    updateSearchParams,
    ...pageActions,
  }
}
