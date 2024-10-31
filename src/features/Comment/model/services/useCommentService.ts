import { commentApi } from "../../../../entities/Comment/api/commentApi"
import { useCommentStore } from "../stores/useCommentStore"

export const useCommentService = () => {
  const {
    comments,
    selectedComment,
    newComment,
    setComments,
    setNewComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
  } = useCommentStore()

  // 댓글 조회
  const fetchComments = async (postId: string | number) => {
    if (comments[postId]) return
    try {
      const fetchedComments = await commentApi.getComments(postId)
      setComments((prev) => ({
        ...prev,
        [postId]: Array.isArray(fetchedComments) ? fetchedComments : [],
      }))
    } catch (error) {
      console.error("댓글 조회 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    if (!newComment.postId) return
    try {
      const addedComment = await commentApi.createComment(
        newComment as { body: string; postId: string | number; userId: number },
      )
      setComments((prev) => ({
        ...prev,
        [addedComment.postId]: [...(prev[addedComment.postId] || []), addedComment],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 수정
  const editComment = async () => {
    if (!selectedComment) return
    try {
      const updatedComment = await commentApi.updateComment(selectedComment.id, selectedComment.body)
      setComments((prev) => ({
        ...prev,
        [updatedComment.postId]: prev[updatedComment.postId].map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }

  // 댓글 삭제
  const removeComment = async (id: number, postId: string | number) => {
    try {
      await commentApi.deleteComment(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return {
    fetchComments,
    addComment,
    editComment,
    removeComment,
  }
}
