import { postQueries } from "@/entities/post/api/post.queries";
import { postApi } from "@/entities/post/api/postApi";
import { useNavigator } from "@/shared/lib/useNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFilterTagPosts = () => {
  const queryClient = useQueryClient();
  const { queries } = useNavigator();
  return useMutation({
    mutationFn: postApi.fetchPostsByTag,
    onSuccess: (data) => {
      queryClient.setQueryData(postQueries.list({ limit: queries.limit, skip: queries.skip }).queryKey, data);
    },
  });
};
