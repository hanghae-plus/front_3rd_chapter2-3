import { Button } from "../../../shared/ui"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import highlightText from "../../../shared/ui/highlightText"
import { Comment } from "../../../entities/comments/model/types"
import { deleteCommentMutation, likeCommentMutation } from "../../../features/comments/api"
import useGetComments from "../../../features/comments/model/useGetComments.ts"

interface CommentsListViewProps {
  postId: number
  searchQuery: string
  setSelectedComment: (comment: Comment) => void
  setShowEditCommentDialog: (show: boolean) => void
  handleAddComment: () => void
}

export const CommentsListView = ({
  postId,
  searchQuery,
  setSelectedComment,
  setShowEditCommentDialog,
  handleAddComment,
}: CommentsListViewProps) => {
  const { data: comments } = useGetComments(postId)

  const { mutate: deleteCommentMutate } = deleteCommentMutation(postId)

  const { mutate: likeCommentMutate } = likeCommentMutation(postId)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleAddComment}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeCommentMutate(comment)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteCommentMutate(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
