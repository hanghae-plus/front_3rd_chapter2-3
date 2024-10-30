import { createQueryKey } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";
import { withDefaultLikes } from "../lib/comment-query-helper";
import { commentApi } from "./comment-api";

export const commentQueries = {
  all: () => ["comments"],
  list: ({ postId }: { postId: number }) =>
    queryOptions({
      queryKey: createQueryKey(commentQueries.all(), "list", postId),
      queryFn: async () => {
        try {
          return await commentApi.fetchComments(postId);
        } catch (error) {
          console.error("댓글 조회 오류:", error);
          throw error;
        }
      },
      select: (data) => data.map(withDefaultLikes),
    }),
};
