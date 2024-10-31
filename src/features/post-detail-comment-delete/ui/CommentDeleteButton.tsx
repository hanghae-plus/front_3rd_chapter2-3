import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Trash2 } from "lucide-react"
import { Comment } from "../../../entities/comment/model/types.ts"
import { UseMutateDeleteComment } from "../api/useMutateDeleteComment.ts"

interface Props {
  comment: Comment
}

const CommentDeleteButton = ({ comment }: Props) => {
  const { mutate } = UseMutateDeleteComment()

  return (
    <Button variant="ghost" size="sm" onClick={() => mutate(comment.id)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export default CommentDeleteButton
