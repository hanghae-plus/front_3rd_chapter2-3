import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Button
} from '../../../shared/ui'
import { Comment, NewComment } from '../../../entity/comment/model'

interface CommentDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  comment?: Comment
  postId?: number
  onSubmit: (comment: Comment | NewComment) => void
  mode: 'add' | 'edit'
}

export const CommentDialog = ({
  isOpen,
  onOpenChange,
  comment,
  postId,
  onSubmit,
  mode
}: CommentDialogProps) => {
  const [formData, setFormData] = useState<Partial<Comment | NewComment>>(
    comment || {
      body: '',
      postId,
      userId: 1
    }
  )

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? '새 댓글 추가' : '댓글 수정'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          <Button onClick={() => onSubmit(formData as Comment | NewComment)}>
            {mode === 'add' ? '댓글 추가' : '댓글 업데이트'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
