import { BaseApi } from "../../../shared/api"
import { API_ENDPOINTS } from "../config/comment.config"
import { Comment } from "../model/types"

class CommentsApi extends BaseApi {
  constructor() {
    super("/api")
  }

  async getComments(postId: number) {
    return this.get<{ comments: Comment[] }>(
      `${API_ENDPOINTS.COMMNETS_POST}/${postId}`,
    )
  }

  async addComment(comment: {
    body: string
    postId: number | null
    userId: number
  }) {
    return this.post(`${API_ENDPOINTS.COMMENTS_ADD}`, comment)
  }

  async updateComment(id: number, body: string) {
    return this.put(`${API_ENDPOINTS.COMMENTS}/${id}`, { body })
  }

  async deleteComment(id: number) {
    return this.delete(`${API_ENDPOINTS.COMMENTS}/${id}`)
  }

  async likeComment(id: number) {
    return this.patch(`${API_ENDPOINTS.COMMENTS}/${id}`)
  }
}

export const commentsApi = new CommentsApi()
