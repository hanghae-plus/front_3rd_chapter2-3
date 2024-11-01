import { useNavigate } from "react-router-dom"
import { createSearchParams } from "./createSearchParams"
import { PostListParams } from "../model/type"

export const useListNavigation = () => {
  const navigate = useNavigate()

  return (params: PostListParams) => {
    const searchParams = createSearchParams(params)
    navigate(`?${searchParams.toString()}`)
  }
}
