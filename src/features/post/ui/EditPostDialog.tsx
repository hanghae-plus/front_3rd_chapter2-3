// src/features/posts/components/EditPostDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/InputBox/InputBox';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { useAtom } from 'jotai';
import { selectedPostAtom, showEditDialogAtom } from '../../../entities/post/model/postAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../../../entities/post/api/postApi';

const EditPostDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setShowEditDialog(false);
      setSelectedPost(null);
    },
    onError: (error: any) => {
      console.error('게시물 업데이트 오류:', error);
      // 필요 시 사용자에게 에러 메시지 표시
    },
  });

  const handleSubmit = () => {
    if (selectedPost) {
      updatePostMutation.mutate(selectedPost);
    }
  };

  if (!selectedPost) return null;

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContents>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost.title}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={5}
            placeholder="내용"
            value={selectedPost.body}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={handleSubmit} disabled={updatePostMutation.isLoading}>
            {updatePostMutation.isLoading ? '업데이트 중...' : '게시물 업데이트'}
          </Button>
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default EditPostDialog;
