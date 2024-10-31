import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/Button"
import { HighlightText } from "../../HighlightText"
import { useAtom } from "jotai"
import {
  commentsAtom,
  newCommentAtom,
  searchQueryAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "../../../app/atom"
import { useDeleteComment } from "../../api/hooks/comment/useManageComments"
import { useLikeComment } from "../../api/hooks/comment/useLikeComment"

type CommentsProps = {
  postId: number
}

const Comments = ({ postId }: CommentsProps) => {
  const [, setNewComment] = useAtom(newCommentAtom)
  const [, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const { mutate: deleteComment } = useDeleteComment()
  const [, setSelectedComment] = useAtom(selectedCommentAtom)
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const { mutate: likeComment } = useLikeComment()
  const [searchQuery] = useAtom(searchQueryAtom)
  const [comments] = useAtom(commentsAtom)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{HighlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment({ id: comment.id, postId })}>
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
              <Button variant="ghost" size="sm" onClick={() => deleteComment({ id: comment.id, postId })}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Comments
