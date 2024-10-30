import { postApi } from "@/entities/post/api/post-api";
import { postQueries } from "@/entities/post/api/post-queries";
import { PostsResponse } from "@/entities/post/model/types";
import { useNavigator } from "@/shared/model/useNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { queries } = useNavigator();
  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: (selectedPost) => {
      queryClient.setQueryData(
        postQueries.list({ limit: queries.limit, skip: queries.skip }).queryKey,
        (oldData: PostsResponse | undefined) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            posts: oldData.posts.map((post) => (post.id === selectedPost?.id ? selectedPost : post)),
          };
        },
      );
    },
  });
};
