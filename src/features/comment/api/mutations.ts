import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCommentApi } from "../../../entities/comment/api"
import { NewComment } from "../../../entities/comment/model/types.ts"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCommentApi,
    onSuccess: (newComment: NewComment) => {
      queryClient.setQueryData<Comment>(["comments", newComment.postId], (prevData) => {
        if (!prevData) return [newComment]
        return [...prevData, newComment]
      })
    },
  })
}
