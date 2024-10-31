import { postApis } from "../../../entities/post/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userApis } from "../../../entities/user/api";

export const usePostListQuery = (skip = 0, limit = 10) => {
  return useQuery({
    queryKey: ["postList", limit, skip],
    queryFn: async () => {
      const resPostList = await postApis.fetchPostList(skip, limit);
      const resUserList = await userApis.fetchUserList();
      const postsWithUsers = resPostList.posts.map((post) => ({
        ...post,
        author: resUserList.users.find((user) => {
          return user.id === post.userId;
        }),
      }));
      return { posts: postsWithUsers, total: resPostList.total, limit };
    },
  });
};

export function useSearchPostListQuery(query: string) {
  return useQuery({
    queryKey: ["postList", query],
    queryFn: () => postApis.fetchSearchPostList(query),
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
