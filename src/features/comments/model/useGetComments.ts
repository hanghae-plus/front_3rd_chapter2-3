import { useQuery } from "@tanstack/react-query"
import { fetchComments } from "../../../entities/comments/api"

const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  })
}

export default useGetComments
