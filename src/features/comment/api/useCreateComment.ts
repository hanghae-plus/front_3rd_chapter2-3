import { useMutation } from "@tanstack/react-query"
import { createComment, mutateKeys } from "@/entities/comment"

export const useCreateComment = (comment: string) => {
  return useMutation({
    mutationFn: async () => {
      return await createComment(comment)
    },
    mutationKey: mutateKeys.CREATE_COMMENT_LIKES_KEY(comment),
  })
}
