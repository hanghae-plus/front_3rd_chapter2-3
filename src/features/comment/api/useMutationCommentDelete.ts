import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentResponse } from "@entities/comment/model"
import { deleteCommentApi } from "@entities/comment/api"

export const useMutationCommentDelete = () => {
  const queryClient = useQueryClient()

  const removeCommentFromCache = (commentId: number, oldData: CommentResponse) => ({
    ...oldData,
    comments: oldData.comments.filter(comment => comment.id !== commentId),
    total: (oldData?.total || 0) + 1
  })

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (commentId) => {
      queryClient.setQueryData(["comment"], (oldData: CommentResponse) => 
        removeCommentFromCache(commentId, oldData)
      )
    },
  })

  return { deleteComment }
}
