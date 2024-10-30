import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { commentApi } from "./commentApi";

export const commentQueries = {
  all: () => ["comments"],
  list: ({ postId }: { postId: number }) =>
    queryOptions({
      queryKey: [...commentQueries.all(), "list", postId],
      queryFn: () => commentApi.fetchComments(postId),
      placeholderData: keepPreviousData,
      select: (data) => {
        return data.map((comment) => ({
          ...comment,
          ...(comment.likes ? { likes: comment.likes } : { likes: 0 }),
        }));
      },
    }),
};
