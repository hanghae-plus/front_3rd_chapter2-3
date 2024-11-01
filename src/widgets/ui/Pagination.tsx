import { UpdatePostQueryParam } from "../../entities/post"
import { PaginationType } from "../../shared/model/types"
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shared/ui"

type Props = PaginationType & {
  total: number
  updateQueryParam: UpdatePostQueryParam
}

export const Pagination = ({ limit, skip, total, updateQueryParam }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) =>
            updateQueryParam({ limit: parseInt(value, 10) })
          }
        >
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
        <Button
          disabled={skip === 0}
          onClick={() => updateQueryParam({ skip: Math.max(0, skip - limit) })}
        >
          이전
        </Button>
        <Button
          disabled={skip + limit >= total}
          onClick={() => updateQueryParam({ skip: skip + limit })}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
