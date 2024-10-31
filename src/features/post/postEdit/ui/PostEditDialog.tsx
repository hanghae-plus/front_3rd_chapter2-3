import { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from '../../../../shared/ui';
import { updatePost } from '../../../../entities/post/api/postApi';
import { Post } from '../../../../entities/post/model/types';
import { transformUpdatedPost } from '../../../../entities/post/lib';

type Props = {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostEdit?: (newPost: Post) => void;
};

type Form = Pick<Post, 'title' | 'body'>;

export const PostEditDialog = ({ post, open, onOpenChange, onPostEdit }: Props) => {
  const [form, setForm] = useState<Form>({
    title: '',
    body: '',
  });

  useEffect(() => {
    if (open) {
      setForm({ title: post.title, body: post.body });
    }
  }, [post, open]);

  const handleClick = useCallback(async () => {
    try {
      const data = await updatePost({
        ...post,
        ...form,
      });

      // TODO: react-query mutation으로 이동
      const updatedPost = transformUpdatedPost(data);

      onPostEdit?.(updatedPost);

      // setForm(createForm());

      // setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      // setShowEditDialog(false);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);

      throw error;
    }
  }, [post, form, onPostEdit]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={form.title || ''}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={form.body || ''}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <Button onClick={handleClick}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
