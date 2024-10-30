import { useQuery } from "@tanstack/react-query"
import { getComments } from "../../../entities/comment/api/commentApi.ts"

export const useQueryCommentList = (postId: number) => {
  const { data, isLoading } = useQuery(["comment-list", postId], () => getComments(postId), {
    onError: (error) => console.error("댓글 가져오기 오류:", error),
  })

  return { data, isLoading }
}
