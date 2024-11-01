import { useMutation } from "@tanstack/react-query"
import { mutateKeys, putPost } from "@/entities/post"

export const usePutPost = (id: number, body: { title: string; body: string }) => {
  return useMutation({
    mutationFn: async () => {
      return await putPost(id, body)
    },
    mutationKey: mutateKeys.DELETE_POST_KEY(id),
  })
}
