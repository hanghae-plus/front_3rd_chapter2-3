import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postApi } from "./postApi"
import { Post, PostsResponse } from "../model/types"

type FetchPostsOptions = {
  limit?: number
  skip?: number
  tag?: string
  q?: string
  sortBy?: string
  sortOrder?: string
}

export const useFetchPostsQuery = (options: FetchPostsOptions) => {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ["fetchPosts", options],
    queryFn: async () => {
      console.log(options)
      try {
        if (options.tag && options.tag !== "all") {
          console.log("tag", options.tag)
          return await postApi.fetchPostsByTag({ tag: options.tag })
        }
        if (options.q) {
          return await postApi.searchPosts({ q: options.q })
        }
        return await postApi.fetchPosts({ limit: options.limit || 10, skip: options.skip || 0 })
      } catch (error) {
        console.error("게시물 가져오기 오류:", error)
        throw error
      }
    },
  })

  const addToPostQuery = (post: Post) => {
    queryClient.setQueryData(["fetchPosts", options], (old: PostsResponse) => ({
      ...old,
      posts: [...(old?.posts || []), post],
    }))
  }

  const updatePostQuery = (post: Post) => {
    queryClient.setQueryData(["fetchPosts", options], (old: PostsResponse) => ({
      ...old,
      posts: old?.posts?.map((p: Post) => (p.id === post.id ? post : p)) || [],
    }))
  }

  const removePostQuery = (id: number) => {
    queryClient.setQueryData(["fetchPosts", options], (old: PostsResponse) => ({
      ...old,
      posts: old?.posts?.filter((p: Post) => p.id !== id) || [],
    }))
  }

  return { query, addToPostQuery, updatePostQuery, removePostQuery }
}

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: async (payload: Partial<Post>) => {
      try {
        return await postApi.createPost(payload)
      } catch (error) {
        console.error("게시물 생성 오류:", error)
        throw error
      }
    },
  })
}

export const useUpdatePostMutation = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<Post> }) => {
      try {
        return await postApi.updatePost({ id, payload })
      } catch (error) {
        console.error("게시물 수정 오류:", error)
        throw error
      }
    },
  })
}

export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        return await postApi.deletePost(id)
      } catch (error) {
        console.error("게시물 삭제 오류:", error)
        throw error
      }
    },
  })
}
