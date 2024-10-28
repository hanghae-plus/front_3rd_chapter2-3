import { Comment } from "@/entities/comment/model/types";
import { useCommentContext } from "@/shared/model/CommnentContext";
import { Button, Textarea } from "@/shared/ui";
import { useEffect } from "react";
import { postCommentApi } from "../api/postCommentApi";
import { useSelectedComment } from "../model/SelectedCommentContext";

type FormEditCommentProps = {
  close: () => void;
  comment: Comment | null;
};

const FormEditComment = ({ close, comment }: FormEditCommentProps) => {
  const { selectedComment, handleSelectComment } = useSelectedComment();
  const { handleSetComments } = useCommentContext();

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) return;
    handleSelectComment({ ...selectedComment, body: e.target.value });
  };

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) return;
    try {
      const data = await postCommentApi.updateComment(selectedComment);
      handleSetComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
      close();
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    }
  };

  useEffect(() => {
    if (!comment) return;
    handleSelectComment(comment);
  }, [comment]);

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleChangeComment} />
      <Button onClick={updateComment}>댓글 업데이트</Button>
    </div>
  );
};

export default FormEditComment;
