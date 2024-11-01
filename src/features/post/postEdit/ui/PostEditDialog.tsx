import { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from '../../../../shared/ui';
import { updatePost } from '../../../../entities/post/api/postApi';
import { Post } from '../../../../entities/post/model/types';
import { transformUpdatedPost } from '../../../../entities/post/lib';
import { useShallow } from 'zustand/shallow';
import { usePostStore } from '../../postStore';

type Props = {
  onPostEdit?: (newPost: Post) => void;
};

type Form = Pick<Post, 'title' | 'body'>;

export const PostEditDialog = ({ onPostEdit }: Props) => {
  const { selectedPost, showEditDialog, setShowEditDialog } = usePostStore(
    useShallow((state) => ({
      selectedPost: state.selectedPost,
      setShowEditDialog: state.setShowEditDialog,
      showEditDialog: state.showEditDialog,
    })),
  );

  const [form, setForm] = useState<Form>({
    title: '',
    body: '',
  });

  useEffect(() => {
    if (showEditDialog && selectedPost) {
      setForm({
        title: selectedPost.title ?? '',
        body: selectedPost.body ?? '',
      });
    } else if (!showEditDialog) {
      setForm({
        title: '',
        body: '',
      });
    }
  }, [selectedPost, showEditDialog]);

  const handleClick = useCallback(async () => {
    if (selectedPost === null) return;

    try {
      const data = await updatePost({
        ...selectedPost,
        ...form,
      });

      // TODO: react-query mutation으로 이동
      const updatedPost = transformUpdatedPost(data);

      onPostEdit?.(updatedPost);

      // setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);

      throw error;
    }
  }, [selectedPost, form, onPostEdit, setShowEditDialog]);

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
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
