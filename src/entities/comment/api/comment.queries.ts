import { Comment } from "../model/types"

export const commentQueryKeys = {
  all: () => ["comment"] as const,

  lists: () => [...commentQueryKeys.all(), "list"] as const,
  list: (postId: Comment["postId"]) =>
    [...commentQueryKeys.lists(), postId] as const,
} as const
