import { createCommentApi } from "@entities/comment/api/createComment"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentResponse, Comment } from "@entities/comment/model"

export const useMutationCommentCreate = () => {
  const queryClient = useQueryClient()

  const addCommentToCache = (newComment: Comment, oldData: CommentResponse) => ({
    ...oldData,
    comments: [
      {
        ...newComment,
        id: oldData?.comments?.length || 0,
      },
      ...(oldData?.comments || []),
    ],
    total: (oldData?.total || 0) + 1
  })

  const { mutate: createComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: (data: Comment) => {
      queryClient.setQueryData(["comment"], (oldData: CommentResponse) => 
        addCommentToCache(data, oldData)
      )
    },
  })

  return { createComment }
}