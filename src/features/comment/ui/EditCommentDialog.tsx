// src/features/comments/components/EditCommentDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import { Button } from '../../../shared/ui/Button/Button';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { useAtom } from 'jotai';
import { selectedCommentAtom, showEditCommentDialogAtom } from '../../../entities/comment/model/commentAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../../../entities/comment/api/commentApi';

const EditCommentDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);

  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      if (selectedComment?.postId) {
        queryClient.invalidateQueries(['comments', selectedComment.postId]);
      }
      setShowEditCommentDialog(false);
      setSelectedComment(null);
    },
    onError: (error: any) => {
      console.error('댓글 업데이트 오류:', error);
      // 필요 시 사용자에게 에러 메시지 표시
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
          <Button onClick={handleSubmit} disabled={updateCommentMutation.isLoading}>
            {updateCommentMutation.isLoading ? '업데이트 중...' : '댓글 업데이트'}
          </Button>
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default EditCommentDialog;
