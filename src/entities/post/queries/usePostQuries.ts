import { useMemo } from 'react';

import {
  PostSearchParams,
  SearchParams,
} from '../../../features/postSearch/model/searchTypes';
import {
  useSearchStore,
} from '../../../features/postSearch/model/useSearchStore';
import {
  useCommonDetailQuery,
} from '../../../shared/lib/query/useCommonDetailQuery';
import { useCommonQuery } from '../../../shared/lib/query/useCommonQuery';
import { usersApi } from '../../user/api/userApi';
import { User } from '../../user/model/userTypes';
import { postApi } from '../api/postApi';
import {
  Post,
  PostsResponse,
} from '../model/postTypes';
import { usePostStore } from '../model/usePostStore';

export const usePostsQuery = () => {
  const skip = useSearchStore((state) => state.skip)
  const limit = useSearchStore((state) => state.limit)
  const search = useSearchStore((state) => state.search)
  const sortBy = useSearchStore((state) => state.sortBy)
  const sortOrder = useSearchStore((state) => state.sortOrder)
  const tag = useSearchStore((state) => state.tag)

  const searchParams = useMemo(
    () => ({
      skip,
      limit,
      search,
      sortBy,
      sortOrder,
      tag,
    }),
    [skip, limit, search, sortBy, sortOrder, tag],
  )

  return useCommonQuery<PostsResponse, PostSearchParams>({
    queryKey: ["posts", searchParams],
    queryFn: async (params) => {
      const postsResponse = await postApi.getPosts(params)
      const { data: usersResponse } = await usersApi.getUsers()

      const postsWithAuthors = postsResponse.posts.map((post: Post) => ({
        ...post,
        author: usersResponse?.users?.find((user: User) => user.id === post.userId),
      }))

      return {
        posts: postsWithAuthors,
        total: postsResponse.total,
        limit: params.limit,
        skip: params.skip,
      }
    },
    params: searchParams,
  })
}

export const usePostsByTagQuery = (tag: string) => {
  const { setPosts, setTotal } = usePostStore()

  return useCommonDetailQuery<PostsResponse>({
    queryKey: ["posts", "tag", tag],
    queryFn: () => postApi.getPostsByTag(tag),
    id: tag,
    select: (data) => {
      setPosts(data.posts)
      setTotal(data.total)
      return data
    },
  })
}

export const useSearchPostsQuery = (query: string) => {
  const { setPosts, setTotal } = usePostStore()

  return useCommonQuery<PostsResponse, SearchParams>({
    queryKey: ["posts", "search", query],
    queryFn: (params) => postApi.searchPosts(params.search),
    params: { search: query },
    select: (data) => {
      setPosts(data.posts)
      setTotal(data.total)
      return data
    },
  })
}
