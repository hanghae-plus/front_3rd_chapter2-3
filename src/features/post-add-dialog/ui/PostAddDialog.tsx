import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import type { NewPost } from "@/shared/types"
import { DialogProps } from "@/shared/ui/Dialog"

interface Props {
  open: boolean
  onOpenChange: DialogProps["onOpenChange"]
  newPost: NewPost
  onChangeTitle: React.ChangeEventHandler<HTMLInputElement>
  onChangeBody: React.ChangeEventHandler<HTMLTextAreaElement>
  onChangeUserId: React.ChangeEventHandler<HTMLInputElement>
  onClickPostAddButton: React.MouseEventHandler<HTMLButtonElement>
}

const PostAddDialog = ({
  open,
  onOpenChange,
  newPost,
  onChangeTitle,
  onChangeBody,
  onChangeUserId,
  onClickPostAddButton,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={newPost.title} onChange={onChangeTitle} />
          <Textarea rows={30} placeholder="내용" value={newPost.body} onChange={onChangeBody} />
          <Input type="number" placeholder="사용자 ID" value={newPost.userId} onChange={onChangeUserId} />
          <Button onClick={onClickPostAddButton}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostAddDialog
