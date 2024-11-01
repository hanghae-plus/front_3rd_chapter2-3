import { FC } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

import type { Post } from '@/entities/home/model/types';

const PostTableReactions: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{post.reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{post.reactions?.dislikes || 0}</span>
    </div>
  );
};

PostTableReactions.displayName = 'PostTableReactions';
export default PostTableReactions;
