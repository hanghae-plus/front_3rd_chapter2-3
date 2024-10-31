import { useMutation } from "@tanstack/react-query"
import { postComment } from "../../../entities/comments/api"
import { useComments } from "../../../entities/comments/model"

export function useQueryAddComment() {
  const { setComments, setShowAddCommentDialog, setNewComment } = useComments()
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    },
    onError: (error) => {
      console.error("Failed to add comment:", error)
    },
  })
}
