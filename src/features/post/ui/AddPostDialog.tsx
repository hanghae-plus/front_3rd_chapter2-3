// src/features/posts/components/AddPostDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/InputBox/InputBox';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { useAtom } from 'jotai';
import { newPostAtom, showAddDialogAtom } from '../../../entities/post/model/postAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost } from '../../../entities/post/api/postApi';

const AddPostDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [newPost, setNewPost] = useAtom(newPostAtom);

  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setShowAddDialog(false);
      setNewPost({ title: '', body: '', userId: 1 });
    },
    onError: (error: any) => {
      console.error('게시물 추가 오류:', error);
      // 필요 시 사용자에게 에러 메시지 표시
    },
  });

  const handleSubmit = () => {
    addPostMutation.mutate(newPost);
  };

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContents>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={5}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleSubmit} disabled={addPostMutation.isLoading}>
            {addPostMutation.isLoading ? '추가 중...' : '게시물 추가'}
          </Button>
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default AddPostDialog;
