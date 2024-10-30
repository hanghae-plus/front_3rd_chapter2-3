import { useQuery } from "@tanstack/react-query"
import { fetchPostsByTag } from "../../../entities/posts/api"

export const getPostsByTag = async (tag: string) => {
  return useQuery({
    queryKey: ["posts", tag],
    queryFn: () => fetchPostsByTag(tag),
  })
}
