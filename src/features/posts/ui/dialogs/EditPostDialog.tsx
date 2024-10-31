import { Button } from "../../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import { Input } from "../../../../shared/ui/input"
import { Textarea } from "../../../../shared/ui/textarea"
import { useEditPostForm } from "../../model/hooks/form/useEditPostForm"
import { EditPostDialogProps } from "../../model/type/form"

const EditPostDialog = ({ isOpen, close, post }: EditPostDialogProps) => {
  const { register, handleSubmit } = useEditPostForm(post, close)

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="제목" {...register("title", { required: "제목을 입력해주세요" })} />
          <Textarea rows={15} placeholder="내용" {...register("body", { required: "내용을 입력해주세요" })} />
          <Button type="submit">게시물 업데이트</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostDialog
