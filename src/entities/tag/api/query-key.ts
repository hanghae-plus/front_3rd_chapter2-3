import { createQueryKeyFactory } from '@/shared/lib/query/query-key-factory';

const createTagQueryKeys = () => {
  const tagKeys = createQueryKeyFactory('tags');

  return {
    getTags: () => tagKeys.createKey('getTags')
  };
};

export const tagQueryKeys = createTagQueryKeys();
