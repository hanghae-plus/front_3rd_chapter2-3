import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Trash2 } from "lucide-react"
import { Comment } from "../../../entities/comment/model/types.ts"
import { UseMutateCommentDelete } from "../api/useMutateCommentDelete.ts"

interface Props {
  comment: Comment
}

const CommentDeleteButton = ({ comment }: Props) => {
  const { mutate } = UseMutateCommentDelete()

  return (
    <Button variant="ghost" size="sm" onClick={() => mutate(comment.id)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export default CommentDeleteButton
