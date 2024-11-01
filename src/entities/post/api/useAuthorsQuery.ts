import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { postQueryKeys } from "./post.queries"
import { postApi } from "./postApi"

export const useAuthorsQuery = () => {
  return useQuery({
    queryKey: postQueryKeys.authors(),
    queryFn: () => postApi.fetchAuthors(),
    select: (data) => data.users,
    placeholderData: keepPreviousData,
  })
}
