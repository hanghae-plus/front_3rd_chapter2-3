import { NewComment } from "@/pages/PostsManagerPage";
import { Button, Textarea } from "@/shared/ui";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type FormAddCommentProps = {
  setComments: Dispatch<SetStateAction<{ [key: number]: Comment[] }>>;
  close: () => void;
  postId: number;
};

const initialNewComment: NewComment = { body: "", postId: 0, userId: 1 };

const FormAddComment = ({ setComments, close, postId }: FormAddCommentProps) => {
  const [newComment, setNewComment] = useState<NewComment>(initialNewComment);

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      setNewComment(initialNewComment);
      close();
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
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
      <Button onClick={addComment}>댓글 추가</Button>
    </div>
  );
};

export default FormAddComment;
