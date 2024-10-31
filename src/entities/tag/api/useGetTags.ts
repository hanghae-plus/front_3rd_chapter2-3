import { apiClient } from '@/shared/api/base-api';
import { QueryConfig } from '@/shared/lib/query/types';
import { useQuery } from '@tanstack/react-query';
import { Tag } from '../model/types';
import { tagQueryKeys } from './query-key';

const tagsApi = {
  getTags: async (): Promise<Tag[]> => {
    return apiClient<Tag[]>('/posts/tags');
  }
};

type TagsQueryConfig = QueryConfig<
  Tag[],
  Error,
  Tag[],
  ReturnType<typeof tagQueryKeys.getTags>
>;

export const useTags = (opts?: TagsQueryConfig) => {
  const tagsQuery = useQuery({
    queryKey: tagQueryKeys.getTags(),
    queryFn: () => tagsApi.getTags(),
    ...opts
  });

  return {
    tagsQuery
  };
};
