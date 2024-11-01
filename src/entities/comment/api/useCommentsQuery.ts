import { useQuery } from "@tanstack/react-query"
import { Comment } from "../model/types"
import { commentQueryKeys } from "./comment.queries"
import { commentApi } from "./commentApi"

export const useCommentsQuery = (postId: Comment["postId"]) => {
  return useQuery({
    queryKey: commentQueryKeys.list(postId),
    queryFn: () => commentApi.fetchComments(postId),
    select: (data) => data.comments,
  })
}
