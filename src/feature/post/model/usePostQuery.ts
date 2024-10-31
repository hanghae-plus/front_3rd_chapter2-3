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

export const useGetPosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["post", { limit, skip }],
    queryFn: () => getPosts(limit, skip),
  });
};

export const useGetPostByTag = (tag: string) => {
  return useQuery({ queryKey: ["post", "tag"], queryFn: () => getPostsByTag(tag), enabled: Boolean(tag) });
};

export const useGetSearchPosts = (searchQuery: string) => {
  return useQuery({
    queryKey: ["post", "search", searchQuery],
    queryFn: () => getSearchPosts(searchQuery),
    enabled: Boolean(searchQuery),
  });
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
  return useQuery({ queryKey: ["tag"], queryFn: getTags });
};
