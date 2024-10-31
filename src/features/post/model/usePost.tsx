import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../../entities/post/api/postApi.js';
import { FetchPostsParams, Post, Posts } from '../../../entities/post/api/types';
import { User } from '../../../entities/user/api/types.js';
export interface EnrichedPost extends Post {
  author?: User;
}

const usePosts = (params: FetchPostsParams) => {
  // const queryKey = useMemo(() => ['posts', params], [params]);
  return useQuery<Posts,Error>({
    queryKey:['posts', params],
    queryFn: () =>  fetchPosts(params)
  });
};

export default usePosts;