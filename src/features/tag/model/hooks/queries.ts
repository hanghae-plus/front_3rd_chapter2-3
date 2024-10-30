import { Tag } from '@entities/model/types'
import { tagApi } from '@features/tag/api'
import { useQuery } from '@tanstack/react-query'

const DEFAULT_STALE_TIME = 5 * 60 * 1000 // 5분

export function useTagsQuery() {
  return useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: tagApi.fetchTags,
    staleTime: DEFAULT_STALE_TIME,
  })
}
