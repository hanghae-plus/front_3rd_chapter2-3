import { useQuery } from '@tanstack/react-query'
import { postApi, PostsResponse } from '@features/post/api'
import { DEFAULT_STALE_TIME } from '@entities/comment/model/constants'

export interface PostsQueryProps {
  limit: number
  skip: number
  tag: string
  searchQuery: string
}

export function usePostsQuery({ limit, skip, tag, searchQuery }: PostsQueryProps) {
  return useQuery<PostsResponse, Error>({
    queryKey: ['posts', { limit, skip, tag, searchQuery }],
    queryFn: async () => {
      if (searchQuery) return postApi.searchPosts(searchQuery)
      if (tag && tag !== 'all') return postApi.fetchPostsByTag(tag)
      return postApi.fetchPosts({ limit, skip })
    },
    staleTime: DEFAULT_STALE_TIME,
  })
}
