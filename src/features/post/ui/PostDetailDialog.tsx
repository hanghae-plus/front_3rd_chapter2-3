// src/features/posts/components/PostDetailDialog.tsx
import React from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import { Button } from '../../../shared/ui/Button/Button';
import highlightText from '../../../shared/utils/highlightText';
import { EnrichedPost } from '../../../entities/post/api/enrichedPost';
import { Comment } from '../../../entities/comment/api/commentApi';
import CommentsList from '../../../features/comments/components/CommentsList';
import { useAtom } from 'jotai';
import { showPostDetailDialogAtom, selectedPostAtom } from '../../../entities/post/model/postAtom';
import { showAddCommentDialogAtom } from '../../../entities/comment/model/commentAtom';

interface PostDetailDialogProps {
  comments: Comment[];
}

const PostDetailDialog: React.FC<PostDetailDialogProps> = ({ comments }) => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom);

  if (!selectedPost) return null;

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContents className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, '')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, '')}</p>
          <CommentsList comments={comments} searchQuery="" />
          <Button onClick={() => setShowAddCommentDialog(true)}>댓글 추가</Button>
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default PostDetailDialog;
