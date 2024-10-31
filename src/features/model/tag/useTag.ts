import { useTagsQuery } from "../../../entities/api/tag/useTagQuery"

export const useTag = () => {
  const { data: tags, isLoading } = useTagsQuery()

  return {
    tags: tags || [],
    isLoading,
  }
}
