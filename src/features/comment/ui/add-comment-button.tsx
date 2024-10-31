import { overlay } from "overlay-kit";

import { Button } from "@/shared/ui";
import { PostWithAuthorType } from "@/entities/post/model/post-type";
import { CommentType } from "@/entities/comment/model/comment-type";
import { AddCommentDialog } from "./add-comment-dialog";
import { Plus } from "lucide-react";

interface AddCommmentButtonProps {
  post: PostWithAuthorType;
  addNewComment: (newComment: CommentType) => void;
}

export const AddCommentButton = ({ post, addNewComment }: AddCommmentButtonProps) => {
  return (
    <Button
      size="sm"
      onClick={() => {
        overlay.open(({ isOpen, close }) => {
          return (
            <AddCommentDialog
              isOpen={isOpen}
              close={close}
              post={post}
              addNewComment={addNewComment}
            />
          );
        });
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  );
};
