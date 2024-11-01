import { useMutation, useQuery } from "@tanstack/react-query"
import { postApi } from "./postApi"
import { Post } from "../model/types"

type FetchPostsOptions = {
  limit?: number
  skip?: number
  tag?: string
  q?: string
  sortBy?: string
  sortOrder?: string
}

export const useFetchPostsQuery = (options: FetchPostsOptions) => {
  return useQuery({
    queryKey: ["fetchPosts", options],
    queryFn: async () => {
      try {
        if (options.tag && options.tag !== "all") {
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
