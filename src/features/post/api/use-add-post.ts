import { postApi } from "@/entities/post/api/post-api";
import { postQueries } from "@/entities/post/api/post-queries";
import { withDefaultAuthor, withDefaultReactions, withDefaultTags } from "@/entities/post/lib/post-query-helper";
import { PostsResponse } from "@/entities/post/model/types";
import { addItemInArray } from "@/shared/lib/array";
import { pipe } from "@/shared/lib/function";
import { merge } from "@/shared/lib/object";
import { useNavigator } from "@/shared/model/useNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddPost = () => {
  const queryClient = useQueryClient();
  const { queries } = useNavigator();
  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: (data) => {
      queryClient.setQueryData(
        postQueries.list({ limit: queries.limit, skip: queries.skip }).queryKey,
        (oldData: PostsResponse | undefined) => {
          if (!oldData) return undefined;
          const pipePost = pipe(withDefaultAuthor, withDefaultTags, withDefaultReactions);
          return merge<PostsResponse>(oldData, "posts", addItemInArray(oldData.posts, pipePost(data)));
        },
      );
    },
  });
};
