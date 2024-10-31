import { commentApi } from "../api/commentApi"
import { COMMENT_QUERY_KEYS } from "../model/commentQueryKeys"
import { useCommonQuery } from "../../../shared/lib/query/useCommonQuery"
import { Comment } from "../model/commentTypes"

export const useCommentsByPost = (postId: number) => {
  return useCommonQuery<Comment[]>({
    queryKey: COMMENT_QUERY_KEYS.listByPost(postId),
    queryFn: () => commentApi.getCommentsByPost(postId),
  })
}
