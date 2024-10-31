import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NewPostType, PostMutationState, PostsResponseType, PostType } from "../model/types"
import { postApi } from "."

export const useMutationPost = () => {
  const queryClient = useQueryClient()
  const { createPost, updatePost, deletePost } = postApi

  const createMutation = useMutation<PostType, Error, NewPostType>({
    mutationFn: async (newPost: NewPostType) => {
      const response = await createPost(newPost)
      return response.data
    },
    onSuccess: (newPost: NewPostType) => {
      queryClient.setQueriesData<PostsResponseType>({ queryKey: ["posts"] }, (old) => {
        if (!old) return { posts: [newPost], total: 1, users: [], skip: 0 }
        return {
          ...old,
          posts: [newPost, ...old.posts],
          total: old.total + 1,
        }
      })
    },
  })

  const updateMutation = useMutation<PostType, Error, PostType>({
    mutationFn: async (post: PostType) => {
      const response = await updatePost(post)
      return response.data
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueriesData<PostsResponseType>({ queryKey: ["posts"] }, (old) => {
        if (!old) return
        return {
          ...old,
          posts: old.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        }
      })
    },
  })

  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      queryClient.setQueriesData<PostsResponseType>({ queryKey: ["posts"] }, (old) => {
        if (!old) return
        return {
          ...old,
          posts: old.posts.filter((post) => post.id !== deletedId),
          total: old.total - 1,
        }
      })
    },
  })

  const mutationState: PostMutationState = {
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
