import { postApi } from "@/entities/post/api/post-api";
import { PostsResponse } from "@/entities/post/model/types";
import { findById, updateByID } from "@/shared/lib/array";
import { merge, shallowMerge } from "@/shared/lib/object";
import { useQueryParams } from "@/shared/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryConfig } from "../lib/queryConfig";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { queries } = useQueryParams();
  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: (selectedPost) => {
      queryClient.setQueryData(getQueryConfig(queries).queryKey, (oldData: PostsResponse | undefined) => {
        if (!oldData) return undefined;
        const prevPost = findById(oldData.posts, selectedPost?.id);
        const updatedPost = shallowMerge(prevPost, selectedPost);
        if (!updatedPost) return oldData;
        return merge<PostsResponse>(oldData, "posts", updateByID(oldData.posts, updatedPost));
      });
    },
    onError: (error) => {
      console.error("게시물 수정 오류:", error);
    },
  });
};
