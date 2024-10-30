import { NewComment } from "@/entities/comment/model/types";

import { Button, Textarea } from "@/shared/ui";

import { useModalStore } from "@/shared/model/useModalStore";
import { useState } from "react";
import { useAddComment } from "../../api/use-add-comment";

type FormAddCommentProps = {
  postId: number;
};

const initialNewComment: NewComment = { body: "", postId: 0, userId: 1 };

const FormAddComment = ({ postId }: FormAddCommentProps) => {
  const close = useModalStore((state) => state.close);
  const { mutate: addComment } = useAddComment();
  const [newComment, setNewComment] = useState<NewComment>(() => ({ ...initialNewComment, postId }));

  const handleAddComment = async () => {
    addComment(newComment);
    setNewComment(initialNewComment);
    close({ type: "addComment" });
  };

  const handleChangeComment = (key: keyof NewComment, value: string | number) => {
    setNewComment((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => handleChangeComment("body", e.target.value)}
      />
      <Button onClick={handleAddComment}>댓글 추가</Button>
    </div>
  );
};

export default FormAddComment;
