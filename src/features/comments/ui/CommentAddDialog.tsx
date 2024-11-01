import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { CommentPayload } from "../../../entities/comments/model/types"
import { useState } from "react"
import { addCommentMutation } from "../api"

interface CommentAddDialogProps {
  isShow: boolean
  handleDialog: () => void
  selectedPostId: number
}

export const CommentAddDialog = ({ isShow, handleDialog, selectedPostId }: CommentAddDialogProps) => {
  const [newComment, setNewComment] = useState<CommentPayload>({ body: "", postId: 1, userId: 1, likes: 0 })

  const { mutate: addCommentMutate } = addCommentMutation(selectedPostId)

  const addComment = () => {
    addCommentMutate(newComment)
    handleDialog()
  }

  return (
    <Dialog open={isShow} onOpenChange={handleDialog}>
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
          <Button
            onClick={() => {
              addComment()
              setNewComment({ body: "", postId: 1, userId: 1, likes: 0 })
            }}
          >
            댓글 추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
