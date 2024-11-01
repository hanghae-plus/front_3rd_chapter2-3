import { Plus } from "lucide-react"
import { Button } from "../../../../shared/ui"
import usePost from "../../../../shared/hooks/usePost"

const PostAddButton = () => {
  const { setShowAddDialog } = usePost()
  function handleAddDialog() {
    setShowAddDialog(true)
  }

  return (
    <Button onClick={handleAddDialog}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}

export default PostAddButton
