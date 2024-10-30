import { Button } from "../../../shared/ui/Button/Button"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import useCommentMutations from "../model/useCommentMutations";
import { useAtom } from "jotai";
import { selectedCommentAtom, showEditCommentDialogAtom } from "../../../entities/comment/model/commentAtom";


const CommentItem: React.FC = () => {
  const { deleteCommentMutation } = useCommentMutations();
  const [selectedComment, ] = useAtom(selectedCommentAtom);
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);

  return(
    selectedComment && selectedComment.id ?
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{selectedComment?.user.username}:</span>
        <span className="truncate">{selectedComment?.body}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{selectedComment?.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowEditCommentDialog(true)}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteCommentMutation.mutate(selectedComment.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>  : ''
  )
}

export default CommentItem