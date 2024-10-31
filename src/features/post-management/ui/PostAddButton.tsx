import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui/button"

interface Props {
  setShowAddDialog: any
}

const PostAddButton = ({ setShowAddDialog }: Props) => {
  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}

export default PostAddButton
