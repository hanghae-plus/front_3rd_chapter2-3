import { FC } from 'react';
import { ThumbsUp, Edit2, Trash2, Plus } from 'lucide-react';

import { Button } from '@shared/ui/Button';
import type { Comment, Post } from '@/entities/home/model/types';

// 댓글 좋아요
const PostCommentLikeButton: FC<{ comment: Comment; selectedPost: Post }> = ({ comment, selectedPost }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => likeComment(comment.id, selectedPost.id)}
    >
      <ThumbsUp className="w-3 h-3" />
    </Button>
  );
};

// 댓글 수정 다이얼로그 열기
const PostCommentEditDialogOpenButton: FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedComment(comment);
        setShowEditCommentDialog(true);
      }}
    >
      <Edit2 className="w-3 h-3" />
    </Button>
  );
};

// 댓글 삭제
const PostCommentDeleteButton: FC<{ comment: Comment; selectedPost: Post }> = ({ comment, selectedPost }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => deleteComment(comment.id, selectedPost.id)}
    >
      <Trash2 className="w-3 h-3" />
    </Button>
  );
};

export const PostCoomentAddButton: FC<{ selectedPost: Post }> = ({ selectedPost }) => {
  return (
    <Button
      size="sm"
      onClick={() => {
        setNewComment((prev) => ({ ...prev, selectedPost }));
        setShowAddCommentDialog(true);
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  );
};

/** 좋아요, 수정, 삭제 버튼 */
const PostCommentActions: FC<{ comment: Comment; selectedPost: Post }> = ({ comment, selectedPost }) => {
  return (
    <div className="flex items-center space-x-1">
      <PostCommentLikeButton
        comment={comment}
        selectedPost={selectedPost}
      />

      <PostCommentEditDialogOpenButton comment={comment} />

      <PostCommentDeleteButton
        comment={comment}
        selectedPost={selectedPost}
      />
    </div>
  );
};

PostCommentActions.displayName = 'PostCommentActions';
export default PostCommentActions;
