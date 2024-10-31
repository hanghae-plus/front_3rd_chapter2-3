import { useQuery } from "@tanstack/react-query"
import { tagApi } from "."
import { TagType } from "../model/types"

export const useQueryTag = () => {
  return useQuery<TagType[], Error>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await tagApi.fetchTags()
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
