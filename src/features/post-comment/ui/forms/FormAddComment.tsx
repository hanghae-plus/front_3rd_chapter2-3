import { NewComment } from "@/features/post-comment/model/types";

import { Button, Textarea } from "@/shared/ui";

import { useEffect, useState } from "react";
import useCommentStore from "../../model/useCommentStore";

type FormAddCommentProps = {
  close: () => void;
  postId: number;
};

const initialNewComment: NewComment = { body: "", postId: 0, userId: 1 };

const FormAddComment = ({ close, postId }: FormAddCommentProps) => {
  const addComment = useCommentStore((state) => state.addComment);
  const [newComment, setNewComment] = useState<NewComment>(initialNewComment);

  const handleAddComment = () => {
    addComment(newComment);
    setNewComment(initialNewComment);
    close();
  };

  const handleChangeComment = (key: keyof NewComment, value: string | number) => {
    setNewComment((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!postId) return;
    setNewComment((prev) => ({ ...prev, postId }));
  }, [postId]);

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
