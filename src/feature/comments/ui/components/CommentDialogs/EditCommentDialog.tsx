import { useEffect, useState } from "react"

import type { Comment } from "../../../model/types"
import { useUpdateCommentMutation } from "../../../lib/hooks/useCommentsQuery"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "../../../../../shared"

interface EditCommentDialogProps {
  comment: Comment | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export const EditCommentDialog = ({
  comment,
  open,
  onOpenChange,
  onSuccess,
}: EditCommentDialogProps) => {
  const [body, setBody] = useState("")
  const { mutate: updateComment, isPending } = useUpdateCommentMutation()

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              댓글 내용
            </label>
            <Textarea
              id="comment"
              placeholder="댓글을 입력하세요"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "수정 중..." : "댓글 수정"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
