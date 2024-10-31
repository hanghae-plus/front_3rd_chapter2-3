// URL 업데이트 함수
import { IQueryParams } from "../model/queryParamsStore.ts"
import { useLocation, useNavigate } from "react-router-dom"

export const useQueryParamsUtils = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const updateURL = (queryParams: IQueryParams) => {
    const params = new URLSearchParams()
    params.set("skip", String(queryParams.skip))
    params.set("limit", String(queryParams.limit))
    params.set("search", queryParams.searchQuery)
    params.set("sortBy", queryParams.sortBy)
    params.set("sortOrder", queryParams.sortOrder)
    params.set("tag", queryParams.selectedTag)
    navigate(`?${params.toString()}`)
  }

  return { updateURL }
}
