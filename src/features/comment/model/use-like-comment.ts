import { CommentType } from "@/entities/comment/model/comment-type";
import { useMutationLikeComment } from "../api/use-mutation-like-comment";

export const useLikeComment = (commentList: CommentType[], commentId: number) => {
  const mutation = useMutationLikeComment(commentList, commentId);

  async function hanldeLikeComment(updateComment: (_newComment: CommentType) => void) {
    const newCommentData: CommentType = await mutation.mutateAsync();
    updateComment(newCommentData);
  }

  return { hanldeLikeComment };
};
