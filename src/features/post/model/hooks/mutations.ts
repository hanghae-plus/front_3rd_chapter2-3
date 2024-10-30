import { Post, NewPost } from '@entities/model/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi, PostsResponse } from '@features/post/api'

interface MutationState {
  isPending: boolean
  isError: boolean
  error: Error | null
}

export function usePostMutations() {
  const queryClient = useQueryClient()

  const createMutation = useMutation<Post, Error, NewPost>({
    mutationFn: postApi.createPost,
    onSuccess: (newPost) => {
      queryClient.setQueriesData<PostsResponse>({ queryKey: ['posts'] }, (old) => {
        if (!old) return { posts: [newPost], total: 1, users: [], skip: 0 }
        return {
          ...old,
          posts: [newPost, ...old.posts],
          total: old.total + 1,
        }
      })
    },
  })

  const updateMutation = useMutation<Post, Error, Post>({
    mutationFn: postApi.updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueriesData<PostsResponse>({ queryKey: ['posts'] }, (old) => {
        if (!old) return
        return {
          ...old,
          posts: old.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        }
      })
    },
  })

  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: postApi.deletePost,
    onSuccess: (deletedId) => {
      queryClient.setQueriesData<PostsResponse>({ queryKey: ['posts'] }, (old) => {
        if (!old) return
        return {
          ...old,
          posts: old.posts.filter((post) => post.id !== deletedId),
          total: old.total - 1,
        }
      })
    },
  })

  const mutationState: MutationState = {
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    isError: createMutation.isError || updateMutation.isError || deleteMutation.isError,
    error: createMutation.error || updateMutation.error || deleteMutation.error,
  }

  return {
    mutations: {
      addPost: createMutation.mutate,
      updatePost: updateMutation.mutate,
      deletePost: deleteMutation.mutate,
    },
    state: mutationState,
  }
}
