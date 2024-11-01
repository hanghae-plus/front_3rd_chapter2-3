import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { useModalStore } from "@/features/modal"
import { useState } from "react"
import { useCreateComment } from "@/features/comment/api/useCreateComment"

export const CommentAddModal = () => {
  const { showAddCommentModal, closeAddCommentModal } = useModalStore()
  const [newComment, setNewComment] = useState({ body: "" })

  const { mutate } = useCreateComment(newComment.body)

  const handleClickAddComment = () => {
    mutate()
    closeAddCommentModal()
  }

  return (
    <Dialog open={showAddCommentModal} onOpenChange={closeAddCommentModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: (e.target as HTMLTextAreaElement).value })}
          />
          <Button onClick={handleClickAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
