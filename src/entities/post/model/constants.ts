export const SORT_OPTIONS = {
  NONE: 'none',
  ID: 'id',
  TITLE: 'title',
  REACTIONS: 'reactions',
} as const

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const

export const SORT_LABELS = {
  [SORT_OPTIONS.NONE]: '없음',
  [SORT_OPTIONS.ID]: 'ID',
  [SORT_OPTIONS.TITLE]: '제목',
  [SORT_OPTIONS.REACTIONS]: '반응',
} as const

export const SORT_ORDER_LABELS = {
  [SORT_ORDERS.ASC]: '오름차순',
  [SORT_ORDERS.DESC]: '내림차순',
} as const

export const POST_TABLE_HEADERS = [
  { id: 'id', label: 'ID', width: 'w-[50px]' },
  { id: 'title', label: '제목', width: '' },
  { id: 'author', label: '작성자', width: 'w-[150px]' },
  { id: 'reactions', label: '반응', width: 'w-[150px]' },
  { id: 'actions', label: '작업', width: 'w-[150px]' },
] as const