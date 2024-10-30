import { commentQueries } from "@/entities/comment/api/comment.quries";
import { commentApi } from "@/entities/comment/api/commentApi";
import { Comment } from "@/entities/comment/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { postId: number; id: number }) => commentApi.deleteComment(id),
    onSuccess: (_, { postId, id }) => {
      queryClient.setQueryData(commentQueries.list({ postId }).queryKey, (oldData: Comment[] | undefined) => {
        if (!oldData) return undefined;
        return oldData.filter((comment) => comment.id !== id);
      });
    },
  });
};
