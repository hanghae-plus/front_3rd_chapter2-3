import { commentApi } from "../api/commentApi"
import { useCommonQuery } from "../../../shared/lib/query/useCommonQuery"
import { Comment } from "../model/commentTypes"

export const useCommentsByPost = (postId: number) => {
  return useCommonQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => commentApi.getCommentsByPost(postId),
  })
}
