import { CommentType } from "@/entities/comment/model/comment-type";
import apiRequest from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

const getCommentLike = (commentList: CommentType[], commentId: number) => {
  return commentList.find(comment => comment.id === commentId)?.likes ?? 0;
};

const fetchLikeComment = async (
  commentList: CommentType[],
  commentId: number,
): Promise<CommentType> => {
  try {
    const commentLike = { like: getCommentLike(commentList, commentId) + 1 };
    const response = await apiRequest.patch(`/api/comments/${commentId}`, commentLike);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useMutationLikeComment = (commentList: CommentType[], commentId: number) => {
  return useMutation({ mutationFn: () => fetchLikeComment(commentList, commentId) });
};
