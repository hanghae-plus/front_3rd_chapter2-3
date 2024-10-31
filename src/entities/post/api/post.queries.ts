import { usePostsQueryProps } from "./usePostsQuery"

export const postQueryKeys = {
  all: () => ["posts"] as const,

  lists: () => [...postQueryKeys.all(), "list"] as const,
  list: (payload: usePostsQueryProps) =>
    [...postQueryKeys.lists(), payload] as const,

  tags: () => [...postQueryKeys.all(), "tags"] as const,
} as const
