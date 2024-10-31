import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { Reactions } from '~/entities/post/model/types';

//TODO: feature는 아닌거같음
export const PostReactionCell = ({ reactions }: { reactions?: Reactions }) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{reactions?.dislikes || 0}</span>
    </div>
  );
};
