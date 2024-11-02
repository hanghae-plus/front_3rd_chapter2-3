import { commentApi } from '@entities/comment/api'
import { useQuery } from '@tanstack/react-query'
import type { Comment } from '@entities/comment/model/comment.types'
import { DEFAULT_STALE_TIME } from '@entities/common/constants'

export function useCommentsQuery(postId: number) {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { comments } = await commentApi.fetchComments(postId)
      return comments
    },
    staleTime: DEFAULT_STALE_TIME,
    enabled: postId !== 0,
  })
}
