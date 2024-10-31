import { Button } from "../../../shared/ui"

interface PostPaginationButtonsProps {
  skip: number
  limit: number
  total: number
  onPrevious: () => void
  onNext: () => void
}

export const PostPaginationButtons = ({ skip, limit, total, onPrevious, onNext }: PostPaginationButtonsProps) => (
  <div className="flex gap-2">
    <Button disabled={skip === 0} onClick={onPrevious}>
      이전
    </Button>
    <Button disabled={skip + limit >= total} onClick={onNext}>
      다음
    </Button>
  </div>
)
