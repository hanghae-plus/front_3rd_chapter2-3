import { Button } from "../../../shared/ui/Button/Button"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import useCommentMutations from "../model/useCommentMutations";
import { useAtom } from "jotai";
import {  selectedCommentAtom, showEditCommentDialogAtom } from "../../../entities/comment/model/commentAtom";
import { Comment } from "../../../entities/comment/api/types";
interface CommentItemProps {
  comment: Comment
}

const CommentItem: React.FC<CommentItemProps> = ({comment}) => {
  const { deleteCommentMutation } = useCommentMutations();
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);
  const [, setSelectedComment] = useAtom(selectedCommentAtom);

  const handleEditCommentModal = ()=>{
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  return(
    comment && comment.id ?
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment?.user.username}:</span>
        <span className="truncate">{comment?.body}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment?.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() =>handleEditCommentModal() }>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteCommentMutation.mutate(comment.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>  : ''
  )
}

export default CommentItem