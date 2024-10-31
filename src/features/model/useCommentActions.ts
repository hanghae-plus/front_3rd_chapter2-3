import { useAtom } from "jotai"
import { commentsAtom } from "../../entities/model/comment/atoms"
import type { NewComment, Comment } from "../../shared/types"
import { fetchComments, addComment, updateComment, deleteComment } from "../../shared/api/comment"

export const useCommentActions = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  const handleFetchComments = async (postId: number) => {
    if (comments[postId]) return
    const data = await fetchComments(postId)
    if (data) {
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    }
  }

  const handleAddComment = async (newComment: NewComment) => {
    const data = await addComment(newComment)
    if (data) {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      return data
    }
  }

  const handleUpdateComment = async (comment: Comment) => {
    const data = await updateComment(comment)
    if (data) {
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((c) => (c.id === data.id ? data : c)),
      }))
      return data
    }
  }

  const handleDeleteComment = async (id: number, postId: number) => {
    const success = await deleteComment(id)
    if (success) {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    }
    return success
  }

  return {
    handleFetchComments,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
  }
}
