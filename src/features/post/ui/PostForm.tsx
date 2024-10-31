// src/features/posts/components/PostForm.tsx
import React, { useState } from 'react';
import { Input } from '../../../shared/ui/InputBox/InputBox';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { Button } from '../../../shared/ui/Button/Button';
import { EnrichedPost } from '../../../entities/post/api/types';

interface PostFormProps {
  initialData?: EnrichedPost;
  onSubmit: (data: Omit<EnrichedPost, "id" | "reactions" | "author"> & Partial<Pick<EnrichedPost, "id" | "reactions" | "author">>) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData = { title: '', body: '', userId: 1 }, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [body, setBody] = useState(initialData.body || '');
  const [userId, setUserId] = useState(initialData.userId || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title, body, userId, id: initialData.id,
      tags: [],
      views: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        rows={5}
        placeholder="내용"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        min={1}
      />
      <div className="flex gap-2">
        <Button type="submit" className="w-full">
          {initialData.id !== undefined ? '게시물 업데이트' : '게시물 추가'}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;