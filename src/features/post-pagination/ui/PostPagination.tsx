import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select/ui"
import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { store } from "../../../entities/post/model/store.ts"

interface Props {
  skip: number
  limit: number
  setParam: (key: "skip" | "limit", value?: string | number) => void
}

const PostPagination = ({ skip, limit, setParam }: Props) => {
  const { total } = store((state) => state)

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => setParam("limit", value)}>
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
        <Button disabled={skip === 0} onClick={() => setParam("skip", Math.max(0, skip - limit).toString())}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => setParam("skip", (skip + limit).toString())}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default PostPagination
