import { ChangeEvent, useState } from "react"
import { Post } from "../../../entities/post/model/types"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"

export interface PostModifyDialogProps {
  post: Post | null
  onOpenChange: (open: boolean) => void
  onSubmit: (post: Post) => void
}

const PostModifyDialog = ({ post, onOpenChange, onSubmit }: PostModifyDialogProps) => {
  if (!post) return

  const { title, body } = post

  const [value, setValue] = useState<Pick<Post, "title" | "body">>({ title: title ?? "", body: body ?? "" })

  const handleChange = (id: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target

    setValue((prevValue) => ({ ...prevValue, [id]: value }))
  }

  const handleSubmit = () => {
    onSubmit({ ...post, ...value })
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={value.title} onChange={handleChange("title")} />
          <Textarea rows={15} placeholder="내용" value={value.title} onChange={handleChange("body")} />
          <Button onClick={handleSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostModifyDialog
