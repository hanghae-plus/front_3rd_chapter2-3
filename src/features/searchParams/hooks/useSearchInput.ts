import { searchTextAtom } from "@features/searchParams/model/atom"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import {
  getSearchParamsToURL,
  updateURL,
} from "@entities/post/services/URLServices"
import { useAtom } from "jotai"

export const useSearchInput = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useAtom(searchTextAtom)
  const [input, setInputState] = useState(searchInput)

  // URL 파라미터에 따라 searchParams 초기화
  useEffect(() => {
    const newSearch = getSearchParamsToURL("search")
    setSearchInput(newSearch)
    setInputState(newSearch)
    updateURL(navigate, { q: newSearch })
  }, [])

  const updateInputState = useCallback(
    (newState: string) => {
      setInputState(newState)
    },
    [input],
  )

  const updateSearchInput = useCallback(() => {
    setSearchInput(() => {
      updateURL(navigate, { q: input })
      return input
    })
  }, [input])

  return {
    searchInput: input,
    updateInputState,
    updateSearchInput,
  }
}
