import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeComment } from "../../../shared/api/comment"
import { commentKeys } from "../../../shared/api/useCommentQuery"
import { Comment } from "../../../shared/types"

interface CommentsResponse {
  comments: Comment[]
  total: number
}

export const useCommentLike = () => {
  const queryClient = useQueryClient()

  const likeCommentMutation = useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(data.postId),
      })
    },
  })

  const handleLikeComment = async (id: number, postId: number) => {
    const comments = queryClient.getQueryData<CommentsResponse>(commentKeys.list(postId))
    const currentComment = comments?.comments.find((comment) => comment.id === id)
    if (!currentComment) return

    await likeCommentMutation.mutateAsync({ id, likes: currentComment.likes })
  }

  return { handleLikeComment }
}
