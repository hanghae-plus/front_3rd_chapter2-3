import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/Select"

interface Props {
  limit: number
  setLimit: (limit: number) => void
}

export const PaginationSelect = ({ limit, setLimit }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span>표시</span>
      <Select
        value={limit.toString()}
        onValueChange={(value) => setLimit(Number(value))}
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
  )
}
