import { useState, useCallback } from 'react'

interface PaginationProps {
  initialPage?: number
  initialLimit?: number
  total?: number
}

export const usePagination = ({
  initialPage = 0,
  initialLimit = 10,
  total = 0
}: PaginationProps) => {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)

  const nextPage = useCallback(() => {
    if ((page + 1) * limit < total) {
      setPage(page + 1)
    }
  }, [page, limit, total])

  const prevPage = useCallback(() => {
    if (page > 0) {
      setPage(page - 1)
    }
  }, [page])

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    skip: page * limit,
    hasNext: (page + 1) * limit < total,
    hasPrev: page > 0
  }
}
