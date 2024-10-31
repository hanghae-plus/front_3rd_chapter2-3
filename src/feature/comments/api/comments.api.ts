import { BaseApi } from "../../../shared/api"
import { Comment } from "../model/types"

class CommentsApi extends BaseApi {
  constructor() {
    super("/api")
  }

  async getComments(postId: number) {
    return this.get<{ comments: Comment[] }>(`/comments/post/${postId}`)
  }

  async addComment(comment: {
    body: string
    postId: number | null
    userId: number
  }) {
    return this.post("/comments/add", comment)
  }

  async updateComment(id: number, body: string) {
    return this.put(`/comments/${id}`, { body })
  }

  async deleteComment(id: number) {
    return this.delete(`/comments/${id}`)
  }

  async likeComment(id: number) {
    return this.patch(`/comments/${id}`)
  }
}

export const commentsApi = new CommentsApi()
