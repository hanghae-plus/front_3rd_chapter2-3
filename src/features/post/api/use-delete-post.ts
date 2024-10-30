import { postQueries } from "@/entities/post/api/post.queries";
import { postApi } from "@/entities/post/api/postApi";
import { PostsResponse } from "@/entities/post/model/types";
import { useNavigator } from "@/shared/lib/useNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { queries } = useNavigator();
  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        postQueries.list({ limit: queries.limit, skip: queries.skip }).queryKey,
        (oldData: PostsResponse | undefined) => {
          if (!oldData) return undefined;
          return { ...oldData, posts: oldData.posts.filter((post) => post.id !== id) } as PostsResponse;
        },
      );
    },
  });
};
