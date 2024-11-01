import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentLikeUpdate } from "../../../entities/comments/model/types"
import { likeComment } from "../../../entities/comments/api"

export const likeCommentMutation = (selectedPostId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: CommentLikeUpdate) =>
      likeComment({
        id: comment.id,
        likes: comment.likes + 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", selectedPostId] })
    },
  })
}
