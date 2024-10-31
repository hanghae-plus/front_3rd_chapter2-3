import { useMutation } from "@tanstack/react-query"
import { patchCommentFetch } from "../../../entities/comment/api"
import { useComment } from "../model/useComment"

const useMutationLikeComment = (id: number, postId: number) => {
  const { setComments, comments } = useComment()
  const likes = (comments[postId].find((c) => c.id === id)?.likes || 0) + 1
  return useMutation({
    mutationFn: () => patchCommentFetch(id, likes),
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    },
    onError: (error) => {
      console.error("댓글 좋아요 오류:", error)
    },
  })
}

export default useMutationLikeComment
