import { useState } from "react"
import { Comment } from "../../../shared/types"

const useComments = () => {
  const [comments, setComments] = useState<Record<number, Comment[]>>({})

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<{ body: string; postId: number | null; userId: number }>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
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
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

    // 댓글 업데이트
    const updateComment = async () => {
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


        // 댓글 삭제
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



  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }


  
  return { comments, fetchComments, addComment, updateComment, deleteComment, likeComment,  selectedComment, newComment, showAddCommentDialog, showEditCommentDialog}
}

export default useComments;