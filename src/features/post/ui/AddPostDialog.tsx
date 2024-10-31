// src/features/posts/components/AddPostDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import PostForm from './PostForm';
import { useAtom } from 'jotai';
import { newPostAtom, postsAtom, showAddDialogAtom } from '../../../entities/post/model/postAtom';
import { Post } from '../../../entities/post/api/types';
import usePostMutations from '../model/usePostMutations';
import { useQueryClient } from '@tanstack/react-query';

const AddPostDialog: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const { addPostMutation } = usePostMutations();
  const [, setNewPost] = useAtom(newPostAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  
  const queryClient = useQueryClient();

  const handleClose = () => {
    setShowAddDialog(false);
  };

  const handleAddPost = (data:Partial<Omit<Post, "id" | "reactions" | "author">>) => {
    addPostMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['post']});
        handleClose();
        setNewPost({ title: '', body: '', userId: 1 });
        setPosts([...posts,{...data, reactions: {likes: 0, dislikes: 0},tags:[]}])
        console.log(posts)
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