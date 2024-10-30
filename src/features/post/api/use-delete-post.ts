import { postApi } from "@/entities/post/api/post-api";
import { postQueries } from "@/entities/post/api/post-queries";
import { PostsResponse } from "@/entities/post/model/types";
import { filterByID } from "@/shared/lib/array";
import { merge } from "@/shared/lib/object";
import { useQueryParams } from "@/shared/model/useQueryParams";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { queries } = useQueryParams();
  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        postQueries.list({ limit: queries.limit, skip: queries.skip }).queryKey,
        (oldData: PostsResponse | undefined) => {
          if (!oldData) return undefined;
          return merge<PostsResponse>(oldData, "posts", filterByID(oldData.posts, id));
        },
      );
    },
  });
};
