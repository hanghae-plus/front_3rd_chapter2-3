import { postApi } from "@/entities/post/api/post-api";
import { withDefaultAuthor, withDefaultReactions, withDefaultTags } from "@/entities/post/lib/post-query-helper";
import { PostsResponse } from "@/entities/post/model/types";
import { addItemInArray } from "@/shared/lib/array";
import { pipe } from "@/shared/lib/function";
import { merge } from "@/shared/lib/object";
import { useQueryParams } from "@/shared/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryConfig } from "../lib/queryConfig";

export const useMutateAddPost = () => {
  const queryClient = useQueryClient();
  const { queries } = useQueryParams();

  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: (data) => {
      queryClient.setQueryData(getQueryConfig(queries).queryKey, (oldData: PostsResponse | undefined) => {
        if (!oldData) return undefined;
        const pipePost = pipe(withDefaultAuthor, withDefaultTags, withDefaultReactions);
        return merge<PostsResponse>(oldData, "posts", addItemInArray(oldData.posts, pipePost(data), "start"));
      });
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error);
    },
  });
};
