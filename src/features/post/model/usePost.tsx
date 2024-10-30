import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../../entities/post/api/postApi.js';
import { FetchPostsParams, Post } from '../../../entities/post/api/types.js';
import { fetchUsers } from '../../../entities/user/api/userApi.js';
import { User } from '../../../entities/user/api/types.js';
export interface EnrichedPost extends Post {
  author?: User;
}
const usePosts = (params: FetchPostsParams) => {
  return useQuery<EnrichedPost[],Error>({
    queryKey: ['posts', params],
    queryFn: async () => {
      // 게시물 데이터 가져오기
      const postsData = await fetchPosts(params);
      // 사용자 데이터 가져오기
      const usersData = await fetchUsers();

      // 게시물에 작성자 정보 추가
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }));

      return postsWithUsers;
    }
    // staleTime: 1000 * 60 * 5, // 5분
  });
};

export default usePosts;