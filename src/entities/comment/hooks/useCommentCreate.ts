import { createCommentApi } from "@entities/comment/api/createComment"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  CommentsFetchResult,
  CommentForm,
  Comment,
} from "@entities/comment/types"

export const useCommentCreate = () => {
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: createCommentApi,
    onSuccess: (data: Comment) => {
      queryClient.setQueryData(["comment"], (oldData: CommentsFetchResult) => ({
        limit: oldData.limit,
        skip: oldData.skip,
        comments: [
          {
            ...data,
            id: oldData?.comments?.length || 0,
          },
          ...(oldData?.comments || []),
        ],
        total: (oldData?.total || 0) + 1,
      }))
    },
  })

  const createComment = (comment: CommentForm) => {
    createCommentMutation.mutate(comment)
  }

  return { createComment }
}
