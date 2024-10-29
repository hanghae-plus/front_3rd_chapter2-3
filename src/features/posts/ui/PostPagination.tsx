import { Pagination } from "../../../shared/ui/pagination/Pagination"
import { PostsPaginationProps } from "../model/type"

export const PostsPagination = ({ total, limit, skip, setSkip, setLimit, updateURL }: PostsPaginationProps) => {
  const onNext = () => {
    setSkip(skip + limit)
    updateURL()
  }

  const onPrev = () => {
    setSkip(Math.max(0, skip - limit))
    updateURL()
  }

  return (
    <Pagination
      limit={limit}
      onNext={onNext}
      onPrev={onPrev}
      onLimitChange={(newLimit) => {
        setLimit(newLimit)
        updateURL()
      }}
      isNextDisabled={skip + limit >= total}
      isPrevDisabled={skip === 0}
    />
  )
}
