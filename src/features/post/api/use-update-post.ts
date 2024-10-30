import { postApi } from "@/entities/post/api/post-api";
import { postQueries } from "@/entities/post/api/post-queries";
import { PostsResponse } from "@/entities/post/model/types";
import { findById, updateByID } from "@/shared/lib/array";
import { merge, shallowMerge } from "@/shared/lib/object";
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
          const prevPost = findById(oldData.posts, selectedPost?.id);
          const updatedPost = shallowMerge(prevPost, selectedPost);
          if (!updatedPost) return oldData;
          return merge<PostsResponse>(oldData, "posts", updateByID(oldData.posts, updatedPost));
        },
      );
    },
  });
};
