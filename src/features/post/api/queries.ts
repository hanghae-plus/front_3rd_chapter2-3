import { useQuery } from "@tanstack/react-query"
import { fetchPostsApi, fetchPostsByTagApi, searchPostsApi } from "../../../entities/post/api"
import { usePostParams } from "../model/usePostParams.ts"

export const usePostsQuery = () => {
  const { limit, skip, selectedTag: tag, searchQuery, sortOrder, sortBy } = usePostParams()

  return useQuery({
    queryKey: ["posts", { limit, skip, tag, searchQuery, sortOrder, sortBy }],
    queryFn: async () => {
      if (searchQuery) return await searchPostsApi(searchQuery)
      if (tag && tag !== "all") return await fetchPostsByTagApi(tag)
      return await fetchPostsApi(limit, skip)
    },
  })
}
