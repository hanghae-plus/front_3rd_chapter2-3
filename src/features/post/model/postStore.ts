import { useMutation, useQuery } from "@tanstack/react-query"
import { postsApi, PostsResponse } from "../api"
import { queryKeys } from "../../../lib/query/queryKeys"
import { queryClient } from "../../../lib/query/queryClient"
import { Post } from "../../../entities/post/model/types"
import { removeFromPosts, updateInPosts } from "../../../entities/post/model/utils"
import { atom, useAtom } from "jotai"

export interface PostsQueryFilters {
  skip?: number
  limit?: number
  searchQuery?: string
  sortBy?: string
  sortOrder?: string
  selectedTag?: string
}

export const usePostsQuery = (filters: PostsQueryFilters) => {
  return useQuery({
    queryKey: queryKeys.posts.list(filters),
    queryFn: async () => {
      if (filters.searchQuery) {
        return postsApi.search(filters.searchQuery)
      }
      if (filters.selectedTag && filters.selectedTag !== "all") {
        return postsApi.fetchByTag(filters.selectedTag)
      }
      return postsApi.fetchAll(filters)
    },
  })
}

export const usePostMutations = () => {
  const createPost = useMutation({
    mutationFn: postsApi.create,
    onSuccess: (newPost: Post) => {
      // 목록 쿼리 데이터 업데이트
      queryClient.setQueriesData<PostsResponse>(queryKeys.posts.lists(), (prev) => {
        if (!prev) return prev
        return {
          posts: [newPost, ...prev.posts],
          total: prev.total + 1,
        }
      })
    },
  })

  const updatePost = useMutation({
    mutationFn: postsApi.update,
    onSuccess: (updatedPost) => {
      // 상세 쿼리 데이터 업데이트
      queryClient.setQueryData(queryKeys.posts.detail(updatedPost.id), updatedPost)

      // 목록 쿼리 데이터 업데이트
      queryClient.setQueriesData<PostsResponse>(queryKeys.posts.lists(), (prev) => {
        if (!prev) return prev
        return {
          ...prev,
          posts: updateInPosts(prev.posts, updatedPost),
        }
      })
    },
  })

  const deletePost = useMutation({
    mutationFn: postsApi.delete,
    onSuccess: (deletedPostId) => {
      // 상세 쿼리 데이터 제거
      queryClient.removeQueries(queryKeys.posts.detail(deletedPostId))

      // 목록 쿼리 데이터 업데이트
      queryClient.setQueriesData<PostsResponse>(queryKeys.posts.lists(), (prev) => {
        if (!prev) return prev
        return {
          posts: removeFromPosts(prev.posts, deletedPostId),
          total: prev.total - 1,
        }
      })
    },
  })

  return { createPost, updatePost, deletePost }
}

export const invalidatePostQueries = () => {
  queryClient.invalidateQueries(queryKeys.posts.all)
}

export const prefetchPost = async (id: number) => {
  await queryClient.prefetchQuery(queryKeys.posts.detail(id), () => postsApi.fetchOne(id))
}

const seletedPostAtom = atom<Post | null>(null)

export const usePosts = () => {
  const [selectedPost, setSelectedPost] = useAtom(seletedPostAtom)

  return {
    selectedPost,
    setSelectedPost,
  }
}
