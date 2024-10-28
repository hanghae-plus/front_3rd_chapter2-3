import { Comment } from "@/entities/comment/model/types";
import { Button, Textarea } from "@/shared/ui";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSelectedComment } from "../model/SelectedCommentContext";

type FormEditCommentProps = {
  setComments: Dispatch<SetStateAction<{ [key: number]: Comment[] }>>;
  close: () => void;
  comment: Comment | null;
};

const FormEditComment = ({ setComments, close, comment }: FormEditCommentProps) => {
  const { selectedComment, handleSelectComment } = useSelectedComment();

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) return;
    handleSelectComment({ ...selectedComment, body: e.target.value });
  };

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment?.body }),
      });
      const data = await response.json();
      setComments((prev) => ({
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
