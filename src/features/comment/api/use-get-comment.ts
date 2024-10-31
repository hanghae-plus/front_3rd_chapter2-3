import { commentQueries } from "@/entities/comment/api/comment-quries";
import { useQuery } from "@tanstack/react-query";

export const useQueryComments = ({ postId }: { postId: number }) => {
  return useQuery(commentQueries.list({ postId }));
};
