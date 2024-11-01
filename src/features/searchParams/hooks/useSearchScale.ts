import { searchScaleAtom } from "@features/searchParams/model/atom"
import { SearchParams, SearchParamScale } from "@features/searchParams/types"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import {
  getSearchParamsToURL,
  updateURL,
} from "@entities/post/services/URLServices"
import { useAtom } from "jotai"

export const useSearchScale = () => {
  const navigate = useNavigate()
  const [searchScale, setSearchScale] = useAtom(searchScaleAtom)

  // URL 파라미터에 따라 searchParams 초기화
  useEffect(() => {
    const skip = parseInt(getSearchParamsToURL("skip"))
    const limit = parseInt(getSearchParamsToURL("limit"))
    setSearchScale({ skip, limit })
    updateURL(navigate, searchScale)
  }, [])

  const updateSearchScale = useCallback(
    (update: Partial<SearchParams>) => {
      setSearchScale((prev: SearchParamScale) => {
        const newParams = { ...prev, ...update }
        updateURL(navigate, newParams)
        return newParams
      })
    },
    [searchScale],
  )

  /**
   * 다음 페이지로 이동 (skip , limit 값 업데이트)
   */
  const goNextPage = useCallback(() => {
    const { skip, limit } = searchScale
    const updatedSkip = skip + limit
    updateSearchScale({ skip: updatedSkip })
  }, [searchScale])

  /**
   * 이전 페이지로 이동 (skip , limit 값 업데이트)
   */
  const goPrevPage = useCallback(() => {
    const { skip, limit } = searchScale
    const updatedSkip = Math.max(0, skip - limit)
    updateSearchScale({ skip: updatedSkip })
  }, [searchScale])

  return {
    searchScale,
    goNextPage,
    goPrevPage,
    updateSearchScale,
  }
}
