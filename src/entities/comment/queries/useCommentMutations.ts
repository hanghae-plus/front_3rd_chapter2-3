import { useCommonMutation } from "../../../shared/lib/query/useCommonMutation"
import { commentApi } from "../api/commentApi"
import { CommentRequests } from "../model/commentTypes"

export const useAddCommentMutation = () => {
  return useCommonMutation<Comment, CommentRequests["Create"]>({
    mutationFn: commentApi.addComment,
    onSuccessCallback: (data) => {
      // 새 댓글이 추가되면 해당 게시물의 댓글 목록을 무효화
    },
  })
}

export const useUpdateCommentMutation = () => {
  return useCommonMutation<Comment, { id: number; comment: CommentRequests["Update"] }>({
    mutationFn: ({ id, comment }) => commentApi.updateComment(id, comment),
    onSuccessCallback: (data) => {
      // 댓글이 수정되면 해당 게시물의 댓글 목록을 무효화
    },
  })
}

export const useDeleteCommentMutation = () => {
  return useCommonMutation<void, number, { postId: number }>({
    mutationFn: commentApi.deleteComment,
    onSuccessCallback: (_, commentId, context) => {
      // 댓글이 삭제되면 해당 게시물의 댓글 목록을 무효화
      // if (context?.postId) {
      // }
    },
  })
}

export const useLikeCommentMutation = () => {
  return useCommonMutation<Comment, { id: number; likes: number }>({
    mutationFn: ({ id, likes }) => commentApi.likeComment(id, likes),
    onSuccessCallback: (data) => {
      // 좋아요가 업데이트되면 해당 게시물의 댓글 목록을 무효화
    },
  })
}

/**
 * 
 * export const useCommentActions = (postId: number) => {
  const deleteComment = useDeleteCommentMutation();

  const handleDelete = async (commentId: number) => {
    await deleteComment.mutateAsync(commentId, {
      context: { postId }
    });
  };

  return {
    deleteComment: handleDelete,
    isDeleting: deleteComment.isLoading
  };
};
 */
