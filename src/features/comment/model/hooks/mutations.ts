import { Comment, NewComment } from '@entities/comment/model/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi } from '@features/comment/api'

interface CommentMutationState {
  isPending: boolean
  isError: boolean
  error: Error | null
}

export function useCommentMutations(postId: number) {
  const queryClient = useQueryClient()

  const createMutation = useMutation<Comment, Error, Omit<NewComment, 'id'>>({
    mutationFn: commentApi.createComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comment[]>(['comments', postId], (old) => {
        if (!old) return [newComment]
        return [...old, newComment]
      })
    },
  })

  const updateMutation = useMutation<Comment, Error, { id: number; body: string }>({
    mutationFn: commentApi.updateComment,
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comment[]>(['comments', postId], (old = []) => {
        return old.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
      })
    },
  })

  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: commentApi.deleteComment,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Comment[]>(['comments', postId], (old = []) => {
        return old.filter((comment) => comment.id !== deletedId)
      })
    },
  })

  const likeMutation = useMutation<Comment, Error, { id: number; likes: number }>({
    mutationFn: commentApi.likeComment,
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comment[]>(['comments', postId], (old = []) => {
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
