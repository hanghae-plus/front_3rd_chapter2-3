import { useCommentStore } from "../../comment/model/store.ts"
import { deleteComment } from "../../../entities/comment/api/commentApi.ts"
import { useMutation } from "@tanstack/react-query"

export const UseMutateCommentDelete = () => {
  const { postId, deleteComments } = useCommentStore((state) => state)

  return useMutation<void, Error, number>(deleteComment, {
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
    onSuccess: (_, commentId) => {
      deleteComments(postId, commentId)
    },
  })
}
