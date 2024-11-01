import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePostStore } from "../../../entities/post/model/postStore"

const useSyncQueryParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  } = usePostStore()

  // URL 파라미터와 zustand 상태 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search, setSkip, setLimit, setSearchQuery, setSortBy, setSortOrder, setSelectedTag])

  // zustand 상태 변경 시 URL 업데이트 및 데이터 fetch
  useEffect(() => {
    const updateURL = () => {
      const params = new URLSearchParams()
      if (skip) params.set("skip", skip.toString())
      if (limit) params.set("limit", limit.toString())
      if (searchQuery) params.set("search", searchQuery)
      if (sortBy) params.set("sortBy", sortBy)
      if (sortOrder) params.set("sortOrder", sortOrder)
      if (selectedTag) params.set("tag", selectedTag)
      navigate(`?${params.toString()}`)
    }

    updateURL()
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag, navigate])
}

export default useSyncQueryParams
