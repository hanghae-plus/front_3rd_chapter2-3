import { useLocation, useNavigate } from "react-router-dom"
import { PostFilterParams_i } from "./types"
import { useEffect, useState } from "react"

interface UsePostFilterProps_i {
  onFilterChange?: (params: PostFilterParams_i) => void
}

export const usePostFilter = ({ onFilterChange }: UsePostFilterProps_i) => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  // 상태 관리
  const [skip, setSkip] = useState<number>(parseInt(params.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(params.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState<string>(params.get("search") || "")
  const [sortBy, setSortBy] = useState(params.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(params.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState<string>(params.get("tag") || "")

  // URL에서 파라미터 읽기
  useEffect(() => {
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 필터 변경시 URL 업데이트 및 콜백 호출
  useEffect(() => {
    const currentParams: PostFilterParams_i = {
      skip,
      limit,
      search: searchQuery,
      sortBy,
      sortOrder,
      tag: selectedTag,
    }

    onFilterChange?.(currentParams)
    updatePostFilter(currentParams)
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery])

  const updatePostFilter = (params: PostFilterParams_i) => {
    const urlParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        urlParams.set(key, value.toString())
      }
    })

    navigate(`?${urlParams.toString()}`)
  }

  return {
    // 상태
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,

    // 상태 변경 함수
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,

    // URL 업데이트 함수
    updatePostFilter,
  }
}
