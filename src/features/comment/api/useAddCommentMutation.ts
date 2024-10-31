import { useMutation } from "@tanstack/react-query"
import { commentApi } from "../../../entities/comment/api/commentApi"
import { FetchCommentResponse } from "../../../entities/comment/model/types"
import { queryClient } from "../../../shared/api"
import { getCommentsQueryData } from "./getCommentsQueryData"

export const useAddCommentMutation = () => {
  return useMutation({
    mutationFn: commentApi.addComment,
    onSuccess: (addedComment) => {
      const [queryKey, { comments }] = getCommentsQueryData()

      const newData: FetchCommentResponse = {
        comments: [...comments, addedComment],
      }

      queryClient.setQueriesData<FetchCommentResponse>({ queryKey }, newData)
    },
  })
}
