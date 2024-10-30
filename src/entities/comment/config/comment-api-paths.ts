export const COMMENT_API_PATHS = {
  base: "/api/comments",
  byPostId: (postId: number) => `/api/comments/post/${postId}`,
  byId: (id: number) => `/api/comments/${id}`,
  add: "/api/comments/add",
  like: "/api/comments/like",
} as const;
