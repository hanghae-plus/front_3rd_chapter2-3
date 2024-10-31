import { deleteComment } from "../../../entities/comment/api/commentApi.ts"
import { useMutation } from "@tanstack/react-query"
import { useCommentStore } from "../../../entities/comment/model/store.ts"

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
