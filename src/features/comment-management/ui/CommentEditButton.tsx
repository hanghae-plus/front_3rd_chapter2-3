import { Edit2 } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import useCommentStore from "../../../entities/comment/model/useCommentStore"

interface Props {
  comment: any
}

const CommentEditButton = ({ comment }: Props) => {
  const { setSelectedComment, setShowEditCommentDialog } = useCommentStore.getState()

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
