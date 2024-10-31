import { useMutation } from "@tanstack/react-query"
import { editComment } from "../../../entities/comment/api/commentApi.ts"
import { useCommentStore } from "../../../entities/comment/model/store.ts"

interface EditCommentParams {
  commentId: number
  body: string
}

export const useEditCommentMutation = (setShowEditCommentDialog: (open: boolean) => void) => {
  const { postId, updateComments } = useCommentStore((state) => state)

  return useMutation(({ commentId, body }: EditCommentParams) => editComment(commentId, { body }), {
    onError: (error) => {
      console.error("댓글 업데이트 오류:", error)
    },
    onSuccess: (_, { commentId, body }) => {
      setShowEditCommentDialog(false)
      updateComments(postId, commentId, body)
    },
  })
}
