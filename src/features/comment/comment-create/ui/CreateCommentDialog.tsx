import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/components/dialog"
import { Textarea } from "@/shared/ui/components/textarea"
import { Button } from "@/shared/ui/components/button"
import { useCreateComment } from "../model/use-create-comment"

interface CreateCommentDialogProps {
  postId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateCommentDialog: FC<CreateCommentDialogProps> = ({ postId, open, onOpenChange }) => {
  const {
    mutate: createComment,
    newComment,
    setNewComment,
  } = useCreateComment({
    postId,
    onSuccess: () => onOpenChange(false),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button onClick={() => createComment(newComment)}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
