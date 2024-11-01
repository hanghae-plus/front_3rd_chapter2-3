import { fetchUpdateComment } from "@/entities/comment/api/fetch-update-comment";
import { useMutation } from "@tanstack/react-query";

export const useMutationUpdateComment = (commentBody: string, commentId: number) => {
  return useMutation({ mutationFn: () => fetchUpdateComment(commentBody, commentId) });
};
