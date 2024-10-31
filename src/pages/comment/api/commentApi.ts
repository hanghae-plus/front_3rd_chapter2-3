import { useState } from "react"
import { Comments, Comment, NewComment } from "../model/types"

const [comments, setComments] = useState<Comments>({})
const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

// 댓글 가져오기
export const fetchComments = async (postId: number) => {
  if (comments?.[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    setComments((prev) => ({ ...prev, [postId]: data.comments }))
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}

// 댓글 추가
export const addComment = async () => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    const data: Comment = await response.json()
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
export const updateComment = async () => {
  try {
    const response = await fetch(`/api/comments/${selectedComment?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment?.body }),
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
export const deleteComment = async (id: number, postId: number) => {
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
export const likeComment = async (id: number, postId: number) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id)?.likes || 0 + 1 }),
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
