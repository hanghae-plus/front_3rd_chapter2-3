import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../../../entities/tags/api"

export const getTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  })
}
