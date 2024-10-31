import { useState } from "react"
import { fetchComments, addComment, updateComment, deleteComment, likeComment } from "../api/comment"
import type { Comment, NewComment } from "../types"
import { atom, useAtom } from "jotai"
interface UseCommentProps {
  comments: Record<number, Comment[]>
  newComment: NewComment
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  selectedComment: Comment | null
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
  handleFetchComments: (postId: number) => Promise<void>
  handleAddComment: (newComment: NewComment) => Promise<Comment | undefined>
  handleUpdateComment: (comment: Comment) => Promise<Comment | undefined>
  handleDeleteComment: (id: number, postId: number) => Promise<boolean>
  handleLikeComment: (id: number, postId: number) => Promise<void>
}

const commentsAtom = atom<Record<number, Comment[]>>({})
const newCommentAtom = atom<NewComment>({
  body: "",
  postId: null,
  userId: 1,
})
const showAddCommentDialogAtom = atom<boolean>(false)
const showEditCommentDialogAtom = atom<boolean>(false)
const selectedCommentAtom = atom<Comment | null>(null)

export const useComment = (): UseCommentProps => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  const handleFetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
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

  const handleLikeComment = async (id: number, postId: number) => {
    const currentComment = comments[postId].find((c) => c.id === id)
    if (!currentComment) return

    const data = await likeComment(id, currentComment.likes)
    if (data) {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    }
  }

  return {
    comments,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
    handleFetchComments,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
    handleLikeComment,
  }
}
