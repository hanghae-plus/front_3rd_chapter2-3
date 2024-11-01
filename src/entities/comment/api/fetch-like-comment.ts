import apiRequest from "@/shared/api";
import { CommentType } from "@/entities/comment/model/comment-type";

const getCommentLike = (commentList: CommentType[], commentId: number) => {
  return commentList.find(comment => comment.id === commentId)?.likes ?? 0;
};

export const fetchLikeComment = async (
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
