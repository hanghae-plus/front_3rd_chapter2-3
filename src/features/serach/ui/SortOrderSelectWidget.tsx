import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { useQueryParams } from "../../../shared/model/useQueryParams"

const SortOrderSelectWidget = () => {
  const { sortOrder, setSortOrder } = useQueryParams()

  return (
    <Select value={sortOrder} onValueChange={setSortOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortOrderSelectWidget
