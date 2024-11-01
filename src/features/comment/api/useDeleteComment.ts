import { useMutation } from "@tanstack/react-query"
import { commentApi } from "../../../entities/comment/api/commentApi"
import { FetchCommentResponse } from "../../../entities/comment/model/types"
import { queryClient } from "../../../shared/api"
import { getCommentsQueryData } from "./getCommentsQueryData"

/** 댓글 삭제 */
export const useDeleteComment = () => {
  return useMutation({
    mutationFn: commentApi.deleteComment,
    onSuccess: (deletedComment) => {
      const [queryKey, { comments }] = getCommentsQueryData()

      const newData: FetchCommentResponse = {
        comments: comments.filter(
          (comment) => comment.id !== deletedComment.id,
        ),
      }

      queryClient.setQueriesData<FetchCommentResponse>({ queryKey }, newData)
    },
  })
}
