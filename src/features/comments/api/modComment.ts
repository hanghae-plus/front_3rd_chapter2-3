import { useMutation } from "@tanstack/react-query"
import { useComments } from "../../../entities/comments/model"
import { patchCommentLike } from "../../../entities/comments/api"
import { usePost } from "../../../entities/post/model/post"

export function useQueryModCommentLike() {
  // entities
  const { selectedPost } = usePost()
  const { setComments } = useComments()

  // query
  return useMutation({
    mutationFn: patchCommentLike,
    onSuccess: (data) => {
      if (!selectedPost) {
        console.error("댓글 좋아요 오류: 선택한 게시글이 없습니다.")
        return
      }
      setComments((prev) => ({
        ...prev,
        [selectedPost.id]: prev[selectedPost.id].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    },
    onError: (error) => {
      console.error("댓글 좋아요 오류:", error)
    },
  })
}
