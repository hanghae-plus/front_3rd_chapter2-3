import apiRequest from "@/shared/api";
import { CommentType, NewCommentType } from "../model/comment-type";

export const fetchAddComment = async (newComment: NewCommentType): Promise<CommentType> => {
  try {
    const response = await apiRequest.post("/api/comments/add", newComment);
    return { ...response.data, likes: 0 };
  } catch (error) {
    console.error("댓글 추가 오류", error);
    throw error;
  }
};
