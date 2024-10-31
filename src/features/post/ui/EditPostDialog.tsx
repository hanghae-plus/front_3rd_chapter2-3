// src/features/posts/components/EditPostDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import PostForm from './PostForm';
import { useAtom } from 'jotai';
import { showEditDialogAtom, selectedPostAtom } from '../../../entities/post/model/postAtom';
import { Post } from '../../../entities/post/api/types';
import usePostMutations from '../model/usePostMutations';

const EditPostDialog: React.FC = () => {
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  const [selectedPost] = useAtom(selectedPostAtom);
  const { updatePostMutation } = usePostMutations();

  const handleClose = () => {
    setShowEditDialog(false);
  };

  const handleUpdatePost = (data: Partial<Post>) => {
    if (selectedPost?.id === undefined) {
      alert('게시물 ID가 없습니다.');
      return;
    }

    updatePostMutation.mutate({ ...data, id: selectedPost.id } as Post, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error('게시물 업데이트 실패:', error);
        alert('게시물 업데이트에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  if (!selectedPost) return null;

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContents>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <PostForm initialData={selectedPost} onSubmit={handleUpdatePost} />
      </DialogContents>
    </Dialog>
  );
};

export default EditPostDialog;