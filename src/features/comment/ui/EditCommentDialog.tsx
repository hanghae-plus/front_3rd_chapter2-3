// src/features/comments/components/EditCommentDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import { Button } from '../../../shared/ui/Button/Button';
import { Comment } from "../../../entities/comment/api/types";
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { useAtom } from 'jotai';
import { commentsAtom, selectedCommentAtom, showEditCommentDialogAtom } from '../../../entities/comment/model/commentAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../../../entities/comment/api/commentApi';

const EditCommentDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [, setComments] = useAtom(commentsAtom);

  const updateCommentMutation = useMutation<Comment,Error,Partial<Comment> & { id: number }>({
    mutationFn: updateComment,
    onSuccess: () => {

      if (selectedComment?.postId) {
        queryClient.invalidateQueries({queryKey:['comments', selectedComment?.postId]});
        setComments((prev) => ({
          ...prev,
          [selectedComment.postId]: prev[selectedComment.postId].map((comment) => (comment.id === selectedComment.id ? selectedComment : comment)),
        }))
      }
      setShowEditCommentDialog(false);
      setSelectedComment(null);
      
    },
  });

  const handleSubmit = () => {
    if (selectedComment) {
      updateCommentMutation.mutate({...selectedComment, id:selectedComment.id})
    }
  };

  if (!selectedComment) return null;

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContents>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment.body}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={handleSubmit} disabled={updateCommentMutation.isPending}>
            {updateCommentMutation.isPending ? '업데이트 중...' : '댓글 업데이트'}
          </Button>
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default EditCommentDialog;
