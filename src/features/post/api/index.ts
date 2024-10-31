import { postApis } from "../../../entities/post/api";
import { useMutation, useQuery } from "@tanstack/react-query";

type ResPostsParams = {
  skip?: number;
  limit?: number;
  query?: string;
  search?: string;
};

export const usePostsQuery = ({ skip = 0, limit = 10, query = "", search = "" }: ResPostsParams) => {
  return useQuery<ResPostsList>({
    queryKey: ["postList", limit, skip],
    queryFn: () => {
      if (search) {
        return postApis.fetchSearchPosts(search);
      } else if (query) {
        return postApis.fetchSearchPosts(query);
      }
      return postApis.fetchPosts(skip, limit);
    },
  });
};

export function useSearchPostListQuery(query: string) {
  return useQuery({
    queryKey: ["postList", query],
    queryFn: () => postApis.fetchSearchPosts(query),
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
