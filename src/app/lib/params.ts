import { useNavigate } from "react-router-dom"

const queryParams = new URLSearchParams(location.search)

// Parmas read 함수
const useQueryParams = () => {
  return new (class queryParamContainer {
    skip = parseInt(queryParams.get("skip") || "0")
    limit = parseInt(queryParams.get("limit") || "10")
    searchQuery = queryParams.get("search") || ""
    sortBy = queryParams.get("sortBy") || ""
    sortOrder = queryParams.get("sortOrder") || "asc"
    selectedTag = queryParams.get("tag") || ""
  })()
}

export default useQueryParams

interface UrlOptions {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
}
// URL 업데이트 함수
export const updateURL = () => {
  const navigate = useNavigate()
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag }: UrlOptions = useQueryParams()

  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (searchQuery) params.set("search", searchQuery)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)
  if (selectedTag) params.set("tag", selectedTag)
  navigate(`?${params.toString()}`)
}
