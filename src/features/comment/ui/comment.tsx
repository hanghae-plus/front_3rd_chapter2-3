import { ThumbsUp, Edit2, Trash2 } from "lucide-react";
import { CommentType } from "../../../entities/comment";

import { renderHighlightText } from "../../../shared/lib";
import { Button } from "../../../shared/ui";
import { usePostQuery } from "../../post/api/use-post-query";
import { useUser } from "../../user";
import { useComment } from "../model/use-comment";
import { useCommentMutations } from "../api/use-comment-mutations";

interface CommentPropsType {
  comment: CommentType;
}

export const Comment = (props: CommentPropsType) => {
  const { comment } = props;

  const { searchQuery } = usePostQuery();
  const { setSelectedComment, setShowEditCommentDialog } = useComment();
  const { selectedUser } = useUser();

  const { postCommentLikeMutation, deleteCommentMutation } = useCommentMutations();

  const handleLikeComment = (comment: CommentType) => {
    postCommentLikeMutation.mutate(comment);
  };
  const handleDeleteComment = (comment: CommentType) => {
    deleteCommentMutation.mutate(comment);
  };

  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{selectedUser?.username}:</span>
        <span className="truncate">{renderHighlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
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
        <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};
