import { postQueries } from "@/entities/post/api/post.queries";
import { postApi } from "@/entities/post/api/postApi";
import { useNavigator } from "@/shared/lib/useNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSearchPosts = () => {
  const { queries } = useNavigator();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApi.searchPosts,
    onSuccess: (data) => {
      queryClient.setQueryData(postQueries.list({ limit: queries.limit, skip: queries.skip }).queryKey, data);
    },
  });
};
