import { useMutation } from "@tanstack/react-query";

import { fetchUpdatepost } from "@/entities/post/api/fetch-update-post";
import { PostWithAuthorType } from "@/entities/post/model/post-type";

export const useMutationUpdatepost = (post: PostWithAuthorType) => {
  return useMutation({ mutationFn: () => fetchUpdatepost(post) });
};
