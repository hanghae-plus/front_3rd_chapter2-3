import { searchSortOrderAtom } from "@features/searchParams/model/atom"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import {
  getSearchParamsToURL,
  updateURL,
} from "@entities/post/services/URLServices"
import { useAtom } from "jotai"

export const useSearchSortOrder = () => {
  const navigate = useNavigate()
  const [sortOrder, setSearchSortOrder] = useAtom(searchSortOrderAtom)

  // URL 파라미터에 따라 searchParams 초기화
  useEffect(() => {
    const newSortOrder = getSearchParamsToURL("sortOder")
    setSearchSortOrder(newSortOrder)
    updateURL(navigate, { sortOrder: newSortOrder })
  }, [])

  const updateSearchSortOrder = useCallback(
    (updateSortOrder: string) => {
      setSearchSortOrder(() => {
        updateURL(navigate, { sortOrder: updateSortOrder })
        return updateSortOrder
      })
    },
    [sortOrder],
  )

  return {
    sortOrder,
    updateSearchSortOrder,
  }
}
