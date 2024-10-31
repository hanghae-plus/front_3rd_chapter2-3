import { useQuery } from "@tanstack/react-query"
import { getComments } from "../../../entities/comment/api/commentApi.ts"
import { useCommentStore } from "../../comment/model/store.ts"

export const useQueryCommentList = () => {
  const { postId, comments, setComments } = useCommentStore((state) => state)

  const { data, isLoading } = useQuery(["post-detail-comment-list", postId], () => getComments(postId), {
    onSuccess: (data) => {
      setComments({ [postId]: data })
    },
    onError: (error) => console.error("댓글 가져오기 오류:", error),
    enabled: !comments[postId],
  })

  return { data, isLoading }
}
