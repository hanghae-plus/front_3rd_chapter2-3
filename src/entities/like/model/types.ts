import { Comment } from "../../comment/model/types"

export interface UpdateLikeParams {
  id: Comment["id"]
  postId: Comment["postId"]
}

export interface UpdateLikeBody {
  likes: number
}
