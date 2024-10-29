import { Comment } from "../../../entities/comment"

export interface CommentListProps {
  comments: Comment[]
  postId: number
}
