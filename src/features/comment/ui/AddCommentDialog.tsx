// src/features/comments/components/AddCommentDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import { Button } from '../../../shared/ui/Button/Button';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { useAtom } from 'jotai';
import { newCommentAtom, showAddCommentDialogAtom } from '../../../entities/comment/model/commentAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../../entities/comment/api/commentApi';
import { Comment } from '../../../entities/comment/api/types';

const AddCommentDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);

  const addCommentMutation = useMutation<Comment,Error,Omit<Comment, 'id' | 'likes' | 'user'>>({
    mutationFn: (newComment)=>addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['comments']});
      setShowAddCommentDialog(false);
      setNewComment({ body: '', postId: null, userId: 1 });
    
    },
  });

  const handleSubmit = () => {
    if(newComment.postId) addCommentMutation.mutate(newComment);
  };

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContents>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleSubmit} disabled={addCommentMutation.isPending}>
            {addCommentMutation.isPending ? '추가 중...' : '댓글 추가'}
          </Button>
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default AddCommentDialog;
