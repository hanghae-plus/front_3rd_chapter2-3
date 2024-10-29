// 댓글 수정 대화상자
import React from "react"
import { Button } from "../../shared/ui/button/Button"
import { Textarea } from "../../shared/ui/textarea/Textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog/Dialog"
import { useComment } from "../../features/comment/model/useComment"
import { Comment } from "../../features/comment/model/types"
import { useCommentDialog } from "../../features/comment/model/useCommentDialog"

const UpdateCommentDialog = () => {
  const { setComments, selectedComment, setSelectedComment } = useComment()
  const { showEditCommentDialog, setShowEditCommentDialog } = useCommentDialog()

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
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...(selectedComment as Comment), body: e.target.value })}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCommentDialog
