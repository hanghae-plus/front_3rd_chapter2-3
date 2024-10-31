import {
  useDialogProps,
} from '../../../../shared/lib/dialog/model/useDialogStore';
import Button from '../../../../shared/ui/atoms/Button/ui/Button';
import Textarea from '../../../../shared/ui/atoms/Textarea/ui/Textarea';
import { Dialog } from '../../../../shared/ui/organisms/Dialog/ui/Dialog';
import {
  DialogContent,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogContent';
import {
  DialogHeader,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogHeader';
import {
  DialogTitle,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogTitle';
import { useEditComment } from '../../hooks/form/useEditComment';

interface EditCommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const EditCommentDialog = ({ open, onOpenChange }: EditCommentDialogProps) => {
  const { comment } = useDialogProps("editComment")

  const { register, onSubmit, isSubmitting, isPending } = useEditComment({
    commentId: comment.id,
    postId: comment.postId,
    defaultValues: {
      body: comment.body,
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            {...register("body", {
              required: "댓글 내용을 입력해주세요",
            })}
            placeholder="댓글 내용"
          />
          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? "수정 중..." : "댓글 수정"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentDialog
