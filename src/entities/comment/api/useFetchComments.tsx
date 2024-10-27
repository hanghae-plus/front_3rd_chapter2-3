import { CommentResponse } from "@/entities/comment/model/types";
import { useEffect, useState } from "react";
import { Comment } from "../model/types";
type UseFetchCommentsProps = {
  postId: number;
};

export const useFetchComments = ({ postId }: UseFetchCommentsProps) => {
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async (postId: number) => {
      if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
      setLoading(true);
      try {
        const response = await fetch(`/api/comments/post/${postId}`);
        const data = (await response.json()) as CommentResponse;
        setComments((prev) => ({ ...prev, [postId]: data.comments }));
      } catch (error) {
        console.error("댓글 가져오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments(postId);
  }, [postId]);

  return { comments, loading };
};
