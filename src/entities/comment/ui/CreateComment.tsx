import { useCreateCommentDialog } from "@features/dialog/hooks/useCreateCommentDialog"
import { useCommentCreate } from "@entities/comment/hooks/useCommentCreate"
import { useCommentForm } from "@entities/comment/hooks/useCommentForm"
import { useSelectedPost } from "@entities/post/hooks/useSelectedPost"
import { DEFAULT_COMMENT_FORM } from "@entities/comment/constants"
import { useCallback, useEffect } from "react"
import { Button } from "@shared/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Dialog,
} from "@shared/ui"

export const CreateComment: React.FC = () => {
  const { createComment } = useCommentCreate()
  const { selectedPost } = useSelectedPost()
  const { opened, closeDialog } = useCreateCommentDialog()
  const { commentForm, updateCommentForm, resetCommentForm } = useCommentForm({
    ...DEFAULT_COMMENT_FORM,
  })

  useEffect(() => {
    updateCommentForm({ postId: selectedPost.id })
  }, [selectedPost])

  const submitComment = useCallback(() => {
    createComment(commentForm)
    closeDialog()
    resetCommentForm()
  }, [commentForm])

  return (
    <Dialog open={opened} onOpenChange={() => closeDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={commentForm.body}
            onChange={(e) =>
              updateCommentForm({
                body: (e.target as HTMLTextAreaElement).value,
              })
            }
          />
          <Button onClick={submitComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
