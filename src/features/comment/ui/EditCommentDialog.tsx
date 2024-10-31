import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useCommentDialog } from "../../../entities/Comment/model/useCommentDialog"
import { useComments } from "../../../entities/Comment/model/useComment"
import usePost from "../../../entities/Post/model/usePost"

export const EditCommentDialog: React.FC = () => {
  const { showEditCommentDialog, setShowEditCommentDialog } = useCommentDialog()
  const { selectedPost } = usePost()
  const { selectedComment, setSelectedComment, updateComment } = useComments(selectedPost?.id ?? 0)

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) return
    setSelectedComment({ ...selectedComment, body: e.target.value })
  }

  const handleUpdateComment = () => {
    updateComment({ id: selectedComment?.id ?? 0, body: selectedComment?.body ?? "" })
    setShowEditCommentDialog(false)
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleNewCommentChange} />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
