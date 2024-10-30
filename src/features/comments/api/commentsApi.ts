import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchComments } from "../../../entities/comments/api/commentsApiUrls"

export const useFetchComments = (postId: number): UseQueryResult<Comment[], Error> => {
  return useQuery<Comment[], Error>(["comments", postId], () => fetchComments(postId))
}
