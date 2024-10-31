import {
  deleteExistingPost,
  getPosts,
  getPostsByTag,
  getSearchPosts,
  getTags,
  postNewPost,
  putExistingPost,
} from "../../../entities/post/api";
import { NewPost, Post } from "../../../entities/post/model/types.ts";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";

export const useGetPosts = (limit: number, skip: number, sortBy: string, sortOrder: string) => {
  return useQuery({ queryKey: ["post", { limit, skip, sortBy, sortOrder }], queryFn: () => getPosts(limit, skip) });
};

export const useGetPostByTag = (tag: string) => {
  return useQuery({ queryKey: ["post", "tag"], queryFn: () => getPostsByTag(tag) });
};

export const useGetSearchPosts = (searchQuery: string) => {
  return useQuery({ queryKey: ["post", searchQuery], queryFn: () => getSearchPosts(searchQuery) });
};

export const usePostNewPost = (options?: UseMutationOptions<Post | undefined, Error, NewPost>) => {
  return useMutation({
    mutationFn: postNewPost,
    ...options,
  });
};

export const useUpdatePost = (options?: UseMutationOptions<Post | undefined, Error, NewPost>) => {
  return useMutation({
    mutationFn: putExistingPost,
    ...options,
  });
};

export const useDeletePost = (options?: UseMutationOptions<unknown, Error, { id: number }, unknown>) => {
  return useMutation({
    mutationFn: ({ id }) => deleteExistingPost(id),
    ...options,
  });
};

export const useGetTags = () => {
  return useQuery({ queryKey: ["tag"], queryFn: () => getTags() });
};
