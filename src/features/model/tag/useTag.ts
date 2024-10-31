import { useTagsQuery } from "../../../shared/api/useTagQuery"

export const useTag = () => {
  const { data: tags, isLoading } = useTagsQuery()

  return {
    tags: tags || [],
    isLoading,
  }
}
