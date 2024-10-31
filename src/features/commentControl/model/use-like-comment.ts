import { useMutationLikeComment } from "@/entities/comment/api/use-mutation-like-comment";
import { CommentType } from "@/entities/comment/model/comment-type";

export const useLikeComment = (commentList: CommentType[], commentId: number) => {
  const mutation = useMutationLikeComment(commentList, commentId);

  async function likeComment(updateComment: (newComment: CommentType) => void) {
    const newCommentData = await mutation.mutateAsync();
    updateComment(newCommentData);
  }

  return { likeComment };
};
