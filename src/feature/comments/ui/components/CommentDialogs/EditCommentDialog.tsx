import { useEffect, useState } from "react"

import type { Comment } from "../../../model/types"
import { useUpdateCommentMutation } from "../../../lib/hooks/useCommentsQuery"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared"
import { CommentForm } from "../../../../../entities/comment/ui/components"

interface EditCommentDialogProps {
  comment: Comment | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  postId: number
}

export const EditCommentDialog = ({
  comment,
  open,
  onOpenChange,
  onSuccess,
  postId,
}: EditCommentDialogProps) => {
  const [body, setBody] = useState("")
  const { mutate: updateComment, isPending } = useUpdateCommentMutation(postId)

  useEffect(() => {
    if (comment) {
      setBody(comment.body)
    }
  }, [comment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment) return

    updateComment(
      {
        id: comment.id,
        body,
      },
      {
        onSuccess: () => {
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
          <DialogTitle>댓글 수정</DialogTitle>
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
