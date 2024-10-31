import { useQuery } from "@tanstack/react-query"
import { fetchCommentsApi } from "../../../entities/comment/api"

export const useCommentsQuery = (postId: number) =>
  useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsApi(postId),
  })
