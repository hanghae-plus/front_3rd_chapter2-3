import { useUsersQuery } from "../../user/api";
import { usePostsQuery } from "../api";

export function usePosts() {
  const { data: postsData, isLoading } = usePostsQuery({});
  const { data: usersData } = useUsersQuery();
  const { posts = [], limit = 10, total = 0 } = postsData || {};
  const { users = [] } = usersData || {};

  return {
    posts: posts.map((post) => ({ ...post, user: users.find((user) => user.id === post.userId) })),
    isPostsLoading: isLoading,
    limit,
    total,
  };
}
