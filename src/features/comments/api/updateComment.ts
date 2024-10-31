import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateComment } from "../../../entities/comments/api"
import { Comment } from "../../../entities/comments/model/types"

export const updateCommentMutation = (selectedPostId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: Comment) => updateComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", selectedPostId] })
    },
  })
}
