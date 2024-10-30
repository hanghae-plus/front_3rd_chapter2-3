import { postApi } from "@/entities/post/api/post-api";
import { postQueries } from "@/entities/post/api/post-queries";
import { useQueryParams } from "@/shared/model/useQueryParams";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFilterTagPosts = () => {
  const queryClient = useQueryClient();
  const { queries } = useQueryParams();
  return useMutation({
    mutationFn: postApi.fetchPostsByTag,
    onSuccess: (data) => {
      queryClient.setQueryData(postQueries.tag({ tag: queries.tag }).queryKey, data);
    },
  });
};
