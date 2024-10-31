import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentPayload } from "../../../entities/comments/model/types"
import { addComment } from "../../../entities/comments/api"

export const addCommentMutation = (selectedPostId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: CommentPayload) => addComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", selectedPostId] })
    },
  })
}
