import { Comment } from "@/entities/comment/model/types";

import { useGlobalModal } from "@/shared/model/useGlobalModal";
import { Button, Textarea } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useUpdateComment } from "../../api/use-update-comment";

type FormEditCommentProps = {
  comment: Comment | null;
};

const FormEditComment = ({ comment }: FormEditCommentProps) => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { close } = useGlobalModal("editComment", comment?.id);
  const { mutate: updateComment } = useUpdateComment();

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedComment((prev) => {
      if (!prev) return null;
      return { ...prev, body: e.target.value };
    });
  };

  const handleUpdateComment = () => {
    if (!selectedComment) return;
    updateComment(selectedComment);
    close();
  };

  useEffect(() => {
    if (!comment) return;
    setSelectedComment(comment);
  }, [comment]);

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleChangeComment} />
      <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
    </div>
  );
};

export default FormEditComment;
