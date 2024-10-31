import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Plus } from "lucide-react"
import { useState } from "react"
import PostAddModal from "./PostAddModal.tsx"

const PostAddButton = () => {
  const [showAddPostDialog, setShowAddPostDialog] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowAddPostDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>

      <PostAddModal setShowAddPostDialog={setShowAddPostDialog} showAddPostDialog={showAddPostDialog} />
    </>
  )
}

export default PostAddButton
