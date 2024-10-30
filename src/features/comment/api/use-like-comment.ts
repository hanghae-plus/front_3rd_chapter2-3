import { commentApi } from "@/entities/comment/api/comment-api";
import { commentQueries } from "@/entities/comment/api/comment-quries";
import { Comment } from "@/entities/comment/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentApi.likeComment,
    onSuccess: (data) => {
      queryClient.setQueryData(
        commentQueries.list({ postId: data.postId }).queryKey,
        (oldData: Comment[] | undefined) => {
          if (!oldData) return undefined;
          return oldData.map((comment) => (comment.id === data.id ? { ...comment, likes: data.likes + 1 } : comment));
        },
      );
    },
  });
};
