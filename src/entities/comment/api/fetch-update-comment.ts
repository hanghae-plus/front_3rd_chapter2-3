import apiRequest from "@/shared/api";
import { CommentType } from "../model/comment-type";

export const fetchUpdateComment = async (
  commentBody: string,
  commentId: number,
): Promise<CommentType> => {
  const body = { body: commentBody };
  try {
    const response = await apiRequest.put(`/api/comments/${commentId}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
