import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog/Dialog';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import { usePostStore } from '@/entities/post/model/store';
import { Plus } from 'lucide-react';
import { Post } from '@/entities/post/model/types';

type PostDialogFormData = {
  title: string;
  content: string;
  tags: string;
};

export const AddPostButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        새 게시물
      </Button>
      <AddPostDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

type AddPostDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddPostDialog: FC<AddPostDialogProps> = ({ open, onOpenChange }) => {
  const { addPost } = usePostStore();
  const [formData, setFormData] = useState<PostDialogFormData>({
    title: '',
    content: '',
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPost({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          body: '',
          userId: 0,
          createdAt: '',
          updatedAt: ''
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 작성</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="제목"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            placeholder="내용"
            value={formData.content}
            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          />
          <Input
            placeholder="태그 (쉼표로 구분)"
            value={formData.tags}
            onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

type EditPostDialogProps = {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EditPostDialog: FC<EditPostDialogProps> = ({ post, open, onOpenChange }) => {
  const { updatePost } = usePostStore();
  const [formData, setFormData] = useState<PostDialogFormData>({
    title: post.title,
    content: post.content,
    tags: post.tags.join(', '),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost({
        ...post,
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="제목"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            placeholder="내용"
            value={formData.content}
            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          />
          <Input
            placeholder="태그 (쉼표로 구분)"
            value={formData.tags}
            onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">수정</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};