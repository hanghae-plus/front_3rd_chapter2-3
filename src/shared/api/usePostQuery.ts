import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as postApi from "./post"
import type { Post, NewPost } from "../types"
import { PostsDTO } from "../types/post"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [...postKeys.lists(), filters] as const,
  byTag: (tag: string) => [...postKeys.lists(), "tag", tag] as const,
  search: (query: string) => [...postKeys.lists(), "search", query] as const,
  detail: (id: number) => [...postKeys.all, "detail", id] as const,
}

export const usePostQuery = (params: { limit: number; skip: number }) => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postApi.fetchPosts(params),
  })
}

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: postKeys.byTag(tag),
    queryFn: () => postApi.fetchPostsByTag(tag),
    enabled: !!tag,
  })
}

export const useSearchPostsQuery = (query: string) => {
  return useQuery({
    queryKey: postKeys.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: !!query,
  })
}

export const usePostMutations = () => {
  const queryClient = useQueryClient()

  const addPostMutation = useMutation({
    mutationFn: (newPost: NewPost) => postApi.addPost(newPost),
    onSuccess: (response) => {
      const queries = queryClient.getQueriesData({ queryKey: postKeys.lists() })

      queries.forEach(([queryKey]) => {
        queryClient.setQueryData(queryKey, (oldData: PostsDTO) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            posts: [
              {
                ...response,
                reactions: { likes: 0, dislikes: 0 },
                views: 0,
                tags: [],
              },
              ...oldData.posts,
            ],
            total: oldData.total + 1,
          }
        })
      })
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: (post: Post) => postApi.updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })

  return {
    addPostMutation,
    updatePostMutation,
    deletePostMutation,
  }
}
