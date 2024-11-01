export const commentQueryKeys = {
  all: () => ["comments"] as const,
  listByPost: (postId: number) => [...commentQueryKeys.all(), "list", "byPost", postId] as const,
}
