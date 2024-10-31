import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentDTO, NewComment, NewCommentDTO } from "../../../entities/comment/model/types"
import { createCommentApi } from "../../../entities/comment/api"

export const useMutationCommentAdd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newComment: NewComment) => createCommentApi(newComment),
    onSuccess: (response: NewCommentDTO) => {
      queryClient.setQueryData(["comments", response.postId], (data: CommentDTO) => {
        const updatedComments = { ...data, comments: [...data.comments, { ...response, likes: 0 }] }
        return updatedComments
      })
    },
  })
}
