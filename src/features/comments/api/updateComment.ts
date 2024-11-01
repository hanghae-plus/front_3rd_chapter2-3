import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateComment } from "../../../entities/comments/api"
import { Comment } from "../../../entities/comments/model/types"

export const updateCommentMutation = (selectedPostId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: Comment) => updateComment(comment),
    onSuccess: (updatedComment) => {
      queryClient.setQueryData(["comments", selectedPostId], (oldComments: Comment[]) => {
        if (!oldComments) return [updatedComment]

        return oldComments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
      })
    },
  })
}
