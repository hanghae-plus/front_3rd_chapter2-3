export const postQueryKeys = {
  all: () => ["posts"] as const,
  list: (limit: number, skip: number) => [...postQueryKeys.all(), limit, skip] as const,
  tags: () => [...postQueryKeys.all(), "tags"] as const,
  byTag: (tag: string) => [...postQueryKeys.all(), "tag", tag] as const,
  search: (searchQuery: string) => [...postQueryKeys.all(), "search", searchQuery] as const,
}
