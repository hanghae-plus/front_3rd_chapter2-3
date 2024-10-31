import { useMutation } from "@tanstack/react-query";

import apiRequest from "@/shared/api";

const fetchDeletePost = async (postId: number) => {
  try {
    await apiRequest.delete(`/api/posts/${postId}`);
  } catch (error) {
    console.error(error);
  }
};

export const useMutationDeletePost = (postId: number) => {
  return useMutation({ mutationFn: () => fetchDeletePost(postId) });
};
