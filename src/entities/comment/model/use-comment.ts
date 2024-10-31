import { useQueryGetComment } from "./../api/use-query-get-comment";
import { useEffect, useState } from "react";
import { CommentType } from "./comment-type";

export const useComment = (id: number) => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const { data, isLoading } = useQueryGetComment(id);

  const updateCommentById = (prev: CommentType[], newComment: CommentType) => {
    return prev.map(comment => (comment.id === newComment.id ? newComment : comment));
  };

  const commentHandler = {
    addNewComment: (newComment: CommentType) => setCommentList(prev => [...prev, newComment]),
    updateComment: (newComment: CommentType) => {
      setCommentList(prev => updateCommentById(prev, newComment));
    },
  };

  useEffect(() => {
    if (!isLoading) {
      setCommentList(data ?? []);
    }
  }, [isLoading]);

  return { commentList, commentHandler };
};
