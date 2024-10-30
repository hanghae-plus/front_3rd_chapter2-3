import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"

interface PostAddButtonProps {
  setShowAddDialog: (value: boolean) => void
}

const PostAddButton = ({ setShowAddDialog }: PostAddButtonProps) => {
  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}

export default PostAddButton
