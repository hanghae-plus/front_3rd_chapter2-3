import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "."
import { Button } from "./Button"
import { usePostStore } from "../../../features/Post/model/stores/usePostStore"
import { useURLManager } from "../../../features/Post/model/hooks/url/useURLManager"

export const Pagination = () => {
  const { skip, setSkip, limit, setLimit, total } = usePostStore()
  const { updateURL } = useURLManager()

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value)
    setLimit(newLimit)
    setSkip(0) // limit 변경 시 첫 페이지로
    updateURL()
  }

  const handlePrevPage = () => {
    const newSkip = Math.max(0, skip - limit)
    setSkip(newSkip)
    updateURL()
  }

  const handleNextPage = () => {
    const newSkip = skip + limit
    if (newSkip < total) {
      setSkip(newSkip)
      updateURL()
    }
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} defaultValue="10" onValueChange={handleLimitChange}>
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
        <Button disabled={skip === 0} onClick={handlePrevPage}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNextPage}>
          다음
        </Button>
      </div>
    </div>
  )
}
