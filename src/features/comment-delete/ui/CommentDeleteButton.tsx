import { Comment } from "@/entities/comment/model/types";
import { postCommentApi } from "@/features/post-comment/api/postCommentApi";
import { useCommentContext } from "@/shared/model/CommnentContext";
import { Button } from "@/shared/ui";
import { Trash2 } from "lucide-react";

type CommentLikeButtonProps = {
  comment: Comment;
  postId: number;
};

const CommentDeleteButton = ({ comment, postId }: CommentLikeButtonProps) => {
  const { handleSetComments } = useCommentContext();

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await postCommentApi.deleteComment(id);
      handleSetComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  );
};

export default CommentDeleteButton;
