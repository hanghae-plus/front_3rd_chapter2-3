import { useQueryGetComment } from "./../api/use-query-get-comment";
import { useEffect, useState } from "react";
import { CommentType } from "./comment-type";

export const useComment = (id: number) => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const { data, isLoading } = useQueryGetComment(id);

  async function addNewComment(newComment: CommentType) {
    setCommentList(prev => [...prev, newComment]);
  }

  useEffect(() => {
    if (!isLoading) {
      setCommentList(data ?? []);
    }
  }, [isLoading]);

  return { commentList, addNewComment };
};
