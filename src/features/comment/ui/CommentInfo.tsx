import { useQueryCommentList } from "@features/comment/api"
import { UpdateCommentButton, LikeCommnetButton, DeleteCommentButton, AddCommentButton } from "@features/comment/ui";
import { highlightText } from "@shared/utils/highlightText"
import { Comment } from "@entities/comment/model"

interface PropsType {
  postId: number
  searchQuery: string
}

export const CommentInfo: React.FC<PropsType> = ({ postId, searchQuery }) => {
  const { comments } = useQueryCommentList(postId)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <AddCommentButton />
      </div>
      <div className="space-y-1">
        {comments?.map((comment: Comment, index: number) => (
          <div
            key={`${index}th-${comment.id}-${comment.user.id}`}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate min-w-[64px]">
                {comment.user.username}:
              </span>
              <span className="truncate">
                {highlightText(comment.body, searchQuery)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <LikeCommnetButton comment={comment} />
              <UpdateCommentButton comment={comment} />
              <DeleteCommentButton commentId={comment.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentInfo