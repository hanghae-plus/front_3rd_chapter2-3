import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../../../entities/post/api"

export function useQuerygGetPosts(limit: number, skip: number) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(limit, skip),
    enabled: !!limit && !!skip,
  })
}
