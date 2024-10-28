import { Comment, NewComment } from '../../../entity/comment/model'

export const commentsApi = {
  fetchComments: async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data: { comments: Comment[] } = await response.json()
    return data.comments
  },

  addComment: async (comment: NewComment): Promise<Comment> => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    return response.json()
  },

  updateComment: async (comment: Comment): Promise<Comment> => {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: comment.body }),
    })
    return response.json()
  },

  deleteComment: async (commentId: number): Promise<void> => {
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
  },

  likeComment: async (commentId: number, likes: number): Promise<Comment> => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    return response.json()
  }
}
