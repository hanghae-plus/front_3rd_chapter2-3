import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/components/dialog"
import { Input } from "@/shared/ui/components/input"
import { Textarea } from "@/shared/ui/components/textarea"
import { Button } from "@/shared/ui/components/button"
import { useCreatePost } from "../model/use-create-post"

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreatePostDialog: FC<CreatePostDialogProps> = ({ open, onOpenChange }) => {
  const { mutate: createPost, newPost, setNewPost } = useCreatePost({
    onSuccess: () => onOpenChange(false)
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
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={() => createPost(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}