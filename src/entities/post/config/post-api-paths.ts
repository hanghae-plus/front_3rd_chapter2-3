export const POST_API_PATHS = {
  base: "/api/posts",
  search: "/api/posts/search",
  byId: (id: number) => `/api/posts/${id}`,
  byTag: (tag: string) => `/api/posts/tag/${tag}`,
  add: "/api/posts/add",
  update: (id: number) => `/api/posts/${id}`,
  delete: (id: number) => `/api/posts/${id}`,
} as const;
