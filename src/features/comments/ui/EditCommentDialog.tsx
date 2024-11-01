import { useForm } from "react-hook-form"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Textarea } from "../../../shared/ui/textarea"
import { useUpdateComment } from "../api/queries"
import { EditCommentDialogProps } from "../model/types"

interface EditCommentForm {
  body: string
}

const EditCommentDialog = ({ isOpen, close, comment }: EditCommentDialogProps) => {
  const { mutate: updateComment } = useUpdateComment()
  const { register, handleSubmit } = useForm<EditCommentForm>({
    defaultValues: {
      body: comment.body,
    },
  })

  const onSubmit = (data: EditCommentForm) => {
    updateComment(
      { comment, newBody: data.body },
      {
        onSuccess: () => {
          close()
        },
      },
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea placeholder="댓글 내용" {...register("body")} />
          <Button type="submit">댓글 업데이트</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentDialog
