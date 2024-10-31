import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeComment } from "../../../entities/comment/api/commentApi.ts"
import { Comment } from "../../../entities/comment/model/types.ts"

export const useLikeCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation<Comment, Error, { commentId: number; likes: number }>({
    mutationFn: ({ commentId, likes }) => likeComment(commentId, likes),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post-detail-comment-list", postId] })
    },
  })
}
