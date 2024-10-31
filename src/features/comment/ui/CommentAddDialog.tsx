import { useDialogStore } from "../../../shared/model/useDialogStore"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useAddCommentMutation } from "../api/useAddCommentMutation"
import { useState } from "react"
import { NewComment_i } from "../../../entities/comment/model/types"
import { useCommentStore } from "../model/useCommentStore"

const INIT_NEW_COMMENT = { body: "", postId: null, userId: 1 }

export const CommentAddDialog = () => {
  const [newComment, setNewComment] = useState<NewComment_i>(INIT_NEW_COMMENT)

  const dialogStore = useDialogStore()
  const addCommentMutation = useAddCommentMutation()
  const addComment = useCommentStore((state) => state.addComment)

  const handleAddComment = async () => {
    addCommentMutation.mutate(newComment, {
      onSuccess: (data) => {
        dialogStore.closeDialog()
        addComment(data)
        setNewComment(INIT_NEW_COMMENT)
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  return (
    <Dialog open={true} onOpenChange={dialogStore.onOpenChange}>
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
