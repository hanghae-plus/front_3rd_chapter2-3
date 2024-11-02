import { useQuery } from "@tanstack/react-query"
import { Post } from "../../model/types"

export const fetchTaggedPosts = async (tag: string): Promise<{ posts: Post[] }> => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()

  return data
}

export const useTaggedPosts = (tag: string) => {
  return useQuery({
    queryKey: ["tagged-posts"],
    queryFn: () => fetchTaggedPosts(tag),
    initialData: { posts: [] },
    enabled: !!tag && tag !== "all",
  })
}
