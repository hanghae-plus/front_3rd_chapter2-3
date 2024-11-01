import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CommentType,
  deleteComment,
  patchLikeComment,
  postComment,
  updateComment,
} from "../../../entities/comment";

export const useCommentMutations = () => {
  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: async (newComment: Omit<CommentType, "id">) => {
      return postComment({ newComment: newComment as CommentType });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: async (comment: CommentType) => {
      return updateComment({ selectedComment: comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (comment: CommentType) => {
      return deleteComment({
        commentId: comment.id,
        postId: comment.postId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const postCommentLikeMutation = useMutation({
    mutationFn: async (comment: CommentType) => {
      return patchLikeComment({
        commentId: comment.id,
        postId: comment.postId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return {
    postCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    postCommentLikeMutation,
  };
};
