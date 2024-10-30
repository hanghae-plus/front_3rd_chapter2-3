import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../entities/posts/api"

export const getPosts = async (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: () => fetchPosts(limit, skip),
  })
}
