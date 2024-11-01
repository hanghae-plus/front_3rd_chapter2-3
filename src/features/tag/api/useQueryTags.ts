import { fetchTag } from "@entities/tag/api"
import { useQuery } from "@tanstack/react-query"
import { Tag } from "@entities/tag/model"

export const useQueryTags = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: fetchTag,
  })
} 