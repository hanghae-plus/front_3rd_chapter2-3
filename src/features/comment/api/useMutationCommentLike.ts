import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment, CommentDTO } from "../../../entities/comment/model/types";
import { likeCommentApi } from "../../../entities/comment/api";

export const useMutationCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, newLike }: { commentId: number; newLike: number }) => likeCommentApi(commentId, newLike),
    onSuccess: (response: Comment) => {
      queryClient.setQueryData(["comments", response.postId], (data: CommentDTO) => {
        const updatedComments = {
          ...data,
          comments: data.comments.map((comment) =>
            comment.id === response.id ? { ...response, likes: response.likes + 1 } : comment,
          ),
        };
        return updatedComments;
      });
    },
  });
};
