import apiRequest from "@/shared/api";
import { CommentType } from "../model/comment-type";

export const fetchCommentList = async (postId: number): Promise<CommentType[]> => {
  try {
    const response = await apiRequest.get(`/api/comments/post/${postId}`);
    return response.data?.comments;
  } catch (error) {
    console.error("댓글 가져오기 오류", error);
    throw error;
  }
};
