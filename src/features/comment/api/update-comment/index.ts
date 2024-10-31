import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment, UpdateCommentBody } from "../../../../entities/comment/model/types"

const updateComment = async (body: UpdateCommentBody): Promise<Comment> => {
  const { comment } = body

  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })
  const data = await response.json()

  return data
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComment,
    onMutate: async (body) => {
      const { comment: newComment } = body

      console.log(newComment)

      await queryClient.cancelQueries({ queryKey: ["comments", newComment.postId] })

      const previousComments = queryClient.getQueryData(["comments", newComment.postId]) as { comments: Comment[] }

      queryClient.setQueryData(["comments", newComment.postId], (old: { comments: Comment[] }) => ({
        ...old,
        comments: old.comments.map((comment) => (comment.id === newComment.id ? newComment : comment)),
      }))

      return { previousComments }
    },
  })
}
