import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useCommentDialog } from "../../../features/comment/model/useCommentDialog"
import { useComment } from "../../../features/comment/model/useComment"

export const EditCommentDialog: React.FC = () => {
  const { showEditCommentDialog, setShowEditCommentDialog } = useCommentDialog()
  const { selectedComment, setSelectedComment } = useComment()

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedComment({ ...selectedComment, body: e.target.value, id: selectedComment?.id || 0 })
  }

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment?.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleNewCommentChange} />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
