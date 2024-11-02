import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment, DeleteCommentParams } from "../../../../entities/comment/model/types"

const deleteComment = async (params: DeleteCommentParams) => {
  const { id } = params

  return await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (params) => {
      const { id, postId } = params

      await queryClient.cancelQueries({ queryKey: ["comments", postId] })

      const previousComments = queryClient.getQueryData(["comments", postId])

      queryClient.setQueryData(["comments", postId], (old: { comments: Comment[] }) => ({
        ...old,
        comments: old.comments.filter((comment) => comment.id !== id),
      }))

      return { previousComments }
    },
  })
}
