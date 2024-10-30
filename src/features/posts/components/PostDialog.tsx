import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
  Button
} from '../../../shared/ui'
import { Post } from '../../../entities/post/model'
import { useState } from "react"

interface PostDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  post?: Post | null  // null을 허용하도록 수정
  onSubmit: (post: Post) => void
  mode: 'add' | 'edit'
}

export const PostDialog = ({
  isOpen,
  onOpenChange,
  post,
  onSubmit,
  mode
}: PostDialogProps) => {
  const [formData, setFormData] = useState<Partial<Post>>(post || {
    title: '',
    body: '',
    userId: 1
  })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? '새 게시물 추가' : '게시물 수정'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea
            rows={mode === 'add' ? 30 : 15}
            placeholder="내용"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          {mode === 'add' && (
            <Input
              type="number"
              placeholder="사용자 ID"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: Number(e.target.value) })}
            />
          )}
          <Button onClick={() => onSubmit(formData as Post)}>
            {mode === 'add' ? '게시물 추가' : '게시물 업데이트'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
