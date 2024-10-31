import { useState } from "react"

import { Comment } from "../../../entities/comment/model/types"
import { commentApi } from "../../../entities/comment/api/commentApi"

interface Comments {
  [key: number]: Comment[]
}

const useManageComments = () => {
  const [comments, setComments] = useState<Comments>([])

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return
    try {
      const data = await commentApi.fetchComments(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  const createComment = async (newComment: Partial<Comment>) => {
    try {
      const data = await commentApi.createComment(newComment)
      setComments((prev) => ({ ...prev, [data.postId]: [...(prev[data.postId] || []), data] }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  const updateComment = async (id: number, body: string) => {
    try {
      const data = await commentApi.updateComment({ id, payload: { body } })
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((c) => (c.id === id ? data : c)),
      }))
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  const deleteComment = async (id: number, postId: number) => {
    try {
      await commentApi.deleteComment(id)
      setComments((prev) => ({ ...prev, [postId]: prev[postId].filter((c) => c.id !== id) }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  const likeComment = async (id: number, postId: number) => {
    try {
      await commentApi.likeComment({ id, payload: { likes: 1 } })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }
  return { comments, fetchComments, createComment, updateComment, deleteComment, likeComment }
}

export default useManageComments
