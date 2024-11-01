import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../entities/posts/api"

export const getPosts = (limit: number, skip: number, searchQuery: string, selectedTag: string) => {
  return useQuery({
    queryKey: [
      "posts",
      {
        limit,
        skip,
      },
    ],
    queryFn: () => fetchPosts(limit, skip),
    enabled: !searchQuery && selectedTag === "all",
  })
}
