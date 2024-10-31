import { useDialogStore } from "../../../shared/model/useDialogStore"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useAddCommentMutation } from "../api/useAddCommentMutation"
import { useState } from "react"
import { NewComment_i } from "../../../entities/comment/model/types"
import { useCommentStore } from "../model/useCommentStore"

const INIT_NEW_COMMENT = { body: "", postId: null, userId: 1 }

export const CommentEditDialog = () => {
  const [newComment, setNewComment] = useState<NewComment_i>(INIT_NEW_COMMENT)

  const dialogStore = useDialogStore()
  const addCommentMutation = useAddCommentMutation()
  const [selectedComment, setSelectedComment, updateComment] = useCommentStore((state) => [
    state.selectedComment,
    state.setSelectedComment,
    state.updateComment,
  ])

  const handleUpdateComment = async () => {
    addCommentMutation.mutate(newComment, {
      onSuccess: (data) => {
        dialogStore.closeDialog()
        updateComment(data)
        setNewComment(INIT_NEW_COMMENT)
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  return (
    <Dialog open={true} onOpenChange={dialogStore.onOpenChange}>
      {selectedComment && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
