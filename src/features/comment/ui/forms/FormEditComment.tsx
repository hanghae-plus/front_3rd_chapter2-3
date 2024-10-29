import { Comment } from "@/entities/comment/model/types";

import { Button, Textarea } from "@/shared/ui";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import useCommentStore from "../../model/useCommentStore";

type FormEditCommentProps = {
  close: () => void;
  comment: Comment | null;
};

const FormEditComment = ({ close, comment }: FormEditCommentProps) => {
  const { updateComment, handleSelectComment, selectedComment } = useCommentStore(
    useShallow((state) => ({
      updateComment: state.updateComment,
      handleSelectComment: state.handleSelectComment,
      selectedComment: state.selectedComment,
    })),
  );

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) return;
    handleSelectComment({ ...selectedComment, body: e.target.value });
  };

  const handleUpdateComment = () => {
    if (!selectedComment) return;
    updateComment(selectedComment);
    close();
  };

  useEffect(() => {
    if (!comment) return;
    handleSelectComment(comment);
  }, [comment]);

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleChangeComment} />
      <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
    </div>
  );
};

export default FormEditComment;
