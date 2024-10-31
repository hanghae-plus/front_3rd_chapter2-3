import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../shared"
import { PAGINATION_CONFIG } from "../../../config/posts.config"

export const Pagination = ({
  limit,
  skip,
  total,
  setLimit,
  setSkip,
}: {
  limit: number
  skip: number
  total: number
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => setLimit(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent className="w-[180px] mb-1">
            {PAGINATION_CONFIG.LIMIT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()} className="cursor-pointer">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button
          disabled={skip === 0}
          onClick={() => setSkip(Math.max(0, skip - limit))}
        >
          이전
        </Button>
        <Button
          disabled={skip + limit >= total}
          onClick={() => setSkip(skip + limit)}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
