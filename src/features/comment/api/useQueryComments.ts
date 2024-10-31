import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { CommentDTO } from "../../../entities/comment/model/types"
import { fetchCommentsApi } from "../../../entities/comment/api"

export const useQueryComments = (postId: number): UseQueryResult<CommentDTO> => {
  return useQuery<CommentDTO, Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsApi(postId),
  })
}
