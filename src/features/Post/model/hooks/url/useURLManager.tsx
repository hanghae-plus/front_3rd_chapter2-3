import { useNavigate } from "react-router-dom"
import { usePostStore } from "../../stores/usePostStore"
import { usePostManagerStore } from "../../../../../pages/model/stores/usePostManagerStore"

export const useURLManager = () => {
  const navigate = useNavigate()
  const { skip, limit, searchQuery } = usePostStore()
  const { sortBy, sortOrder, selectedTag } = usePostManagerStore()  

  const updateURL = () => {
    const currentParams = new URLSearchParams(window.location.search)
    const newParams = new URLSearchParams()

    // 현재 상태값들을 URL에 반영
    newParams.set("skip", skip.toString())
    newParams.set("limit", limit.toString())
    newParams.set("sortOrder", sortOrder)

    if (searchQuery) newParams.set("search", searchQuery)
    if (sortBy) newParams.set("sortBy", sortBy)
    if (selectedTag) newParams.set("tag", selectedTag)

    // 파라미터가 실제로 변경되었을 때만 navigate 실행
    const newParamsString = newParams.toString()
    if (newParamsString !== currentParams.toString()) {
      navigate(`?${newParamsString}`)
    }
  }

  return { updateURL }
}