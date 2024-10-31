import { useQuery } from "@tanstack/react-query"
import { fetchGetPost } from "../../../entities/post/api/postApi"

const useQueryPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchGetPost(),
    staleTime: Infinity,
  })
}

export default useQueryPosts
