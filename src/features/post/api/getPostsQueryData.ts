import { QueryKey } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/api/post.queries"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"

/**
 * 게시물(post) 쿼리 데이터를 가져오는 함수.
 * @see https://tanstack.com/query/v4/docs/reference/QueryClient/#queryclientgetqueriesdata
 */
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
