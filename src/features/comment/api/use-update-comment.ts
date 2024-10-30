import { commentApi } from "@/entities/comment/api/comment-api";
import { commentQueries } from "@/entities/comment/api/comment-quries";
import { Comment } from "@/entities/comment/model/types";
import { updateByID } from "@/shared/lib/array";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentApi.updateComment,
    onSuccess: (data) => {
      queryClient.setQueryData(
        commentQueries.list({ postId: data.postId }).queryKey,
        (oldData: Comment[] | undefined) => {
          if (!oldData) return undefined;
          return updateByID(oldData, data);
        },
      );
    },
    onError: (error) => {
      console.error("댓글 수정 오류:", error);
    },
  });
};
