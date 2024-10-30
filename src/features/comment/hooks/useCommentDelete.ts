import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentsFetchResult } from "@features/comment/types"
import { deleteCommentApi } from "../api/deleteComment"

export const useCommentDelete = () => {
  const queryClient = useQueryClient()

  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (commentId: number) => {
      queryClient.setQueryData(["comment"], (oldData: CommentsFetchResult) => ({
        limit: oldData.limit,
        skip: oldData.skip,
        comments: oldData.comments.filter(
          (comment) => comment.id !== commentId,
        ),
        total: (oldData?.total || 0) + 1,
      }))
    },
  })

  const deleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId)
  }

  return { deleteComment }
}
