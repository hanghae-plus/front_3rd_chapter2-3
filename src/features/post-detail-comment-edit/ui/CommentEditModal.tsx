import { Dispatch, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/ui"
import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Textarea } from "../../../shared/ui/textarea/ui/Textarea.tsx"
import { Comment } from "../../../entities/comment/model/types.ts"
import { useEditCommentMutation } from "../api/useMutateCommentEdit.ts"

interface Props {
  comment: Comment
  showEditCommentDialog: boolean
  setShowEditCommentDialog: Dispatch<React.SetStateAction<boolean>>
}

const CommentEditModal = ({ comment, showEditCommentDialog, setShowEditCommentDialog }: Props) => {
  const [commentBody, setCommentBody] = useState(comment.body)
  const { mutate } = useEditCommentMutation(setShowEditCommentDialog)

  const editComment = () => {
    mutate({ commentId: comment.id, body: commentBody })
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
          <Button onClick={editComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentEditModal
