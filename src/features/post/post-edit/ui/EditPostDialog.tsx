import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/components/dialog"
import { Input } from "@/shared/ui/components/input"
import { Textarea } from "@/shared/ui/components/textarea"
import { Button } from "@/shared/ui/components/button"
import { useUpdatePost } from "../model/use-update-post"
import type { Post } from "@/entities/post/model/types"

interface EditPostDialogProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EditPostDialog: FC<EditPostDialogProps> = ({ post, open, onOpenChange }) => {
  const {
    mutate: updatePost,
    editingPost,
    setEditingPost,
  } = useUpdatePost({
    onSuccess: () => onOpenChange(false),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={editingPost?.title || ""}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={editingPost?.body || ""}
            onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
          />
          <Button onClick={() => editingPost && updatePost(editingPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
