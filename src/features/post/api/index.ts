import { postApis } from "../../../entities/post/api";
import { useMutation, useQuery } from "@tanstack/react-query";

type ResPostsParams = {
  skip: number;
  limit: number;
  searchQuery: string;
  tag: string;
};

export const usePostsQuery = ({ skip, limit, searchQuery, tag }: ResPostsParams) => {
  return useQuery<ResPostsList>({
    queryKey: ["posts", { skip, limit, searchQuery, tag }],
    queryFn: () => {
      if (searchQuery) {
        return postApis.fetchSearchPosts(searchQuery);
      } else if (tag !== "all" && tag !== "") {
        return postApis.fetchPostsWithTag(tag);
      }
      return postApis.fetchPosts(skip, limit);
    },
  });
};

export function useSearchPostListQuery(query: string) {
  return useQuery({
    queryKey: ["posts", query],
    queryFn: () => postApis.fetchSearchPosts(query),
  });
}

export function useAddPostQuery() {
  return useMutation({
    mutationFn: (post: Post) => postApis.addPost(post),
  });
}

export function useUpdatePostQuery() {
  return useMutation({
    mutationFn: (post: Post) => postApis.updatePost(post),
  });
}

export function useDeletePostMutation() {
  return useMutation({
    mutationFn: (id: number) => postApis.deletePost(id),
  });
}
