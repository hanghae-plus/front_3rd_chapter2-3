import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Plus } from "lucide-react"
import CommentAddModal from "./CommentAddModal.tsx"
import { useState } from "react"

const CommentAddButton = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false)

  return (
    <>
      <Button
        size="sm"
        onClick={() => {
          setShowAddCommentDialog(true)
        }}
      >
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
      <CommentAddModal showAddCommentDialog={showAddCommentDialog} setShowAddCommentDialog={setShowAddCommentDialog} />
    </>
  )
}

export default CommentAddButton
