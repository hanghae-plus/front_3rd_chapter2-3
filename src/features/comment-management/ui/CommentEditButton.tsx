import { Edit2 } from "lucide-react"
import { Button } from "../../../shared/ui/button"

interface Props {
  setSelectedComment: any
  setShowEditCommentDialog: any
  comment: any
}

const CommentEditButton = ({ setSelectedComment, setShowEditCommentDialog, comment }: Props) => {
  return (
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
  )
}

export default CommentEditButton
