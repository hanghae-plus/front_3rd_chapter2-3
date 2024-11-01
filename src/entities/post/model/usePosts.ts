import { useQuery } from 'react-query';
import { getPosts } from '../api/postApi';
import { getUsers } from '../../user/api/userApi';
import { Post } from './types';

export const usePosts = ({ limit = 10, skip = 0 }: { limit: number; skip: number }) => {
  const { data, isLoading, refetch } = useQuery<Post[]>({
    queryKey: ['posts', { limit, skip }],
    queryFn: async () => {
      const [postsData, usersData] = await Promise.all([getPosts({ limit, skip }), getUsers()]);

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }));

      return postsWithUsers;
    },
  });

  return {
    posts: data,
    isLoading,
    refetch,
  };
};
