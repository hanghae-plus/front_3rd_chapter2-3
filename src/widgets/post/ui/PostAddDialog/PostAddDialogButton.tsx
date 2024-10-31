import { Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "../../../../shared/ui"
import { PostAddDialog } from "./PostAddDialog"

export const PostAddDialogButton = () => {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>

      <PostAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </>
  )
}
