import { Plus } from "lucide-react"
import { Button } from "../../shared/ui"

interface PostDialogButtonProps {
  handleAddDialog: () => void
}

const PostDialogButton = ({ handleAddDialog }: PostDialogButtonProps) => {
  return (
    <Button onClick={handleAddDialog}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}

export default PostDialogButton
