import { DialogProps } from "@radix-ui/react-dialog"
import { useState } from "react"
import { NewPost } from "../../../entities/post/model/types"
import { PostAddButton } from "../../../features/post"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../../../shared/ui"

type Props = Required<Pick<DialogProps, "open" | "onOpenChange">> & {}

export const PostAddDialog = ({ onOpenChange, open }: Props) => {
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    body: "",
    userId: 1,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) =>
              setNewPost({ ...newPost, userId: Number(e.target.value) })
            }
          />
          <PostAddButton
            newPost={newPost}
            onAddSuccess={() => {
              onOpenChange(false)
              setNewPost({ title: "", body: "", userId: 1 })
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
