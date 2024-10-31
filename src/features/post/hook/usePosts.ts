import { useSearchFilterStore } from "../../search/model/store/useSearchFilterStore";
import { useUsersQuery } from "../../user/api";
import { usePostsQuery, useDeletePostMutation } from "../api";

export function usePosts() {
  const { limit, skip, searchQuery, selectedTag } = useSearchFilterStore();

  const { data: postsData, isLoading } = usePostsQuery({ limit, skip, tag: selectedTag, searchQuery });

  const { data: usersData } = useUsersQuery();
  const { posts = [], total = 0 } = postsData || {};
  const { users = [] } = usersData || {};

  const { mutateAsync: deletePost } = useDeletePostMutation();

  return {
    posts: posts.map((post) => ({ ...post, author: users.find((user) => user.id === post.userId) })),
    isPostsLoading: isLoading,
    limit,
    total,
    deletePost,
  };
}
