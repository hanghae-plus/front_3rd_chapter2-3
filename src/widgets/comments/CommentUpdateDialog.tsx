// 댓글 수정 대화상자
import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../shared/ui"
import { Comments, Comment } from "../../entities/comment/model/type"

interface Props {
  selectedComment: Comment | null
  setComments: React.Dispatch<React.SetStateAction<Comments>>
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  showEditCommentDialog: boolean
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
}

const CommentUpdateDialog = ({
  selectedComment,
  setComments,
  setShowEditCommentDialog,
  showEditCommentDialog,
  setSelectedComment,
}: Props) => {
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

export default CommentUpdateDialog
