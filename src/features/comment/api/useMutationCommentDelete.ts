import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment, CommentDTO } from "../../../entities/comment/model/types";
import { deleteCommentApi } from "../../../entities/comment/api";

export const useMutationCommentDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteCommentApi(commentId),
    onSuccess: (response: Comment) => {
      queryClient.setQueryData(["comments", response.postId], (data: CommentDTO) => {
        const updatedComments = {
          ...data,
          comments: data.comments.filter((comment) => comment.id !== response.id),
        };
        return updatedComments;
      });
    },
  });
};
