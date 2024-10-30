import { commentApi } from "@/entities/comment/api/comment-api";
import { commentQueries } from "@/entities/comment/api/comment-quries";
import { Comment } from "@/entities/comment/model/types";
import { filterByID } from "@/shared/lib/array";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { postId: number; id: number }) => commentApi.deleteComment(id),
    onSuccess: (_, { postId, id }) => {
      queryClient.setQueryData(commentQueries.list({ postId }).queryKey, (oldData: Comment[] | undefined) => {
        if (!oldData) return undefined;
        return filterByID(oldData, id);
      });
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error);
    },
  });
};
