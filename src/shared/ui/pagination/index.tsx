import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from '../../ui'

interface PaginationProps {
  limit: number
  skip: number
  total: number
  onLimitChange: (limit: number) => void
  onSkipChange: (skip: number) => void
}

export const Pagination = ({
  limit,
  skip,
  total,
  onLimitChange,
  onSkipChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button
          disabled={skip === 0}
          onClick={() => onSkipChange(Math.max(0, skip - limit))}
        >
          이전
        </Button>
        <Button
          disabled={skip + limit >= total}
          onClick={() => onSkipChange(skip + limit)}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
