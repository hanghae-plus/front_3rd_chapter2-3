import { Comment } from '../model/types'

export const CommentApi = {
    fetchComments: async (postId: number): Promise<Comment[]> => {
      const response = await fetch(`/api/comments/post/${postId}`)
      if (!response.ok) throw new Error('Failed to fetch comments')
      const data = await response.json()
      return data.comments
    },
  
    createComment: async (comment: Omit<Comment, 'id'>): Promise<Comment> => {
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
      })
      if (!response.ok) throw new Error('Failed to create comment')
      return response.json()
    },
  
    updateComment: async (comment: Comment): Promise<Comment> => {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
      })
      if (!response.ok) throw new Error('Failed to update comment')
      return response.json()
    },
  
    deleteComment: async (commentId: number): Promise<void> => {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete comment')
    },
  
    likeComment: async (commentId: number): Promise<Comment> => {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'PUT'
      })
      if (!response.ok) throw new Error('Failed to like comment')
      return response.json()
    }
  }

  