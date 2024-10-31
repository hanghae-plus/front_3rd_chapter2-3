import { usePostsQueryProps } from "./usePostsQuery"

export const postQueryKeys = {
  all: () => ["posts"] as const,

  list: (payload: usePostsQueryProps) =>
    [...postQueryKeys.all(), "list", payload] as const,

  tags: () => [...postQueryKeys.all(), "tags"] as const,
} as const
