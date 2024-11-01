import { useEffect } from "react";
import { useUsersQuery } from "../../../user/model/hook/useQuery";
import { useDeletePostMutation, usePostsQuery } from "./useQuery";
import { useSearchFilterStore } from "../../../search/model/store/useSearchFilterStore";
import { usePostsStore } from "../../store/usePostsStore";

export function usePosts() {
  const { limit, skip, searchQuery, selectedTag } = useSearchFilterStore();
  const { setTotal } = usePostsStore();

  const { data: postsData, isLoading } = usePostsQuery({ limit, skip, tag: selectedTag, searchQuery });

  const { data: usersData } = useUsersQuery();
  const { posts = [], total = 0 } = postsData || {};
  const { users = [] } = usersData || {};

  const { mutateAsync: deletePost } = useDeletePostMutation();

  useEffect(() => {
    setTotal(total);
  }, [total]);

  return {
    posts: posts.map((post) => ({ ...post, author: users.find((user) => user.id === post.userId) })),
    isPostsLoading: isLoading,
    limit,
    total,
    deletePost,
  };
}
