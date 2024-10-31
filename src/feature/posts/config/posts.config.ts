//  Pagination 설정
export const PAGINATION_CONFIG = {
  DEFAULT_LIMIT: 10,
  DEFAULT_SKIP: 0,
  LIMIT_OPTIONS: [10, 20, 30, 50] as const,
} as const

//  정렬 옵션 설정
export const SORT_CONFIG = {
  OPTIONS: {
    NONE: 'none',
    ID: 'id',
    TITLE: 'title',
    REACTIONS: 'reactions'
  },
  ORDERS: {
    ASC: 'asc',
    DESC: 'desc'
  },
  DEFAULT_SORT: 'none',
  DEFAULT_ORDER: 'asc'
} as const

//  API 엔드 포인트 설정
export const API_ENDPOINTS = {
  POSTS: '/posts',
  POSTS_SEARCH: '/posts/search',
  POSTS_BY_TAG: '/posts/tag',
  POSTS_TAGS: '/posts/tags',
  POSTS_ADD: '/posts/add',
  POSTS_UPDATE: (id: number) => `/posts/${id}`,
  POSTS_DELETE: (id: number) => `/posts/${id}`,
} as const

// 캐시 설정
export const CACHE_CONFIG = {
  STALE_TIME: 1000 * 60 * 5,
  RETRY_COUNT: 3,
} as const

// 검색 설정
export const SEARCH_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  DEBOUNCE_TIME: 300,
} as const

// 에러 메시지
export const ERROR_MESSAGES = {
  FETCH_ERROR: '게시물을 불러오는데 실패했습니다.',
  ADD_ERROR: '게시물 추가에 실패했습니다.',
  UPDATE_ERROR: '게시물 수정에 실패했습니다.',
  DELETE_ERROR: '게시물 삭제에 실패했습니다.',
  SEARCH_ERROR: '검색에 실패했습니다.',
} as const

// 유효성 검사 규칙
export const VALIDATION_RULES = {
  TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  BODY: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
} as const

// 임시 사용자 ID
export const MOCK_USER_ID = 1

export type SortOption = keyof typeof SORT_CONFIG.OPTIONS
export type SortOrder = keyof typeof SORT_CONFIG.ORDERS