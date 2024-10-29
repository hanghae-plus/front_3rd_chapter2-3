import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment, CommentDTO } from "../../../entities/comment/model/types"
import { updateCommentApi } from "../../../entities/comment/api"

export const useMutationCommentUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (selectedComment: Comment) => updateCommentApi(selectedComment),
    onSuccess: (response: Comment) => {
      queryClient.setQueryData(["comments", response.postId], (data: CommentDTO) => {
        const updatedComments = {
          ...data,
          comments: data.comments.map((comment) => (comment.id === response.id ? response : comment)),
        }
        return updatedComments
      })
    },
  })
}
