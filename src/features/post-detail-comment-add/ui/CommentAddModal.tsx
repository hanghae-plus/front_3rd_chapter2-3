import React, { Dispatch, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/ui"
import { Textarea } from "../../../shared/ui/textarea/ui/Textarea.tsx"
import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { useCommentStore } from "../../comment/model/store.ts"
import { useAddCommentMutation } from "../api/useMutateCommentAdd.ts"

interface Props {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: Dispatch<React.SetStateAction<boolean>>
}

const CommentAddModal = ({ showAddCommentDialog, setShowAddCommentDialog }: Props) => {
  const { postId } = useCommentStore((state) => state)
  const [newComment, setNewComment] = useState({ body: "", postId: postId, userId: 1 })
  const { mutate } = useAddCommentMutation({ setShowAddCommentDialog })

  const handleAddComment = () => {
    mutate(newComment)
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentAddModal
