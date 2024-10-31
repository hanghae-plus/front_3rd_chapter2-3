import { DEFAULT_STALE_TIME } from '@entities/comment/model/constants'
import { Tag } from '@entities/comment/model/types'
import { tagApi } from '@features/tag/api'
import { useQuery } from '@tanstack/react-query'

export function useTagsQuery() {
  return useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: tagApi.fetchTags,
    staleTime: DEFAULT_STALE_TIME,
  })
}
