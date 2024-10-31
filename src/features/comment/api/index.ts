import {
  createCommentApi,
  deleteCommentApi,
  fetchCommentsApi,
  likeCommentApi,
  updateCommentApi,
} from "../../../entities/comment/api"
import { Comment, NewComment } from "../../../entities/comment/model/types"

export interface CommentsResponse {
  comments: Comment[]
  total: number
}

export const commentsApi = {
  fetchByPost: async (postId: number): Promise<CommentsResponse> => {
    const response = await fetchCommentsApi(postId)
    return {
      comments: response.comments,
      total: response.comments.length,
    }
  },

  create: (comment: NewComment) => createCommentApi(comment),

  update: (comment: Comment) => updateCommentApi(comment),

  delete: (id: number) => deleteCommentApi(id),

  like: (commentId: number, likes: number) => likeCommentApi(commentId, likes),
}
