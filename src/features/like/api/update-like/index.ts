import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateLikeBody, UpdateLikeParams } from "../../../../entities/like/model/types"
import { Comment } from "../../../../entities/comment/model/types"

const updateLike = async (params: UpdateLikeParams & UpdateLikeBody) => {
  const { id, likes } = params

  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  const data = await response.json()

  return data
}

export const useUpdateLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLike,
    onMutate: async (params) => {
      const { id, postId, likes } = params

      await queryClient.cancelQueries({ queryKey: ["comments", postId] })

      const previousComments = queryClient.getQueryData(["comments", postId]) as { comments: Comment[] }

      queryClient.setQueryData(["comments", postId], (old: { comments: Comment[] }) => ({
        ...old,
        comments: old.comments.map((comment) => (comment.id === id ? { ...comment, likes } : comment)),
      }))

      return { previousComments }
    },
  })
}
