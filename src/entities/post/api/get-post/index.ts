import { useQuery } from "@tanstack/react-query"
import { GetPostsParams, Post } from "../../model/types"

export const fetchPosts = async (params: GetPostsParams): Promise<{ posts: Post[] }> => {
  const { limit, skip } = params

  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()

  return data
}

export const usePosts = (params: GetPostsParams) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(params),
    initialData: { posts: [] },
  })
}
