import { useMutation } from "@tanstack/react-query"
import { putCommentFetch } from "../../../entities/comment/api"
import { useComment } from "../model/useComment"

const useMutationUpdateComment = () => {
  const { setComments, selectedComment, setShowEditCommentDialog } = useComment()
  return useMutation({
    mutationFn: () => putCommentFetch(selectedComment?.id as number, selectedComment?.body as string),
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    },
    onError: (error) => {
      console.error("댓글 업데이트 오류:", error)
    },
  })
}

export default useMutationUpdateComment
