import { Button } from "../../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import { Input } from "../../../../shared/ui/input"
import { Textarea } from "../../../../shared/ui/textarea"
import { useAddPostForm } from "../../model/hooks/form/useAddPostForm"
import { AddPostDialogProps } from "../../model/type/form"

const AddPostDialog = ({ isOpen, close }: AddPostDialogProps) => {
  const { register, handleSubmit } = useAddPostForm(close)

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="제목" {...register("title", { required: "제목을 입력해주세요" })} />
          <Textarea rows={30} placeholder="내용" {...register("body", { required: "내용을 입력해주세요" })} />
          <Input
            type="number"
            placeholder="사용자 ID"
            {...register("userId", { required: "사용자 ID를 입력해주세요" })}
          />
          <Button type="submit">게시물 추가</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostDialog
