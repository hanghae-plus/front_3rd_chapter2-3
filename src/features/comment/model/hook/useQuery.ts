import { useQuery } from "@tanstack/react-query";
import { commentApis } from "../../../../entities/comment/api";

export function useFetchCommentQuery(postId: number) {
  return useQuery({
    queryKey: ["comment", postId],
    queryFn: () => commentApis.fetchComments(postId),
  });
}
