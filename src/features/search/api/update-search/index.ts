import { useMutation } from "@tanstack/react-query"
import { Post } from "../../../../entities/post/model/types"

const searchPosts = async (query: string): Promise<{ posts: Post[] }> => {
  const response = await fetch(`/api/posts/search?q=${query}`)
  const data = await response.json()

  return data
}

export const useSearchPosts = () => {
  return useMutation({
    mutationFn: searchPosts,
  })
}
