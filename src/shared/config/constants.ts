export const API_ENDPOINTS = {
  POSTS: "/posts",
  COMMENTS: "/comments",
  USERS: "/users",
  TAGS: "/posts/tags",
} as const

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_SKIP: 0,
  PAGE_SIZE_OPTIONS: [10, 20, 30],
} as const
