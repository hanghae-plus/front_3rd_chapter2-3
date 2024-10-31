export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    list: (params) => [...queryKeys.posts.all, "list", params] as const,
    detail: (id: number) => [...queryKeys.posts.all, "detail", id] as const,
    tags: () => [...queryKeys.posts.all, "tags"] as const,
  },
  comments: {
    all: ["comments"] as const,
    byPost: (postId: number) => [...queryKeys.comments.all, "byPost", postId] as const,
  },
  users: {
    all: ["users"] as const,
    detail: (id: number) => [...queryKeys.users.all, "detail", id] as const,
  },
}
