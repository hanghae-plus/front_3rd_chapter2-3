import { postApi } from "@/entities/post/api/post-api";
import { PostsResponse } from "@/entities/post/model/types";
import { filterByID } from "@/shared/lib/array";
import { merge } from "@/shared/lib/object";
import { useQueryParams } from "@/shared/model/useQueryParams";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryConfig } from "../lib/queryConfig";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { queries } = useQueryParams();
  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(getQueryConfig(queries).queryKey, (oldData: PostsResponse | undefined) => {
        if (!oldData) return undefined;
        return merge<PostsResponse>(oldData, "posts", filterByID(oldData.posts, id));
      });
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error);
    },
  });
};
