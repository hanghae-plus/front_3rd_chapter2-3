import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { withDefaultLikes } from "../lib/comment-query-helper";
import { commentApi } from "./comment-api";

const createQueryKey = (base: string[], ...params: unknown[]) => [...base, ...params];

export const commentQueries = {
  all: () => ["comments"],
  list: ({ postId }: { postId: number }) =>
    queryOptions({
      queryKey: createQueryKey(commentQueries.all(), "list", postId),
      queryFn: () => commentApi.fetchComments(postId),
      placeholderData: keepPreviousData,
      select: (data) => {
        return data.map(withDefaultLikes);
      },
    }),
};
