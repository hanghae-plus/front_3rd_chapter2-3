import { useQuery } from "@tanstack/react-query"
import { GetPostsParams, PostsResponse } from "../../model/types"

export const fetchPosts = async (params: GetPostsParams): Promise<PostsResponse> => {
  const { limit, skip } = params

  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()

  return data
}

export const usePosts = (params: GetPostsParams) => {
  const { limit, skip } = params

  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => fetchPosts(params),
    initialData: { posts: [], limit: 0, total: 0, skip: 0 },
  })
}
