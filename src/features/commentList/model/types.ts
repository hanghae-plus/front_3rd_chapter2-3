import { Comment } from "../../../entities/comment"

export interface CommentsListState {
  comments: Comment[]
  isLoading: boolean
}
