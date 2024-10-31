import { useMutation } from "@tanstack/react-query";

import apiRequest from "@/shared/api";
import { PostWithAuthorType } from "../model/post-type";

const fetchUpdatepost = async (post: PostWithAuthorType): Promise<PostWithAuthorType> => {
  try {
    const response = await apiRequest.put(`/api/posts/${post.id}`, post);
    return { ...response.data, author: post.author };
  } catch (error) {
    console.error("게시물 업데이트 오류: ", error);
    throw error;
  }
};

export const useMutationUpdatepost = (post: PostWithAuthorType) => {
  return useMutation({ mutationFn: () => fetchUpdatepost(post) });
};