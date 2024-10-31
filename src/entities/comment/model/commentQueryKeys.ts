export const COMMENT_QUERY_KEYS = {
  // 모든 댓글 관련 쿼리의 root key
  all: ["comments"] as const,

  // 게시물별 댓글 목록
  lists: () => [...COMMENT_QUERY_KEYS.all, "list"] as const,
  listByPost: (postId: number) => [...COMMENT_QUERY_KEYS.lists(), postId] as const,

  // 개별 댓글
  details: () => [...COMMENT_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...COMMENT_QUERY_KEYS.details(), id] as const,

  // 좋아요
  likes: () => [...COMMENT_QUERY_KEYS.all, "likes"] as const,
  like: (id: number) => [...COMMENT_QUERY_KEYS.likes(), id] as const,
} as const
