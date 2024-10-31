import { useMutation } from "@tanstack/react-query"
import { commentApi } from "../../../entities/comment/api/commentApi"
import { FetchCommentResponse } from "../../../entities/comment/model/types"
import { queryClient } from "../../../shared/api"
import { getCommentsQueryData } from "./getCommentsQueryData"

export const useUpdateCommentMutation = () => {
  return useMutation({
    mutationFn: commentApi.updateComment,
    onSuccess: (updatedComment) => {
      const [queryKey, { comments }] = getCommentsQueryData()

      const newData: FetchCommentResponse = {
        comments: comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      }

      queryClient.setQueriesData<FetchCommentResponse>({ queryKey }, newData)
    },
  })
}
