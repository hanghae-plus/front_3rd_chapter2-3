import { useMutation } from "@tanstack/react-query"
import { deleteCommentFetch } from "../../../entities/comment/api"
import { useComment } from "../model/useComment"

const useMutationDeleteComment = (id: number, postId: number) => {
  const { setComments } = useComment()
  return useMutation({
    mutationFn: () => deleteCommentFetch(id),
    onSuccess: () => {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
  })
}

export default useMutationDeleteComment
