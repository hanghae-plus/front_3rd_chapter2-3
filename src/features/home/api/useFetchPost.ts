import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';

import type { ApiResponse } from '@shared/model/types';
import type { Post } from '@/entities/home/model/types';

import { enrichPostsWithUsers } from '@entities/home/lib/userUtils';
import { useFetchUsers } from '@/features/home/api/useFetchUser';
import { usePostFilter } from '@features/home/model/usePostFilter';

import { fetchPostApi } from '@entities/home/lib/postUtils';
import { createPost, updatePostById, deletePostById } from '@entities/home/api/postApi';

export const useFetchPosts = () => {
  const { users } = useFetchUsers();
  const { filters } = usePostFilter();

  // URL 필터를 API 파라미터로 변환
  const queryParams = useMemo(
    () => ({
      search: filters.search,
      tag: filters.tag === 'all' ? undefined : filters.tag,
      skip: (filters.page - 1) * filters.pageSize,
      limit: filters.pageSize,
      sortBy: filters.sortBy || undefined,
      sortOrder: filters.sortOrder,
    }),
    [filters],
  );

  const { data: postsApiResponse, isPending: loading } = useQuery<ApiResponse & { posts: Post[] }, Error>({
    queryKey: ['posts', queryParams],
    queryFn: () => fetchPostApi(queryParams),
  });

  const posts = useMemo(
    () => (postsApiResponse?.posts ? enrichPostsWithUsers(postsApiResponse.posts, users) : []),
    [postsApiResponse?.posts, users],
  );
  const total = useMemo(() => postsApiResponse?.total ?? 0, [postsApiResponse?.total]);

  return {
    posts,
    loading,
    pageCount: Math.ceil(total / filters.pageSize),
  };
};

const invalidatePosts = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['posts'] });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => invalidatePosts(queryClient),
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostById,
    onSuccess: () => invalidatePosts(queryClient),
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostById,
    onSuccess: () => invalidatePosts(queryClient),
  });
};
