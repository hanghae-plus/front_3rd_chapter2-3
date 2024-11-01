import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, postNewPost, PostType, updatePost } from "../../../entities/post";

export const usePostMutations = () => {
  const queryClient = useQueryClient();

  const postNewPostMutation = useMutation({
    mutationFn: async (newPost: Partial<PostType>) => {
      return postNewPost({ newPost: newPost as PostType });
    },
    onSuccess: (newPost: PostType) => {
      queryClient.setQueryData(["postList"], (prevData: any) => {
        const oldPosts = prevData?.postList || [];
        return {
          ...prevData,
          postList: [newPost, ...oldPosts],
          total: (prevData?.total || 0) + 1
        };
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async (updatedPost: Partial<PostType>) => {
      return updatePost({ selectedPost: updatedPost as PostType });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      return deletePost({ postId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
    },
  });

  return {
    postNewPostMutation,
    updatePostMutation,
    deletePostMutation,
    isLoading: postNewPostMutation.isPending || updatePostMutation.isPending || deletePostMutation.isPending,
    isError: postNewPostMutation.isError || updatePostMutation.isError || deletePostMutation.isError,
    error: postNewPostMutation.error || updatePostMutation.error || deletePostMutation.error
  };
};
