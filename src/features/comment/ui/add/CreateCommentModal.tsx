import { useMutationCommentCreate  } from "@features/comment/api"
import { useCommentForm } from "@features/comment/hooks"
import { useSelectedPost } from "@features/post/hooks/useSelectedPost"
import { useModal } from "@features/modal/hooks"
import { useCallback, useEffect } from "react"
import { Button } from "@shared/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea"
import { commentFormValue } from "@features/comment/config"

export const CreateCommentModal: React.FC = () => {
  const { createComment } = useMutationCommentCreate()
  const { selectedPost } = useSelectedPost()
  const { openCreateComment, closeModal } = useModal()
  const { commentForm, updateCommentForm, resetCommentForm } = useCommentForm({
    ...commentFormValue.form,
  })

  useEffect(() => {
    updateCommentForm({ postId: selectedPost.id })
  }, [selectedPost])

  const submitComment = useCallback(() => {
    createComment(commentForm)
    closeModal("createComment")
    resetCommentForm()
  }, [commentForm])

  return (
    <Dialog
      open={openCreateComment}
      onOpenChange={() => closeModal("createComment")}
    >
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
