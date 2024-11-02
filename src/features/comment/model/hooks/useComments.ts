import { useCommentMutations } from '@entities/comment/api'
import { useCommentsQuery } from '@entities/comment/api'

export function useComments(postId: number) {
  const { data, isLoading, error, isError } = useCommentsQuery(postId)
  const { mutations, state: mutationState } = useCommentMutations(postId)
  return {
    comments: data ?? [],
    isCommentsLoading: isLoading || mutationState.isPending,
    isCommentsError: isError || mutationState.isError,
    commentsError: error || mutationState.error,
    addComment: mutations.addComment,
    updateComment: mutations.updateComment,
    deleteComment: mutations.deleteComment,
    likeComment: mutations.likeComment,
  }
}
