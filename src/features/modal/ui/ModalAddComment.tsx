import { useState } from 'react';

import { CommentRequestDto } from '~/entities/comment/model/type';

import { Button } from '~/shared/ui/Button';
import { Textarea } from '~/shared/ui/Textarea';

import { useModalAction } from '../model/useModalAction';

export const ModalAddComment = () => {
  const [newComment, setNewComment] = useState<CommentRequestDto>({ body: '', postId: null, userId: 1 });
  const { addComment } = useModalAction();

  const handleClickAddComment = () => {
    addComment(newComment);
  };
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button onClick={handleClickAddComment}>댓글 추가</Button>
    </div>
  );
};
