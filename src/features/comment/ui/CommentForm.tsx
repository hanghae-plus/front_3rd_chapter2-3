import React from 'react';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { Button } from '../../../shared/ui/Button/Button';
import useCommentMutations from '../model/useCommentMutations';
import { useAtom } from 'jotai';
import { newCommentAtom, showAddCommentDialogAtom, showEditCommentDialogAtom } from '../../../entities/comment/model/commentAtom.js';

const CommentForm = () => {
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom);
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);
  const { addCommentMutation, updateCommentMutation } = useCommentMutations();

  const isEdit = showEditCommentDialog && newComment.id;

  const handleSubmit = () => {
    if (isEdit) {
      updateCommentMutation.mutate(newComment);
    } else {
      addCommentMutation.mutate(newComment);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button onClick={handleSubmit}>{isEdit ? '댓글 업데이트' : '댓글 추가'}</Button>
    </div>
  );
};

export default CommentForm;