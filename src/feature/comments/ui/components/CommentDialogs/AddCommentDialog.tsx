import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Textarea,
} from "../../../../../shared/index"
import { useAddCommentMutation } from "../../../lib/hooks/useCommentsQuery"

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
            {isPending ? "추가 중..." : "댓글 추가"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
