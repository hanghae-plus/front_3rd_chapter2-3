import { Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/button"

interface Props {
  deleteComment: any
  comment: any
  postId: any
}

const CommentDeleteButton = ({ deleteComment, comment, postId }: Props) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export default CommentDeleteButton
