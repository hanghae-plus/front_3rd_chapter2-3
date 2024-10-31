import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import type { Post } from "@/shared/types"
import { DialogProps } from "@/shared/ui/Dialog"

interface Props {
  open: boolean
  onOpenChange: DialogProps["onOpenChange"]
  selectedPost: Post | null
  onChangeTitle: React.ChangeEventHandler<HTMLInputElement>
  onChangeBody: React.ChangeEventHandler<HTMLTextAreaElement>
  onClickPostEditButton: React.MouseEventHandler<HTMLButtonElement>
}

const PostEditDialog = ({
  open,
  onOpenChange,
  selectedPost,
  onChangeTitle,
  onChangeBody,
  onClickPostEditButton,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={selectedPost?.title || ""} onChange={onChangeTitle} />
          <Textarea rows={15} placeholder="내용" value={selectedPost?.body || ""} onChange={onChangeBody} />
          <Button onClick={onClickPostEditButton}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEditDialog
