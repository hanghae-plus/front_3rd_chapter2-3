import { useState } from "react"
import {
  fetchCommentsApi,
  deleteCommentApi,
  likeCommentApi,
  createCommentApi,
  updateCommentApi,
} from "../../../entities/comment/api"
import { Comment, NewComment } from "../../../entities/comment/model/types"

export const useComments = () => {
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)

  const getComments = (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    fetchCommentsApi(postId).then((data) => {
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    })
  }

  const addComment = async () => {
    const data = await createCommentApi(newComment)

    setComments((prev) => ({
      ...prev,
      [data.postId]: [...(prev[data.postId] || []), data],
    }))
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  const likeComment = (commentId: number, postId: number) => {
    if (!comments[postId]) return

    const targetComment = comments[postId].find((comment) => comment.id === commentId)
    if (!targetComment) return

    const newLike = targetComment.likes + 1

    likeCommentApi(commentId, newLike).then((data) =>
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? { ...comment, likes: newLike } : comment)),
      })),
    )
  }

  const deleteComment = (commentId: number, postId: number) => {
    deleteCommentApi(commentId)

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== commentId),
    }))
  }

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  const updateComment = async () => {
    if (!selectedComment) return
    if (selectedComment.body === "") {
      alert("댓글을 입력해주세요.")
      return
    }

    const data = await updateCommentApi(selectedComment)

    setComments((prev) => ({
      ...prev,
      [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
    }))
    setShowEditCommentDialog(false)
  }

  return {
    comments,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    getComments,
    addComment,
    likeComment,
    deleteComment,

    selectedComment,
    setSelectedComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
    updateComment,
  }
}
