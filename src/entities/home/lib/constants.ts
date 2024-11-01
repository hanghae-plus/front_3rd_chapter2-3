export const API_CALLS = {
  search: 'search',
  tag: 'tag',
  default: 'default',
} as const;

export type ApiCallType = keyof typeof API_CALLS;

export const DEFAULT_LIMIT = 10;
export const DEFAULT_SKIP = 0;
