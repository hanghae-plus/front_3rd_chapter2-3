import { atom, useAtom } from "jotai"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const queryParams = new URLSearchParams(location.search)

const skipAtom = atom(parseInt(queryParams.get("skip") || "0"))
const limitAtom = atom(parseInt(queryParams.get("limit") || "10"))
const searchQueryAtom = atom(queryParams.get("search") || "")
const sortByAtom = atom(queryParams.get("sortBy") || "")
const sortOrderAtom = atom(queryParams.get("sortOrder") || "asc")
const selectedTagAtom = atom(queryParams.get("tag") || "")

export const useRouterQueries = () => {
  const navigate = useNavigate()

  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  // URL 업데이트 함수
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }, [limit, navigate, searchQuery, selectedTag, skip, sortBy, sortOrder])

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag, updateURL])

  return {
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
    updateURL,
  }
}
