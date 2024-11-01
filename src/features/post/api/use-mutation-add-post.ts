import { useMutation } from "@tanstack/react-query";

import { NewPostType } from "@/features/post/model/type";
import { fetchAddPost } from "@/entities/post/api/fetch-add-post";

export const useMutationAddPost = (newPost: NewPostType) => {
  return useMutation({ mutationFn: () => fetchAddPost(newPost) });
};
