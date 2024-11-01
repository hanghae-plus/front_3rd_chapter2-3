import { useMutationCommentUpdate } from "@features/comment/api"
import { useCommentForm } from "@features/comment/hooks"
import { useSelectedComment } from "@features/comment/hooks"
import { commentFormValue } from "@features/comment/config"
import { useModal } from "@features/modal/hooks"
import { Comment } from "@entities/comment/model"
import { useCallback, useEffect } from "react"
import { Button } from "@shared/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea"
export const UpdateCommentModal: React.FC = () => {
  const { updateComment } = useMutationCommentUpdate()
  const { selectedComment } = useSelectedComment()
  const { openEditComment, closeModal } = useModal()

  const { commentForm, updateCommentForm, resetCommentForm } = useCommentForm({
    ...commentFormValue.form,
  })

  useEffect(() => {
    updateCommentForm({
      postId: selectedComment.id,
      body: selectedComment.body,
    })
  }, [selectedComment])

  const submitComment = useCallback(() => {
    updateComment({ ...selectedComment, ...commentForm } as Comment)
    closeModal("editComment")
    resetCommentForm()
  }, [commentForm, selectedComment, closeModal, resetCommentForm, updateComment])

  return (
    <Dialog
      open={openEditComment}
      onOpenChange={() => closeModal("editComment")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
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
          <Button onClick={submitComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
