import { useMutation } from "@tanstack/react-query"
import { deleteComment, mutateKeys } from "@/entities/comment"

export const useDeleteComment = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await deleteComment(id)
    },
    mutationKey: mutateKeys.DELETE_COMMENT_LIKES_KEY(id),
  })
}
