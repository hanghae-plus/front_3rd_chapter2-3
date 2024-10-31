import { useQuery } from "@tanstack/react-query"
import { getTagListApi } from "../../../entities/tag/api"

export const useQueryTagList = () => {
  const { data, isLoading } = useQuery(["post-tag-list"], getTagListApi, {
    onError: (error) => console.error("태그 가져오기 오류:", error),
  })

  return { data, isLoading }
}
