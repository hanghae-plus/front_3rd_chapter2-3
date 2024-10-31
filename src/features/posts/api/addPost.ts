import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPost } from "../../../entities/posts/api"
import { PostPayload } from "../../../entities/posts/model/types"

export const addPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: PostPayload) => addPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
