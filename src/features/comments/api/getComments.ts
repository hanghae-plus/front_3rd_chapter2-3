import { useQuery } from "@tanstack/react-query"
import { getComments } from "../../../entities/comments/api"

export function useQuerygGetComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  })
}
