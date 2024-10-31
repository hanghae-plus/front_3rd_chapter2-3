import { useQuery } from '@tanstack/react-query'
import { postApi, PostsResponse } from '@features/post/api'
import { PostsQueryProps } from '@entities/comment/model/types'
import { DEFAULT_STALE_TIME } from '@entities/comment/model/constants'

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
