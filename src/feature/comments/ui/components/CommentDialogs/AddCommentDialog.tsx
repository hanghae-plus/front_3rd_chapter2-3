import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared/index"
import { useAddCommentMutation } from "../../../lib/hooks/useCommentsQuery"
import { CommentForm } from "../../../../../entities/comment/ui/components/CommentForm/CommentForm"

interface AddCommentDialogProps {
  postId: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export const AddCommentDialog = ({
  postId,
  open,
  onOpenChange,
  onSuccess,
}: AddCommentDialogProps) => {
  const [body, setBody] = useState("")
  const { mutate: addComment, isPending } = useAddCommentMutation(postId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addComment(
      {
        body,
        postId,
        userId: 1,
      },
      {
        onSuccess: () => {
          setBody("")
          onOpenChange(false)
          onSuccess?.()
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <CommentForm
          body={body}
          setBody={setBody}
          isPending={isPending}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
