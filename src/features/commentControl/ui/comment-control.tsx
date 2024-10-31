import { overlay } from "overlay-kit";

import { Button } from "@/shared/ui";
import { CommentItemProps } from "@/widgets/comment/comment-container";
import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { useLikeComment } from "../model/use-like-comment";
import { useDeleteComment } from "../model/use-delete-comment";
import { UpdateCommentDialog } from "./update-comment-dialog";

export const CommentControl = ({ commentList, comment, commenthandler }: CommentItemProps) => {
  const { updateComment, deleteComment } = commenthandler;
  const { hanldeLikeComment } = useLikeComment(commentList, comment.id);
  const { handleDeleteComment } = useDeleteComment(comment.id);

  return (
    <div className="flex items-center space-x-1">
      <Button variant="ghost" size="sm" onClick={() => hanldeLikeComment(updateComment)}>
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          overlay.open(({ isOpen, close }) => {
            return (
              <UpdateCommentDialog
                isOpen={isOpen}
                close={close}
                comment={comment}
                updateComment={updateComment}
              />
            );
          });
        }}
      >
        <Edit2 className="w-3 h-3" />
      </Button>

      <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(deleteComment)}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};
