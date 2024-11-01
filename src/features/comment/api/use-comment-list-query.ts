import { useQuery } from "@tanstack/react-query";
import { getCommentList } from "../../../entities/comment/api/get-comment-list";

export const useCommentListQuery = (postId: number | undefined) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!postId) return {};
      const data = await getCommentList({ postId });
      return { [postId]: data.commentList };
    },
    enabled: !!postId,
  });
};
