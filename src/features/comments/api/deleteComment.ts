import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../../../entities/comments/api"

export const deleteCommentMutation = (selectedPostId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", selectedPostId] })
    },
  })
}
