import { postApis } from "../../../../entities/post/api";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

type ResPostsParams = {
  skip: number;
  limit: number;
  searchQuery: string;
  tag: string;
};

export const usePostsQuery = ({ skip, limit, searchQuery, tag }: ResPostsParams) => {
  return useSuspenseQuery<ResPostsList>({
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

export function useAddPostMutation() {
  return useMutation({
    mutationFn: (post: ReqAddPostBody) => postApis.addPost(post),
  });
}

export function useEditPostMutation() {
  return useMutation({
    mutationFn: (post: Post) => postApis.editPost(post),
  });
}

export function useDeletePostMutation() {
  return useMutation({
    mutationFn: (id: number) => postApis.deletePost(id),
  });
}
