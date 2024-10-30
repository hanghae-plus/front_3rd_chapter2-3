import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../../../entities/posts/api"

export const deletePostMutation = async () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
