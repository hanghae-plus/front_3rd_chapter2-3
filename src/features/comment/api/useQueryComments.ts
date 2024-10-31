import { useQuery } from "@tanstack/react-query"
import { fetchCommentsFetch } from "../../../entities/comment/api"

const useQueryComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsFetch(postId),
  })
}

export default useQueryComments
