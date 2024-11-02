import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"

export interface PostTableActionProps {
  onCommentButton: () => void
  onEditButton: () => void
  onDeleteButton: () => void
}

const PostTableAction = ({ onCommentButton, onEditButton, onDeleteButton }: PostTableActionProps) => {
  const handleCommentButton = () => {
    onCommentButton()
  }

  const handleEditButton = () => {
    onEditButton()
  }

  const handleDeleteButton = () => {
    onDeleteButton()
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleCommentButton}>
        <MessageSquare className="w-4 h-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={handleEditButton}>
        <Edit2 className="w-4 h-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={handleDeleteButton}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default PostTableAction
