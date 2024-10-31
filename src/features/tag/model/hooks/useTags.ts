import { useTagsQuery } from './queries'

export function useTags() {
  const { data: tags, isLoading: isTagsLoading } = useTagsQuery()

  return {
    tags: tags ?? [],
    isTagLoading: isTagsLoading,
  }
}
