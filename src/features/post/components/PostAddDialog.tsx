import { ChangeEvent, useState } from "react"
import { Post } from "../../../entities/post/model/types"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"

export interface PostAddDialogProps {
  onOpenChange: (open: boolean) => void
  onSubmit: (post: Pick<Post, "title" | "body" | "userId">) => void
}

const PostAddDialog = ({ onOpenChange, onSubmit }: PostAddDialogProps) => {
  const [value, setValue] = useState<Pick<Post, "title" | "body" | "userId">>({ title: "", body: "", userId: 1 })

  const handleChange = (id: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, type } = event.target

    setValue((prevValue) => ({ ...prevValue, [id]: type === "number" ? Number(value) : value }))
  }

  const handleSubmit = () => {
    onSubmit(value)
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="제목" value={value.title} onChange={handleChange("title")} />

          <Textarea rows={30} placeholder="내용" value={value.body} onChange={handleChange("body")} />

          <Input type="number" placeholder="사용자 ID" value={value.userId} onChange={handleChange("userId")} />

          <Button onClick={handleSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostAddDialog
