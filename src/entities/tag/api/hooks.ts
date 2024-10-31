import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "./api"

export const useQueryTags = () => {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  })

  return query
}
