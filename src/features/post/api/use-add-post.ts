import { postApi } from "@/entities/post/api/post-api";
import { postQueries } from "@/entities/post/api/post-queries";
import { PostsResponse } from "@/entities/post/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: (data) => {
      queryClient.setQueryData(
        postQueries.list({ limit: 10, skip: 0 }).queryKey,
        (oldData: PostsResponse | undefined) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            posts: [data, ...oldData.posts],
          };
        },
      );
    },
  });
};
