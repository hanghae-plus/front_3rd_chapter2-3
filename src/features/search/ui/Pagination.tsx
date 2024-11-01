import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { useQueryParam } from "@/features/post"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/entities/post"

export const Pagination = () => {
  const params = useQueryParam()
  const queryClient = useQueryClient()
  const cachedData: { total: number } = queryClient.getQueryData(queryKeys.FETCH_POSTS_KEY(params.limit, params.skip))

  console.log(cachedData)

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={params.limit.toString()} onValueChange={(value) => params.updateSkip(Number(value))}>
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
          disabled={parseInt(params.skip) === 0}
          onClick={() => params.updateSkip(Math.max(0, parseInt(params.skip) - parseInt(params.limit)))}
        >
          이전
        </Button>
        <Button
          disabled={parseInt(params.skip) + parseInt(params.limit) >= (cachedData?.total ?? 100)}
          onClick={() => params.updateSkip(parseInt(params.skip) + parseInt(params.limit))}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default Pagination
