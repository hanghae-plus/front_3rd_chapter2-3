import { useCommonMutation } from '../../../shared/lib/query/useCommonMutation';
import { commentApi } from '../api/commentApi';
import {
  Comment,
  CommentRequests,
} from '../model/commentTypes';
import { useCommentStore } from '../model/useCommentStore';

export const useAddCommentMutation = () => {
  return useCommonMutation<Comment, CommentRequests["Create"]>({
    mutationFn: commentApi.addComment,
  })
}

export const useUpdateCommentMutation = () => {
  return useCommonMutation<Comment, { id: number; comment: CommentRequests["Update"] }>({
    mutationFn: ({ id, comment }) => commentApi.updateComment(id, comment),
  })
}

export const useDeleteCommentMutation = () => {
  const { comments, setComments } = useCommentStore()

  return useCommonMutation<void, { id: number; postId: number }>({
    mutationFn: ({ id }) => commentApi.deleteComment(id),
    onSuccessCallback: (_, { id }: { id: number; postId: number }) => {
      const updatedComments = comments.filter((comment) => comment.id !== id)
      setComments(updatedComments)
    },
  })
}

export const useLikeCommentMutation = () => {
  const { comments, setComments } = useCommentStore()

  return useCommonMutation<Comment, { id: number; postId: number }>({
    mutationFn: ({ id }) => {
      const currentLikes = comments.find((c) => c.id === id)?.likes ?? 0
      return commentApi.likeComment(id, currentLikes)
    },
    onSuccessCallback: (updatedComment, { id }) => {
      const updatedComments = comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              ...updatedComment,
              likes: (comment.likes ?? 0) + 1,
            }
          : comment,
      )

      setComments(updatedComments)
    },
  })
}
