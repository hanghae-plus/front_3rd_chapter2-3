import { useState } from 'react';

import { fetchAllPosts, fetchPostsByTag as fetchPostsByTagApi, searchPostsApi } from '~/entities/post/api/postApi';
import { getPostsWithUsers } from '~/entities/post/lib/getPostsWithUsers';
import { usePostStore } from '~/entities/post/model/store';
import { fetchAllUser } from '~/entities/user/api/userApi';

export const usePost = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLoading] = useState(false);
  const fetchPostAction = usePostStore.use.fetchPostsAction();

  // 게시물 가져오기
  const fetchPosts = async ({ limit, skip }: { limit?: number; skip?: number }) => {
    setLoading(true);
    try {
      const { posts, total } = await fetchAllPosts({ limit, skip });
      const { users } = await fetchAllUser();

      const postsWithUsers = getPostsWithUsers(posts, users);

      fetchPostAction({ posts: postsWithUsers, total: total });
    } catch (error) {
      console.error('게시물 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag?: string) => {
    if (!tag || tag === 'all') {
      await fetchPosts({});
      return;
    }
    setLoading(true);
    try {
      const [{ posts, total }, { users }] = await Promise.all([fetchPostsByTagApi(tag), fetchAllUser()]);
      const postsWithUsers = getPostsWithUsers(posts, users);

      fetchPostAction({ posts: postsWithUsers, total: total });
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error);
    }
    setLoading(false);
  };

  const searchPosts = async (searchQuery?: string) => {
    if (!searchQuery) {
      fetchPosts({});
      return;
    }
    setLoading(true);
    try {
      const { posts, total } = await searchPostsApi(searchQuery);

      fetchPostAction({ posts: posts, total: total });
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    }
    setLoading(false);
  };

  return { fetchPosts, fetchPostsByTag, searchPosts };
};
