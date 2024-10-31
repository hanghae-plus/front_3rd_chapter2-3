import { useMutation, useQuery } from "@tanstack/react-query";
import { postApis } from "../../../entities/post/api";

export function usePostListQuery(skip: number, limit: number) {
  return useQuery({
    queryKey: ["posts", skip, limit],
    queryFn: () => postApis.fetchPostList(skip, limit),
  });
}

export function useSearchPostListQuery(query: string) {
  return useQuery({
    queryKey: ["posts", query],
    queryFn: () => postApis.searchPostList(query),
  });
}

export function useAddPostQuery(post: Post) {
  return useMutation({
    mutationFn: () => postApis.addPost(post),
  });
}

export function useUpdatePostQuery(post: Post) {
  return useMutation({
    mutationFn: () => postApis.updatePost(post),
  });
}

export function useDeletePostQuery(id: number) {
  return useMutation({
    mutationFn: () => postApis.deletePost(id),
  });
}
