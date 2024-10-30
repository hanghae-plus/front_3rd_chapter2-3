import { Comment } from "../model/types"

const BASE_URL = "/api/comments"

export const commentsAPI = {
  getComments: async (postId: number): Promise<{ comments: Comment[] }> => {
    const response = await fetch(`${BASE_URL}/post/${postId}`)
    return response.json()
  },

  addComment: async (comment: Omit<Comment, "id" | "user" | "likes">): Promise<Comment> => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    return response.json()
  },

  updateComment: async (commentId: number, body: string): Promise<Comment> => {
    const response = await fetch(`${BASE_URL}/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    })
    return response.json()
  },

  deleteComment: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  },

  likeComment: async (id: number, likes: number): Promise<Comment> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    return response.json()
  },
}
