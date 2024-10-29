import { BaseApi } from "../../../shared/api"
import { Comment } from "../model/types"
import { CommentsResponse } from "./types"

class CommentsApi extends BaseApi {
  constructor() {
    super("/api")
  }

  async getComments(postId: number): Promise<CommentsResponse> {
    return this.get<CommentsResponse>(`/comments/post/${postId}`)
  }

  async addComment(comment: Omit<Comment, "id">): Promise<Omit<Comment, "id">> {
    return this.post<Omit<Comment, "id">>("/comments/add", comment)
  }

  async updateComment(id: number, body: string) {
    return this.put<{ body: string }>(`/comments/${id}`, { body })
  }

  async deleteComment(id: number): Promise<void> {
    return this.delete(`/comments/${id}`)
  }

  async likeComment(id: number, likes: number) {
    return this.put<{ likes: number }>(`/comments/${id}`, { likes })
  }
}

export const commentsApi = new CommentsApi()
