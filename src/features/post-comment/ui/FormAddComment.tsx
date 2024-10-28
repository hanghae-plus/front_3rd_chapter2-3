import { Comment } from "@/entities/comment/model/types";
import { NewComment } from "@/pages/PostsManagerPage";
import { Button, Textarea } from "@/shared/ui";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { postCommentApi } from "../api/postCommentApi";

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
      const data = await postCommentApi.addComment(newComment);
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
