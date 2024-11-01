import { useQuery } from "@tanstack/react-query"
import { fetchPosts, queryKeys } from "@/entities/post"

export const useFetchPosts = (limit: string, skip: string) => {
  return useQuery({
    queryFn: async () => {
      return await fetchPosts(limit, skip)
    },
    queryKey: queryKeys.FETCH_POSTS_KEY(limit, skip),
  })
}
