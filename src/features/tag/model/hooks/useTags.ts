import { useTagsQuery } from '@entities/tag/api'

export function useTags() {
  const { data: tags, isLoading: isTagsLoading } = useTagsQuery()

  return {
    tags: tags ?? [],
    isTagLoading: isTagsLoading,
  }
}
