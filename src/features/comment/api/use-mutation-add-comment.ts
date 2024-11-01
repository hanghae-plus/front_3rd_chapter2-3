import { useMutation } from "@tanstack/react-query";

import { fetchAddComment } from "@/entities/comment/api/fetch-add-comment";
import { NewCommentType } from "@/entities/comment/model/comment-type";

export const useMutationAddComment = (newComment: NewCommentType) => {
  return useMutation({ mutationFn: () => fetchAddComment(newComment) });
};
