import { Comment } from "@/entities/comment/model/types";

import { Button, Textarea } from "@/shared/ui";

import { useModalStore } from "@/shared/model/useModalStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useUpdateComment } from "../../api/use-update-comment";
import useCommentStore from "../../model/useCommentStore";

type FormEditCommentProps = {
  comment: Comment | null;
};

const FormEditComment = ({ comment }: FormEditCommentProps) => {
  const close = useModalStore((state) => state.close);
  const { mutate: updateComment } = useUpdateComment();
  const { handleSelectComment, selectedComment } = useCommentStore(
    useShallow((state) => ({
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
    close({ type: "editComment", id: selectedComment.id });
  };

  useEffect(() => {
    if (!comment) return;
    handleSelectComment(comment);
  }, [comment, handleSelectComment]);

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleChangeComment} />
      <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
    </div>
  );
};

export default FormEditComment;
