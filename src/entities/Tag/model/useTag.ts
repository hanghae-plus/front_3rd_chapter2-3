import { useQueryTag } from "../api/useQueryTag"

export const useTags = () => {
  const { data: tags, isLoading: isTagsLoading } = useQueryTag()

  return {
    tagList: tags ?? [],
    isTagLoading: isTagsLoading,
  }
}
