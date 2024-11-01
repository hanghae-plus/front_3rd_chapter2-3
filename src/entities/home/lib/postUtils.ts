import type { ApiResponse } from '@shared/model/types';
import type { Post } from '@entities/home/model/types';
import { fetchPostList, fetchPostListByTag, fetchPostListBySearch } from '@entities/home/api/postApi';
import { API_CALLS, type ApiCallType } from '@entities/home/lib/constants';

export type PostParams = {
  limit?: number;
  skip?: number;
  tag?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
};

export const getDefaultParams = (params?: PostParams) => ({
  limit: params?.limit || 10,
  skip: params?.skip || 0,
  sortBy: params?.sortBy || 'createdAt',
  sortOrder: params?.sortOrder || 'desc',
});

export const createApiMap = (params?: PostParams) => {
  const defaultParams = getDefaultParams(params);

  return {
    [API_CALLS.search]: () => {
      if (!params?.search) throw new Error('Search parameter is required');
      return fetchPostListBySearch({ ...defaultParams, search: params.search });
    },
    [API_CALLS.tag]: () => {
      if (!params?.tag) throw new Error('Tag parameter is required');
      return fetchPostListByTag({ ...defaultParams, tag: params.tag });
    },
    [API_CALLS.default]: () => fetchPostList(defaultParams),
  } as Record<ApiCallType, () => Promise<ApiResponse & { posts: Post[] }>>;
};

export const getApiCallType = (params?: PostParams): ApiCallType => {
  if (params?.search) return API_CALLS.search;
  if (params?.tag && params?.tag !== 'all') return API_CALLS.tag;
  return API_CALLS.default;
};

export const fetchPostApi = (params?: PostParams): Promise<ApiResponse & { posts: Post[] }> => {
  const apiMap = createApiMap(params);
  const apiCallType = getApiCallType(params);
  return apiMap[apiCallType]();
};
