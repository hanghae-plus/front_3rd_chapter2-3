import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui";
import { NewPost } from '../../../entities/post/model/types';

interface AddPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPost: NewPost) => void;
}

export default function AddPostDialog({ isOpen, onClose, onSubmit }: AddPostDialogProps) {
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });

  const handleSubmit = async () => {
    await onSubmit(newPost);
    setNewPost({ title: "", body: "", userId: 1 });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={newPost.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};