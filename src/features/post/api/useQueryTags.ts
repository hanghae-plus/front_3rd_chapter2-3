import { useQuery } from "@tanstack/react-query"
import { fetchAllTags } from "../../../entities/tag/api/tagApi"

const useQueryTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchAllTags(),
  })
}

export default useQueryTags
