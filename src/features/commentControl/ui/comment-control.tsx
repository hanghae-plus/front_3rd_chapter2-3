import { Button } from "@/shared/ui";
import { CommentItemProps } from "@/widgets/comment/comment-container";
import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { useLikeComment } from "../model/use-like-comment";

export const CommentControl = ({ commentList, comment, commenthandler }: CommentItemProps) => {
  const { updateComment } = commenthandler;
  const { likeComment } = useLikeComment(commentList, comment.id);

  return (
    <div className="flex items-center space-x-1">
      <Button variant="ghost" size="sm" onClick={() => likeComment(updateComment)}>
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // setSelectedComment(comment);
          // setShowEditCommentDialog(true);
        }}
      >
        <Edit2 className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // deleteComment(comment.id, postId)
        }}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};
