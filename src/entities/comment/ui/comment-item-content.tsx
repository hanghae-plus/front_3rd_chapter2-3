import { PostTitleHighlight } from "@/entities/post/ui/post-title-highlight";
import { CommentType } from "../model/comment-type";

interface CommentItemContentProps {
  comment: CommentType;
}

export const CommentItemContent = ({ comment }: CommentItemContentProps) => {
  return (
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{comment.user.username}:</span>
      <span className="truncate">
        <PostTitleHighlight text={comment.body} />
      </span>
    </div>
  );
};
