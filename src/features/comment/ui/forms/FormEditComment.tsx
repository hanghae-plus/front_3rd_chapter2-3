import { Comment } from "@/entities/comment/model/types";

import { Button, Textarea } from "@/shared/ui";

import { useModalEditComment } from "../../model/useModalEditComment";

type FormEditCommentProps = {
  comment: Comment | null;
};

const FormEditComment = ({ comment }: FormEditCommentProps) => {
  const { selectedComment, handleChangeComment, handleUpdateComment } = useModalEditComment(comment);

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleChangeComment} />
      <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
    </div>
  );
};

export default FormEditComment;
