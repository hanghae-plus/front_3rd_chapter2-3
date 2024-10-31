import { Button } from "../../../shared/ui/Button"
import { Plus } from "lucide-react"

interface Props {
  setShowAddDialog: (showAddDialog: boolean) => void
}

export const AddPostButton = ({ setShowAddDialog }: Props) => {
  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
