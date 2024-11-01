import { useState } from 'react';

import { useCommentsStore } from '~/entities/comment/model/commentsStore';
import { Comment, CommentResponseDto } from '~/entities/comment/model/type';

import { Button } from '~/shared/ui/Button';
import { Textarea } from '~/shared/ui/Textarea';

import { useModalAction } from '../model/useModalAction';

export const ModalUpdateComment = () => {
  const selectedComment = useCommentsStore.use.selectedComment();

  const [updatedComment, setUpdatedComment] = useState<Partial<Comment> | null>(selectedComment);
  const { updateComment } = useModalAction();
  const handleClickUpdateComment = () => {
    updateComment(updatedComment as CommentResponseDto);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={updatedComment?.body || ''}
        onChange={(e) => setUpdatedComment({ ...selectedComment, body: e.target.value })}
      />
      <Button onClick={handleClickUpdateComment}>댓글 업데이트</Button>
    </div>
  );
};
