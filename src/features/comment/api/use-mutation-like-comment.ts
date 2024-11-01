import { useMutation } from "@tanstack/react-query";

import { CommentType } from "@/entities/comment/model/comment-type";
import { fetchLikeComment } from "@/entities/comment/api/fetch-like-comment";

export const useMutationLikeComment = (commentList: CommentType[], commentId: number) => {
  return useMutation({ mutationFn: () => fetchLikeComment(commentList, commentId) });
};
