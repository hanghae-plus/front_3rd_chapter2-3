import { searchSortByAtom } from "@features/searchParams/model/atom"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import {
  getSearchParamsToURL,
  updateURL,
} from "@entities/post/services/URLServices"
import { useAtom } from "jotai"

export const useSearchSortBy = () => {
  const navigate = useNavigate()
  const [sortBy, setSearchSortBy] = useAtom(searchSortByAtom)

  // URL 파라미터에 따라 searchParams 초기화
  useEffect(() => {
    const newSortBy = getSearchParamsToURL("sortBy")
    setSearchSortBy(newSortBy)
    updateURL(navigate, { sortBy: newSortBy })
  }, [])

  const updateSearchSortBy = useCallback(
    (updateSortBy: string) => {
      setSearchSortBy(() => {
        updateURL(navigate, { sortBy: updateSortBy })
        return updateSortBy
      })
    },
    [sortBy],
  )

  return {
    sortBy,
    updateSearchSortBy,
  }
}
