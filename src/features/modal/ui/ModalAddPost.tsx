import { useState } from 'react';

import { PostRequestDto } from '~/entities/post/model/types';

import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';
import { Textarea } from '~/shared/ui/Textarea';

import { useModalAction } from '../model/useModalAction';

export const ModalAddPostContent = () => {
  const [newPost, setNewPost] = useState<PostRequestDto>({ title: '', body: '', userId: 1 });
  const { addPost } = useModalAction();
  const handleClickAddButton = async () => {
    await addPost(newPost);
    //closeModal;
    setNewPost({ title: '', body: '', userId: 1 });
  };
  return (
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
      <Button onClick={handleClickAddButton}>게시물 추가</Button>
    </div>
  );
};
