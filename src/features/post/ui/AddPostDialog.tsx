// src/features/posts/components/AddPostDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import PostForm from './PostForm';
import { useAtom } from 'jotai';
import { showAddDialogAtom } from '../../../entities/post/model/postAtom';
import { Post } from '../../../entities/post/api/types';
import usePostMutations from '../model/usePostMutations';

const AddPostDialog: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const { addPostMutation } = usePostMutations();

  const handleClose = () => {
    setShowAddDialog(false);
  };

  const handleAddPost = (data:Partial<Omit<Post, "id" | "reactions" | "author">>) => {
    addPostMutation.mutate(data, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error('게시물 추가 실패:', error);
        alert('게시물 추가에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContents>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <PostForm onSubmit={handleAddPost} />
      </DialogContents>
    </Dialog>
  );
};

export default AddPostDialog;