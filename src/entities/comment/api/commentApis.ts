import { Comment_i, Comments_i, NewComment_i } from "../model/types"

export const commentApi = {
  addComment: async (newComment: NewComment_i): Promise<Comment_i> => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })

    if (!response.ok) {
      throw new Error("댓글 추가 실패")
    }

    return response.json()
  },

  deleteComment: async (id: number) => {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
  },

  fetchComment: async (postId: number): Promise<Comments_i> => {
    const response = await fetch(`/api/comments/post/${postId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error("댓글 가져오기 실패")
    }

    return response.json()
  },

  likeComment: async (id: number, comment: Comment_i): Promise<Comment_i> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: comment.likes + 1 }),
    })

    if (!response.ok) {
      throw new Error("댓글 추가 실패")
    }

    return response.json()
  },

  updateComment: async (newComment: Comment_i): Promise<Comment_i> => {
    const response = await fetch("/api/comments/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })

    if (!response.ok) {
      throw new Error("댓글 업데이트 실패")
    }

    return response.json()
  },
}
