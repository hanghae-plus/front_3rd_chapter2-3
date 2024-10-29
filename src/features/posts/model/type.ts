export interface PostsPaginationProps {
  total: number
  limit: number
  skip: number
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  updateURL: () => void
}
