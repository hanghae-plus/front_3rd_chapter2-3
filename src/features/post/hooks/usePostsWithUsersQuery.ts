import {
  useEffect,
  useMemo,
} from 'react';

import { useQueries } from '@tanstack/react-query';

import {
  Post,
  postApi,
  User,
  usersApi,
} from '../../../entities';
import { usePostStore } from '../../../entities/post/model/usePostStore';
import { useSearchStore } from '../../postSearch/model/useSearchStore';

export const usePostsWithUsersQuery = () => {
  const { setPosts, setTotal } = usePostStore()
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

  const results = useQueries({
    queries: [
      {
        queryKey: ["posts", searchParams],
        queryFn: () => postApi.getPosts(searchParams),
      },
      {
        queryKey: ["users"],
        queryFn: usersApi.getUsers,
      },
    ],
  })

  const [postsQuery, usersQuery] = results

  const combinedData = useMemo(() => {
    if (postsQuery.data && usersQuery.data) {
      const postsWithUsers = postsQuery?.data?.posts.map((post: Post) => ({
        ...post,
        author: usersQuery?.data?.users?.find((user: User) => user.id === post.userId),
      }))

      return {
        ...postsQuery,
        data: postsWithUsers.length
          ? {
              posts: postsWithUsers,
              total: postsQuery.data.total,
              limit: postsQuery.data.limit,
              skip: postsQuery.data.skip,
            }
          : undefined,
      }
    }
    return postsQuery
  }, [postsQuery.data, usersQuery.data])

  useEffect(() => {
    if (combinedData.data) {
      setPosts(combinedData.data.posts)
      setTotal(combinedData.data.total)
    }
  }, [combinedData.data, setPosts, setTotal])

  return combinedData
}
