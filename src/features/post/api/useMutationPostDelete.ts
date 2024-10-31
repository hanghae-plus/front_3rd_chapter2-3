import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "../../../entities/post/api";
import { usePostParams } from "../model/postParamsStore";
import { PostsDTO } from "../../../entities/post/model/types";
import { usePostQuery } from "../model/postQueryStore";

export const useMutationPostDelete = () => {
  const queryClient = useQueryClient();
  const { selectedTag, searchQuery, skip, limit } = usePostParams();
  const { activeQuery } = usePostQuery();

  return useMutation({
    mutationFn: (postId: number) => deletePostApi(postId),
    onSuccess: (response: number) => {
      queryClient.setQueryData(
        ["posts", { tag: selectedTag, searchQuery, limit, skip, activeQuery }],
        (data: PostsDTO) => {
          const updatedPosts = {
            ...data,
            posts: data.posts.filter((post) => post.id !== response),
          };
          return updatedPosts;
        },
      );
    },
  });
};
