import { commentApi } from "@/entities/comment/api/comment-api";
import { commentQueries } from "@/entities/comment/api/comment-quries";
import { Comment } from "@/entities/comment/model/types";
import { addItemInArray } from "@/shared/lib/array";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentApi.addComment,
    onSuccess: (data) => {
      queryClient.setQueryData(
        commentQueries.list({ postId: data.postId }).queryKey,
        (oldData: Comment[] | undefined) => {
          if (!oldData) return undefined;
          return addItemInArray(oldData, data);
        },
      );
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error);
    },
  });
};
