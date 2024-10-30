import { Comment } from "@/entities/comment/model/types";
import HighlightText from "@/shared/ui/HighlightText";

type CommentInfoProps = {
  comment: Comment;
  search: string;
};

const CommentInfo = ({ comment, search }: CommentInfoProps) => {
  return (
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{comment.user.username}:</span>
      <span className="truncate">
        <HighlightText text={comment.body} highlight={search} />
      </span>
    </div>
  );
};

export default CommentInfo;
