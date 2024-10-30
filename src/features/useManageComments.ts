import { useAtom } from "jotai"
import useCommentManagement from "./useCommentManagement"
import { newCommentAtom, selectedCommentAtom, showAddCommentDialogAtom, showEditCommentDialogAtom } from "../app/atom"

const useManageComments = () => {
  const { setComments } = useCommentManagement()
  const [selectedComment] = useAtom(selectedCommentAtom)
  const [newComment] = useAtom(newCommentAtom)
  const [, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  const updateComment = async () => {
    if (!selectedComment) return

    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return { addComment, updateComment, deleteComment }
}

export default useManageComments
