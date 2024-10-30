import { postApi } from "@/entities/post/api/post-api";
import { postQueries } from "@/entities/post/api/post-queries";
import { useNavigator } from "@/shared/model/useNavigator";
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
