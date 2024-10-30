import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePost } from "../../../entities/posts/api"
import { Post } from "../../../entities/posts/model/types"

export const updatePostMutation = async () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: Post) => updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
