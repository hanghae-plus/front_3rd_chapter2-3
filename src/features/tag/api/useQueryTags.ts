import { fetchTag } from "@entities/tag/api"
import { useQuery } from "@tanstack/react-query"
import { Tag } from "../model"

export const useQueryTags = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: fetchTag,
  })
} 