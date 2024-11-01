import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, postNewPost, PostType, updatePost } from "../../../entities/post";

export const usePostMutations = () => {
  const queryClient = useQueryClient();

  const postNewPostMutation = useMutation({
    mutationFn: async (newPost: Partial<PostType>) => {
      return postNewPost({ newPost: newPost as PostType });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
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
  };
};
