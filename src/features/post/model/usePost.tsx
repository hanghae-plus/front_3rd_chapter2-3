import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../../entities/post/api/postApi.js';
import { FetchPostsParams, Post, Posts } from '../../../entities/post/api/types';
import { User } from '../../../entities/user/api/types.js';
export interface EnrichedPost extends Post {
  author?: User;
}

const usePosts = (params: FetchPostsParams) => {

  return useQuery<Posts,Error>({
    queryKey:['posts', params],
    queryFn: () => fetchPosts(params)
  });
};

export default usePosts;