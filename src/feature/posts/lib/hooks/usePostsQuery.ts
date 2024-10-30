import { useQuery } from "@tanstack/react-query"
import { postsApi } from "../../api/posts.api"

export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => postsApi.getPosts(limit, skip),
  })
}

export const useTagsQuery = () => {
  
}