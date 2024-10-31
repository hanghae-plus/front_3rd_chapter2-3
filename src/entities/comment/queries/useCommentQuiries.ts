import { useCommonDetailQuery } from '../../../shared';
import { commentApi } from '../api/commentApi';
import { CommentResponse } from '../model/commentTypes';

export const useCommentsByPost = (postId: number) => {
  return useCommonDetailQuery<CommentResponse>({
    queryKey: ["comments", postId],
    queryFn: () => commentApi.getCommentsByPost(postId),
    id: postId,
  })
}
