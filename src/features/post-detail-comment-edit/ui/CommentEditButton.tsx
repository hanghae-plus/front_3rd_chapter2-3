import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Edit2 } from "lucide-react"
import { Comment } from "../../../entities/comment/model/types.ts"
import { useState } from "react"
import CommentEditModal from "./CommentEditModal.tsx"

interface Props {
  comment: Comment
}

const CommentEditButton = ({ comment }: Props) => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setShowEditCommentDialog(true)
        }}
      >
        <Edit2 className="w-3 h-3" />
      </Button>
      <CommentEditModal
        comment={comment}
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
      />
    </>
  )
}

export default CommentEditButton
