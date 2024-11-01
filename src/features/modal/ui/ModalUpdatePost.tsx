import { useState } from 'react';

import { usePostStore } from '~/entities/post/model/store';
import { Post } from '~/entities/post/model/types';

import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';
import { Textarea } from '~/shared/ui/Textarea';

import { useModalAction } from '../model/useModalAction';

export const ModalUpdatePost = () => {
  const selectedPost = usePostStore.use.selectedPost();
  const [updatedPost, setUpdatedPost] = useState<Partial<Post> | null>(selectedPost);

  const { updatePost } = useModalAction();

  const handleClickUpdatePost = () => {
    updatePost(updatedPost as Post);
    // closemodal
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={updatedPost?.title || ''}
        onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={updatedPost?.body || ''}
        onChange={(e) => setUpdatedPost({ ...updatedPost, body: e.target.value })}
      />
      <Button onClick={handleClickUpdatePost}>게시물 업데이트</Button>
    </div>
  );
};
