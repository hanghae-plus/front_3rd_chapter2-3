import { useQuery } from "@tanstack/react-query"
import { Button } from "../../../shared/ui"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { fetchComments } from "../../../entities/comments/api"
import highlightText from "../../../shared/ui/highlightText"
import { Comment } from "../../../entities/comments/model/types"

interface CommentsListViewProps {
  postId: number
  searchQuery: string
  likeComment: (commentId: number) => void
  deleteComment: (commentId: number) => void
  setSelectedComment: (comment: Comment) => void
  setShowEditCommentDialog: (show: boolean) => void
  handleAddComment: () => void
}

export const CommentsListView = ({
  postId,
  searchQuery,
  likeComment,
  deleteComment,
  setSelectedComment,
  setShowEditCommentDialog,
  handleAddComment,
}: CommentsListViewProps) => {
  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  })

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
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id)}>
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
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
