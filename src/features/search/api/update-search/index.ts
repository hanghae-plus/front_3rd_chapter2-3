import { useMutation } from "@tanstack/react-query"
import { PostsResponse } from "../../../../entities/post/model/types"

const searchPosts = async (query: string): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/search?q=${query}`)
  const data = await response.json()

  return data
}

export const useSearchPosts = () => {
  return useMutation({
    mutationFn: searchPosts,
  })
}
