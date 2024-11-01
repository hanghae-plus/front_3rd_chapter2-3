import { useMutation } from "@tanstack/react-query"
import { mutateKeys, putComment } from "@/entities/comment"

export const usePutCommentLikes = (id: number, likes: number) => {
  return useMutation({
    mutationFn: async () => {
      return await putComment(id, likes)
    },
    mutationKey: mutateKeys.PUT_COMMENT_LIKES_KEY(id, likes),
  })
}
