import { useQuery } from "@tanstack/react-query"
import { fetchTagsApi } from "../../../entities/tag/api"

export const useTagsQuery = () =>
  useQuery({
    queryKey: ["tags"],
    queryFn: fetchTagsApi,
  })
