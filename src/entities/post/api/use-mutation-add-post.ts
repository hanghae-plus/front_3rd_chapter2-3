import { useMutation } from "@tanstack/react-query";

import apiRequest from "@/shared/api";
import { NewPostType } from "@/features/post/model/type";

interface FetchPostType {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const fetchAddPost = async (newPost: NewPostType): Promise<FetchPostType> => {
  try {
    const response = await apiRequest.post("/api/posts/add", newPost);
    return response.data;
  } catch (error) {
    console.error("게시물 추가 오류:", error);
    throw error;
  }
};

export const useMutationAddPost = (newPost: NewPostType) => {
  return useMutation({ mutationFn: () => fetchAddPost(newPost) });
};
