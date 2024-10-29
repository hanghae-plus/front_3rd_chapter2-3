import { Pagination } from "../../../shared/ui/pagination/Pagination"

export const PostsPagination = ({ total, limit, skip, setSkip, setLimit, updateURL }) => {
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
