import { useQuery } from "@tanstack/react-query"
import { tagApi } from "../../../entities/tag/api/tagApi"

export const tagKeys = {
  all: ["tags"],
}

export const useTags = () => {
  return useQuery({
    queryKey: tagKeys.all,
    queryFn: () => tagApi.get.tags(),
  })
}
