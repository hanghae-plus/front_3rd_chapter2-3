import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PaginationProps {
  skip: number
  limit: number
  total: number
  onSkipChange: (skip: number) => void
  onLimitChange: (limit: number) => void
}

export const Pagination = ({ skip, limit, total, onSkipChange, onLimitChange }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => onSkipChange(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => onSkipChange(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
