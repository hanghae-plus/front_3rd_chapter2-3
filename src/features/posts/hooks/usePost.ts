import { useNavigate } from "react-router-dom"
import usePostState from "../../../entities/posts/state/usePostState"

const usePost = () => {
  const navigate = useNavigate()
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = usePostState()

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

  return { updateURL }
}

export default usePost
