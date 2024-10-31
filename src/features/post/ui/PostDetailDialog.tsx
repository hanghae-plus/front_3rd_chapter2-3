// src/features/posts/components/PostDetailDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import {highlightText} from '../../../shared/utils/index';
import CommentsList from '../../../features/comment/ui/CommentList';
import { useAtom } from 'jotai';
import { showPostDetailDialogAtom, selectedPostAtom } from '../../../entities/post/model/postAtom';

const PostDetailDialog: React.FC= () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom);
  const [selectedPost, ] = useAtom(selectedPostAtom);
  
  if (!selectedPost) return null;

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContents className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, '')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, '')}</p>
          <CommentsList postId={selectedPost.id}  />
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default PostDetailDialog;
