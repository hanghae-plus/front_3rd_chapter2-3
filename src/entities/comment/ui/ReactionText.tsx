import { Comment } from "@entities/comment/model/types"

export const ReactionText: React.FC<{ comment: Comment }> = ({ comment }) => {
  return <span className="ml-1 text-xs">{comment.likes}</span>
}