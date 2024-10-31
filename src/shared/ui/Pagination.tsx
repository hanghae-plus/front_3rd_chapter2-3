import { Button } from "@/shared/ui/Button"
import { Select, SelectContent, SelectItem, SelectProps, SelectTrigger, SelectValue } from "@/shared/ui/Select"

interface Props {
  limit: string
  onChangeLimit: SelectProps["onValueChange"]
  disablePrev: boolean
  disableNext: boolean
  onClickPrev: React.MouseEventHandler<HTMLButtonElement>
  onClickNext: React.MouseEventHandler<HTMLButtonElement>
}

const Pagination = ({ limit, onChangeLimit, disablePrev, disableNext, onClickPrev, onClickNext }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit} onValueChange={onChangeLimit}>
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
        <Button disabled={disablePrev} onClick={onClickPrev}>
          이전
        </Button>
        <Button disabled={disableNext} onClick={onClickNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default Pagination
