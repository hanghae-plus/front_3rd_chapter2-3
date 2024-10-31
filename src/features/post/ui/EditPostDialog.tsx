import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui";
import { Post } from '../../../entities/post/model/types';

interface EditPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedPost: Post) => void;
  post: Post | null;
}

export default function EditPostDialog ({ isOpen, onClose, onSubmit, post }: EditPostDialogProps) {
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (post) {
      setEditedPost(post);
    }
  }, [post]);

  const handleSubmit = () => {
    if (editedPost) {
      onSubmit(editedPost);
      onClose();
    }
  };

  if (!editedPost) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={editedPost.body}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          />
          <Button onClick={handleSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};