import { FC } from 'react';
import { Button } from '@shared/ui/Button';
import { MessageSquare, Edit2, Trash2 } from 'lucide-react';

import type { Post } from '@/entities/home/model/types';
import { usePost } from '@/features/home/model/usePost';
import useComment from '@/features/home/model/useComment';

// 게시물 상세 보기
// const openPostDetail = (post: Post) => {
//   setSelectedPost(post);
//   fetchComments(post.id);
//   setShowPostDetailDialog(true);
// };

const PostDetailDialogOpenButton: FC<{ post: Post }> = ({ post }) => {
  const { setSelectedPost, setIsPostDetailDialogOpen } = usePost();

  function handlePostDetailDialogOpen() {
    setSelectedPost(post);
    setIsPostDetailDialogOpen(true);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePostDetailDialogOpen}
    >
      <MessageSquare className="w-4 h-4" />
    </Button>
  );
};

const PostEditDialogOpenButton: FC<{ post: Post }> = ({ post }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedPost(post);
        setShowEditDialog(true);
      }}
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  );
};

const PostDeleteButton: FC<{ post: Post }> = ({ post }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => deletePost(post.id)}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

const PostTableActions: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex items-center gap-2">
      <PostDetailDialogOpenButton post={post} />
      <PostEditDialogOpenButton post={post} />
      <PostDeleteButton post={post} />
    </div>
  );
};

PostTableActions.displayName = 'PostTableActions';
export default PostTableActions;
