import { fetchDeletePost } from "@/entities/post/api/fetch-delete-post";
import { useMutation } from "@tanstack/react-query";

export const useMutationDeletePost = (postId: number) => {
  return useMutation({ mutationFn: () => fetchDeletePost(postId) });
};
