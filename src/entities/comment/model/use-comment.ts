import { useEffect, useState } from "react";

import { CommentType } from "./comment-type";
import { useQueryGetComment } from "@/features/comment/api/use-query-get-comment";

export const useComment = (id: number) => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const { data, isLoading } = useQueryGetComment(id);

  const updateCommentById = (prev: CommentType[], newComment: CommentType) => {
    return prev.map(comment => (comment.id === newComment.id ? newComment : comment));
  };

  const exceptComment = (prev: CommentType[], commentId: number) => {
    return prev.filter(comment => comment.id !== commentId);
  };

  const commentHandler = {
    addNewComment: (newComment: CommentType) => setCommentList(prev => [...prev, newComment]),
    updateComment: (newComment: CommentType) => {
      setCommentList(prev => updateCommentById(prev, newComment));
    },
    deleteComment: (commentId: number) => setCommentList(prev => exceptComment(prev, commentId)),
  };

  useEffect(() => {
    if (!isLoading) {
      setCommentList(data ?? []);
    }
  }, [isLoading]);

  return { commentList, commentHandler };
};
