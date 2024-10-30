import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const limit = "10" // 예시 값
export const skip = "0" // 예시 값
export const searchQuery = "" // 예시 값
export const sortBy = "date" // 예시 값
export const sortOrder = "asc" // 예시 값
export const selectedTag = "" // 예시 값

const useUpdateURL = () => {
  const navigate = useNavigate()

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

  useEffect(() => {
    updateURL()
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])
}

export default useUpdateURL
