import { useQuery } from "@tanstack/react-query"
import { searchPosts } from "../../../entities/posts/api"

export const getSearchPosts = (keyword: string) => {
  return useQuery({
    queryKey: ["posts", keyword],
    queryFn: () => searchPosts(keyword),
  })
}
