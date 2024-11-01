import { useMutation } from "@tanstack/react-query"
import { deletePost, mutateKeys } from "@/entities/post"

export const useDeletePost = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await deletePost(id)
    },
    mutationKey: mutateKeys.DELETE_POST_KEY(id),
  })
}
