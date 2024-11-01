import { fetchDeleteComment } from "@/entities/comment/api/fetch-delete-comment";
import { useMutation } from "@tanstack/react-query";

export const useMutationDeleteComment = (commentId: number) => {
  return useMutation({ mutationFn: () => fetchDeleteComment(commentId) });
};
