import { useState } from "react";

import { CommentType } from "@/entities/comment/model/comment-type";
import { useMutationAddComment } from "@/entities/comment/api/use-mutation-add-comment";

export const useAddComment = (id: number) => {
  const [newComment, setNewComment] = useState({ body: "", postId: id || 0, userId: 1 });

  function handleChangeComment(text: string) {
    setNewComment(prev => ({ ...prev, body: text }));
  }

  const mutation = useMutationAddComment(newComment);

  async function addComment(addNewComment: (newComment: CommentType) => void, close: () => void) {
    const newCommentData = await mutation.mutateAsync();
    addNewComment(newCommentData);
    setNewComment({ body: "", postId: 0, userId: 1 });
    close();
  }

  return { newComment, handleChangeComment, addComment };
};
