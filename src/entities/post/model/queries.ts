import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postsAPI } from "../api/posts"
import type { Post } from "./types"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number; tag?: string }) => [...postKeys.lists(), filters] as const,
  search: (query: string) => [...postKeys.lists(), "search", query] as const,
}

export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: postKeys.list({ limit, skip }),
    queryFn: () => postsAPI.getPosts(limit, skip),
  })
}

export const usePostsByTagQuery = (tag: string, limit: number, skip: number) => {
  return useQuery({
    queryKey: postKeys.list({ limit, skip, tag }),
    queryFn: () => postsAPI.getPostsByTag(tag),
    enabled: !!tag && tag !== "all",
  })
}

export const useSearchPostsQuery = (query: string) => {
  return useQuery({
    queryKey: postKeys.search(query),
    queryFn: () => postsAPI.searchPosts(query),
    enabled: !!query,
  })
}

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => postsAPI.addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: Post) => postsAPI.updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postsAPI.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}
