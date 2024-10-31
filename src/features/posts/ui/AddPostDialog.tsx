import { useForm } from "react-hook-form"
import { ModalProps } from "../../../shared/model/type"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Input } from "../../../shared/ui/input"
import { Textarea } from "../../../shared/ui/textarea"

interface AddPostFormData {
  title: string
  body: string
  userId: number
}

interface AddPostDialogProps extends ModalProps {}

const AddPostDialog = ({ isOpen, close }: AddPostDialogProps) => {
  const { register, handleSubmit } = useForm<AddPostFormData>({
    defaultValues: {
      title: "",
      body: "",
      userId: 1,
    },
  })

  const onSubmit = (data: AddPostFormData) => {
    // TODO: addPost 함수 구현 필요
    console.log(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
