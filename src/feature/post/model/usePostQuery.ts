import useCustomQuery from "../../../shared/model/useCustomQuery.ts";
import {
  deleteExistingPost,
  getPosts,
  getPostsByTag,
  getSearchPosts,
  getTags,
  postNewPost,
  putExistingPost,
} from "../../../entities/post/api";
import useCustomMutation from "../../../shared/model/useCustomMutation.ts";
import { NewPost, Post } from "../../../entities/post/model/types.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPosts = (limit: number, skip: number, sortBy, sortOrder) => {
  return useQuery({ queryKey: ["post", { limit, skip, sortBy, sortOrder }], queryFn: () => getPosts(limit, skip) });
};

export const useGetPostByTag = (tag: string) => {
  return useQuery({ queryKey: ["post", "tag"], queryFn: () => getPostsByTag(tag) });
};

export const useGetSearchPosts = (searchQuery: string) => {
  return useQuery({ queryKey: ["post", searchQuery], queryFn: () => getSearchPosts(searchQuery) });
};

export const usePostNewPost = () => {
  return useMutation((newPost: NewPost) => postNewPost(newPost), {
    onError: (error) => {
      console.error("게시글 추가 실패:", error);
    },
  });
};

export const useUpdatePost = () => {
  return useCustomMutation((selectedPost: Post) => putExistingPost(selectedPost), {
    onError: (error) => {
      console.error("게시글 업데이트 실패:", error);
    },
  });
};

export const useDeletePost = () => {
  return useCustomMutation((id: number) => deleteExistingPost(id), {
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
    },
  });
};

export const useGetTags = () => {
  return useCustomQuery(["post", "tags"], () => getTags());
};
