import { QueryKey } from "@tanstack/react-query"
import { commentQueryKeys } from "../../../entities/comment/api/comment.queries"
import { FetchCommentResponse } from "../../../entities/comment/model/types"
import { queryClient } from "../../../shared/api"

export const getCommentsQueryData = (): [QueryKey, FetchCommentResponse] => {
  const [[queryKey, oldData]] =
    queryClient.getQueriesData<FetchCommentResponse>({
      queryKey: commentQueryKeys.lists(),
    })

  return [queryKey, { ...oldData, comments: oldData?.comments ?? [] }]
}
