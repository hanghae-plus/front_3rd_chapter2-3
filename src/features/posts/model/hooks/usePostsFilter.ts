import { useAtom } from "jotai"
import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  limitAtom,
  searchQueryAtom,
  selectedTagAtom,
  skipAtom,
  sortByAtom,
  sortOrderAtom,
} from "../../../../shared/model/atom"

export const usePostsFilter = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)

  const location = useLocation()
  const navigate = useNavigate()

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const searchParams = new URLSearchParams(location.search)
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.set(key, value)
      })
      navigate(`${location.pathname}?${searchParams.toString()}`)
    },
    [location, navigate],
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      setSkip(0) // 검색 시 첫 페이지로 이동
      updateURL({ search: value, skip: "0" })
    },
    [setSearchQuery, setSkip, updateURL],
  )

  const handleTagChange = useCallback(
    (value: string) => {
      setSelectedTag(value)
      setSkip(0) // 태그 변경 시 첫 페이지로 이동
      updateURL({ tag: value, skip: "0" })
    },
    [setSelectedTag, setSkip, updateURL],
  )

  const handleSortByChange = useCallback(
    (value: string) => {
      setSortBy(value)
      updateURL({ sortBy: value })
    },
    [setSortBy, updateURL],
  )

  const handleSortOrderChange = useCallback(
    (value: string) => {
      setSortOrder(value as "asc" | "desc")
      updateURL({ sortOrder: value })
    },
    [setSortOrder, updateURL],
  )

  const handleSkipChange = useCallback(
    (value: number) => {
      setSkip(value)
      updateURL({ skip: value.toString() })
    },
    [setSkip, updateURL],
  )

  const handleLimitChange = useCallback(
    (value: number) => {
      setLimit(value)
      setSkip(0)
      updateURL({ limit: value.toString(), skip: "0" })
    },
    [setLimit, setSkip, updateURL],
  )

  return {
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    skip,
    limit,
    onSearchChange: handleSearchChange,
    onTagChange: handleTagChange,
    onSortByChange: handleSortByChange,
    onSortOrderChange: handleSortOrderChange,
    onSkipChange: handleSkipChange,
    onLimitChange: handleLimitChange,
  }
}
