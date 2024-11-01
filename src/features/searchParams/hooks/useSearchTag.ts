import { searchTagAtom } from "@features/searchParams/model/atom"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import {
  getSearchParamsToURL,
  updateURL,
} from "@entities/post/services/URLServices"
import { useAtom } from "jotai"

export const useSearchTag = () => {
  const navigate = useNavigate()
  const [searchTag, setSearchTag] = useAtom(searchTagAtom)

  // URL 파라미터에 따라 searchParams 초기화
  useEffect(() => {
    const newScale = getSearchParamsToURL("tag")
    setSearchTag(newScale)
    updateURL(navigate, { selectedTag: searchTag })
  }, [])

  const updateSearchTag = useCallback(
    (updatedTag: string) => {
      setSearchTag(() => {
        updateURL(navigate, { selectedTag: updatedTag })
        return updatedTag
      })
    },
    [searchTag],
  )

  return { searchTag, updateSearchTag }
}
