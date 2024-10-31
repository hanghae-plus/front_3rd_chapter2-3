import { QueryKey } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/api/post.queries"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"

export const getPostsQueryData = (): [QueryKey, PostsResponse] => {
  const [[queryKey, oldData]] = queryClient.getQueriesData<PostsResponse>({
    queryKey: postQueryKeys.lists(),
  })

  return [
    queryKey,
    {
      posts: oldData?.posts ?? [],
      total: oldData?.total ?? 0,
    },
  ]
}
