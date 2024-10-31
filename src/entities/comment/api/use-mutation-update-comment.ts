import apiRequest from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { CommentType } from "../model/comment-type";

const fetchUpdateComment = async (commentBody: string, commentId: number): Promise<CommentType> => {
  const body = { body: commentBody };
  try {
    const response = await apiRequest.put(`/api/comments/${commentId}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useMutationUpdateComment = (commentBody: string, commentId: number) => {
  return useMutation({ mutationFn: () => fetchUpdateComment(commentBody, commentId) });
};
