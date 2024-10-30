import { commentApi } from '@features/comment/api'
import { useQuery } from '@tanstack/react-query'
import type { Comment } from '@entities/model/types'

const DEFAULT_STALE_TIME = 5 * 60 * 1000

export function useCommentsQuery(postId: number) {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { comments } = await commentApi.fetchComments(postId)
      return comments
    },
    staleTime: DEFAULT_STALE_TIME,
  })
}
