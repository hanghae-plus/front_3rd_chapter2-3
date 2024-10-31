import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postsApi } from "../../api/posts.api"
import { Post, UpdatePostData } from "../../model/types"
import { CACHE_CONFIG, ERROR_MESSAGES } from "../../config/posts.config"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) =>
    [...postKeys.lists(), filters] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
  byTag: (tag: string) => [...postKeys.all, "tag", tag] as const,
} as const

export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => postsApi.getPosts(limit, skip),
    staleTime: CACHE_CONFIG.STALE_TIME,
    retry: CACHE_CONFIG.RETRY_COUNT,
  })
}

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => postsApi.getTags(),
  })
}

export const useSearchPostsQuery = (query: string) => {
  const trimmedQuery = query.trim()

  return useQuery({
    queryKey: ["posts", "search", { query: trimmedQuery }],
    queryFn: () => postsApi.searchPosts(trimmedQuery),
    enabled: trimmedQuery !== "" && trimmedQuery.length > 0,
  })
}

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ["tag", { tag }],
    queryFn: () => postsApi.getPostsByTag(tag),
  })
}

export const useAddPostMutation = (limit: number, skip: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { title: string; body: string; userId: number }) =>
      postsApi.addPost(data),
    onSuccess: (newPost) => {
      const previousData = queryClient.getQueryData<{
        posts: Post[]
        total: number
      }>(["posts", { limit, skip }])
      if (previousData) {
        const updatedPosts = [newPost, ...previousData.posts.slice(0, -1)]
        queryClient.setQueryData(["posts", { limit, skip }], {
          posts: updatedPosts,
          total: previousData.total + 1,
        })
      }
    },
    onError: (error) => {
      console.error(`${ERROR_MESSAGES.ADD_ERROR}`, error)
    },
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: ({ id, data }: UpdatePostData) => postsApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
    onError: (error) => {
      console.error(`${ERROR_MESSAGES.UPDATE_ERROR}`, error)
    },
  })
}

export const useDeletePostMutation = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deletePost", { id }],
    mutationFn: () => postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
    onError: (error) => {
      console.error(`${ERROR_MESSAGES.DELETE_ERROR}`, error)
    },
  })
}
