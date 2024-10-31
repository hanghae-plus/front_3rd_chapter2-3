import { useQuery } from "@tanstack/react-query"
import { fetchTagsFetch } from "../../../entities/post/api"

const useQueryTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTagsFetch(),
  })
}

export default useQueryTags
