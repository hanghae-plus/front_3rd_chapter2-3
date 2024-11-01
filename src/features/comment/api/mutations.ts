import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCommentApi, deleteCommentApi, likeCommentApi, updateCommentApi } from "../../../entities/comment/api"
import { Comment } from "../../../entities/comment/model/types.ts"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCommentApi,
    onSuccess: (newComment: Comment) => {
      queryClient.setQueryData<Comment[]>(["comments", newComment.postId], (prevData) => {
        if (!prevData) return [newComment]
        return [...prevData, newComment]
      })
    },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (updatedComment: Comment) => {
      queryClient.setQueryData<Comment[]>(["comments", updatedComment.postId], (prevData = []) => {
        return prevData.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
      })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (deletedComment: Comment) => {
      queryClient.setQueryData<Comment[]>(["comments", deletedComment.postId], (prevData) => {
        if (!prevData) return

        return prevData.filter((comment) => comment.id !== deletedComment.id)
      })
    },
  })
}

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: likeCommentApi,
    onSuccess: (likedComment: Comment) => {
      queryClient.setQueryData<Comment[]>(["comments", likedComment.postId], (prevData = []) => {
        return prevData.map((comment) =>
          comment.id === likedComment.id ? { ...likedComment, likes: comment.likes + 1 } : comment,
        )
      })
    },
  })
}
