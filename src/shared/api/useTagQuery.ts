import { useQuery } from "@tanstack/react-query"
import * as tagApi from "./tag"

export const tagKeys = {
  all: ["tags"] as const,
}

export const useTagsQuery = () => {
  return useQuery({
    queryKey: tagKeys.all,
    queryFn: tagApi.fetchTags,
  })
}
