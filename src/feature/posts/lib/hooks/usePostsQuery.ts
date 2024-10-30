import { useMutation, useQuery } from "@tanstack/react-query"
import { postsApi } from "../../api/posts.api"
import { UpdatePostData } from "../../model/types"

export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => postsApi.getPosts(limit, skip),
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

export const useAddPostMutation = () => {
  return useMutation({
    mutationKey: ["addPost"],
    mutationFn: (data: { title: string; body: string; userId: number }) =>
      postsApi.addPost(data),
  })
}

export const useUpdatePostMutation = () => {
  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: ({ id, data }: UpdatePostData) => postsApi.updatePost(id, data),
  })
}

export const useDeletePostMutation = (id: number) => {
  return useMutation({
    mutationKey: ["deletePost", { id }],
    mutationFn: () => postsApi.deletePost(id),
  })
}
