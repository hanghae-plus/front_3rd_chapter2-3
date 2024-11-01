import { useMutationDeleteComment } from "../api/use-mutation-delete-comment";

export const useDeleteComment = (commentId: number) => {
  const mutation = useMutationDeleteComment(commentId);

  async function handleDeleteComment(deleteComment: (_commentId: number) => void) {
    await mutation.mutateAsync();
    deleteComment(commentId);
  }

  return { handleDeleteComment };
};
