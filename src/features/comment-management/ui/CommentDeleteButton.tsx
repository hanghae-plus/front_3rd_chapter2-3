import { Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import deleteComment from "../../../entities/comment/model/deleteComment"

interface Props {
  comment: any
  postId: any
}

const CommentDeleteButton = ({ comment, postId }: Props) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export default CommentDeleteButton
