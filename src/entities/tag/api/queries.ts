import { DEFAULT_STALE_TIME } from '@entities/common/constants'
import { Tag } from '@entities/tag/model/tag.types'
import { tagApi } from '@entities/tag/api'
import { useQuery } from '@tanstack/react-query'

export function useTagsQuery() {
  return useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: tagApi.fetchTags,
    staleTime: DEFAULT_STALE_TIME,
  })
}
