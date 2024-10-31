import { useLocation } from "react-router-dom"
import { useURLParams } from "./useURLParams"
import { useEffect, useState } from "react"
import { usePostsQuery, useSearchPostsQuery } from "./usePostsQuery"

export const usePostsState = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { updateURL } = useURLParams()

  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || "",
  )
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(
    queryParams.get("sortOrder") || "asc",
  )
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  const { data: postsData, isPending: postsPending } = usePostsQuery(
    limit,
    skip,
  )
  const { data: searchedData } = useSearchPostsQuery(searchQuery)

  const posts = searchQuery ? searchedData?.posts : postsData?.posts
  const total = searchQuery
    ? searchedData?.total
      ? searchedData.total
      : postsData?.total
    : 0

  useEffect(() => {
    updateURL({
      skip,
      limit,
      search: searchQuery,
      sortBy,
      sortOrder,
      tag: selectedTag,
    })
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  return {
    posts,
    total,
    isPending: postsPending,
    pagination: {
      skip,
      limit,
      setSkip,
      setLimit,
    },
    filters: {
      searchQuery,
      sortBy,
      sortOrder,
      selectedTag,
      setSearchQuery,
      setSortBy,
      setSortOrder,
      setSelectedTag,
    },
  }
}
