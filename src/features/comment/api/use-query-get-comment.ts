import { useQuery } from "@tanstack/react-query";

import { CommentType } from "@/entities/comment/model/comment-type";
import { fetchCommentList } from "@/entities/comment/api/fetch-get-comment";

export const useQueryGetComment = (postId: number) => {
  return useQuery<CommentType[]>({
    queryKey: ["comment-list", { postId }],
    queryFn: () => fetchCommentList(postId),
  });
};
