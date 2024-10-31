import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi } from "../api"
import { CommentType, NewCommentType } from "../model/types"

interface CommentMutationState {
  isPending: boolean
  isError: boolean
  error: Error | null
}

export const useMutationComment = (postId: number) => {
  const queryClient = useQueryClient()

  const createMutation = useMutation<Comment, Error, Omit<NewCommentType, "id">>({
    mutationFn: async (comment) => {
      const response = await commentApi.createComment(comment)
      return response.data
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comment[]>(["comments", postId], (old) => {
        if (!old) return [newComment]
        return [...old, newComment]
      })
    },
  })

  const updateMutation = useMutation<CommentType, Error, { id: number; body: string }>({
    mutationFn: async ({ id, body }): Promise<CommentType> => {
      const response = await commentApi.updateComment({ id, body })
      return response.data as CommentType
    },
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<CommentType[]>(["comments", postId], (old = []) => {
        return old.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
      })
    },
  })

  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: commentApi.deleteComment,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<CommentType[]>(["comments", postId], (old = []) => {
        return old.filter((comment) => comment.id !== deletedId)
      })
    },
  })

  const likeMutation = useMutation<CommentType, Error, { id: number; likes: number }>({
    mutationFn: async ({ id, likes }) => {
      const response = await commentApi.likeComment({ id, likes })
      return response.data as CommentType
    },
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<CommentType[]>(["comments", postId], (old = []) => {
        return old.map((comment) =>
          comment.id === updatedComment.id ? { ...updatedComment, likes: comment.likes + 1 } : comment,
        )
      })
    },
  })

  const mutationState: CommentMutationState = {
    isPending:
      createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || likeMutation.isPending,
    isError: createMutation.isError || updateMutation.isError || deleteMutation.isError || likeMutation.isError,
    error: createMutation.error || updateMutation.error || deleteMutation.error || likeMutation.error,
  }

  return {
    mutations: {
      addComment: createMutation.mutate,
      updateComment: updateMutation.mutate,
      deleteComment: deleteMutation.mutate,
      likeComment: likeMutation.mutate,
    },
    state: mutationState,
  }
}
