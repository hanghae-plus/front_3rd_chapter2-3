import { useMutation } from "@tanstack/react-query";

import apiRequest from "@/shared/api";

const fetchDeleteComment = async (commentId: number) => {
  try {
    await apiRequest.delete(`/api/comments/${commentId}`);
  } catch (error) {
    console.error(error);
  }
};

export const useMutationDeleteComment = (commentId: number) => {
  return useMutation({ mutationFn: () => fetchDeleteComment(commentId) });
};
