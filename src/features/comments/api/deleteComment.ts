import { useMutation } from "@tanstack/react-query"
import { useComments } from "../../../entities/comments/model"
import { deleteComment } from "../../../entities/comments/api"
import { usePost } from "../../../entities/post/model/post"

export function useQueryDeleteComment() {
  // entities
  const { selectedPost } = usePost()
  const { setComments } = useComments()

  // query
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (commentId) => {
      if (!selectedPost) {
        console.error("댓글 삭제 오류: 선택한 게시글이 없습니다.")
        return
      }
      setComments((prev) => ({
        ...prev,
        [selectedPost.id]: prev[selectedPost.id].filter((comment) => comment.id !== commentId),
      }))
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
  })
}
