import { Button } from "../button"
import { Select } from "../select"

interface PaginationProps {
  limit: number
  onNext: () => void
  onPrev: () => void
  onLimitChange: (limit: number) => void
  isNextDisabled: boolean
  isPrevDisabled: boolean
}

export const Pagination = ({
  limit,
  onNext,
  onPrev,
  onLimitChange,
  isNextDisabled,
  isPrevDisabled,
}: PaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onLimitChange(Number(value))}
          placeholder="10"
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "30", label: "30" },
          ]}
        />
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={isPrevDisabled} onClick={onPrev}>
          이전
        </Button>
        <Button disabled={isNextDisabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
