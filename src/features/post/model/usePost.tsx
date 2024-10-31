import { useQuery } from '@tanstack/react-query';
import {  FetchPostsParams, EnrichedPost } from '../../../entities/post/api/types';
import { fetchPosts } from '../../../entities/post/api/postApi';

const usePosts = (params: FetchPostsParams) => {

  const query = useQuery<EnrichedPost[], Error>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
  });

  return { data:query.data ,isLoading: query.isLoading, isError: query.isError };
};

export default usePosts;
