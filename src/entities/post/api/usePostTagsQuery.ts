import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { postQueryKeys } from "./post.queries"
import { postApi } from "./postApi"

export const usePostTagsQuery = () => {
  return useQuery({
    queryKey: postQueryKeys.tags(),
    queryFn: () => postApi.fetchTags(),
    placeholderData: keepPreviousData,
  })
}
