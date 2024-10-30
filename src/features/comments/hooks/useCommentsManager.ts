import { useState, useCallback } from 'react'
import { Comment, NewComment } from '../../../entities/comment/model'
import { commentsApi } from '../api'

export const useCommentsManager = () => {
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: 0, userId: 1 })

  const fetchComments = useCallback(async (postId: number) => {
    try {
      const data = await commentsApi.fetchComments(postId)
      setComments(prev => ({ ...prev, [postId]: data }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }, [])

  const addComment = useCallback(async (comment: NewComment) => {
    try {
      const newCommentData = await commentsApi.addComment(comment)
      setComments(prev => ({
        ...prev,
        [comment.postId]: [...(prev[comment.postId] || []), newCommentData]
      }))
      return newCommentData
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }, [])

  const updateComment = useCallback(async (comment: Comment) => {
    try {
      const updatedComment = await commentsApi.updateComment(comment)
      setComments(prev => ({
        ...prev,
        [comment.postId]: prev[comment.postId].map(c => 
          c.id === updatedComment.id ? updatedComment : c
        )
      }))
      return updatedComment
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }, [])

  const deleteComment = useCallback(async (commentId: number, postId: number) => {
    try {
      await commentsApi.deleteComment(commentId)
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(c => c.id !== commentId)
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }, [])

  return {
    comments,
    selectedComment,
    newComment,
    setSelectedComment,
    setNewComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
  }
}
