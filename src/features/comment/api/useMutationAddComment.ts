import { useMutation } from "@tanstack/react-query"
import { postCommentFetch } from "../../../entities/comment/api"
import { useComment } from "../model/useComment"

const useMutationAddComment = () => {
  const { newComment, setNewComment, setComments, setShowAddCommentDialog } = useComment()
  return useMutation({
    mutationFn: () => postCommentFetch(newComment),
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error)
    },
  })
}

export default useMutationAddComment
